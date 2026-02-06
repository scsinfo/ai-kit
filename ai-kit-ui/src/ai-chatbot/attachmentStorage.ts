const DB_NAME = "ai-kit-chatbot-attachments";
const STORE_NAME = "attachments";
const DB_VERSION = 1;

export type StoredAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  blob: Blob;
  createdAt: number;
};

type AttachmentRecord = StoredAttachment;

let dbPromise: Promise<IDBDatabase | null> | null = null;

function isBrowserEnvironment(): boolean {
  return (
    typeof window !== "undefined" && typeof window.indexedDB !== "undefined"
  );
}

async function getDatabase(): Promise<IDBDatabase | null> {
  if (!isBrowserEnvironment()) return null;

  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => resolve(null);
        request.onblocked = () => resolve(null);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
          }
        };
        request.onsuccess = () => resolve(request.result);
      } catch (error) {
        console.warn("[AiChatbot] IndexedDB is not available", error);
        resolve(null);
      }
    });
  }

  try {
    const db = await dbPromise;
    return db;
  } catch (error) {
    console.warn("[AiChatbot] Failed to open attachment store", error);
    return null;
  }
}

async function runTransaction<T>(
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => T,
): Promise<T | null> {
  const db = await getDatabase();
  if (!db) return null;

  return new Promise<T | null>((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, mode);
      const store = tx.objectStore(STORE_NAME);
      const result = handler(store);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    } catch (error) {
      reject(error);
    }
  }).catch((error) => {
    console.warn("[AiChatbot] Attachment store transaction failed", error);
    return null;
  });
}

export async function persistAttachmentBlob(
  id: string,
  blob: Blob,
  meta: { name: string; type: string; size: number },
): Promise<string | null> {
  const record: AttachmentRecord = {
    id,
    blob,
    name: meta.name,
    type: meta.type,
    size: meta.size,
    createdAt: Date.now(),
  };

  const result = await runTransaction("readwrite", (store) => {
    store.put(record);
    return id;
  });

  return result;
}

export async function loadAttachmentBlob(
  id: string,
): Promise<StoredAttachment | null> {
  const db = await getDatabase();
  if (!db) return null;

  return new Promise<StoredAttachment | null>((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(id);
      request.onsuccess = () => {
        const value = request.result as AttachmentRecord | undefined;
        resolve(value ?? null);
      };
      request.onerror = () => reject(request.error);
      tx.onabort = () => reject(tx.error);
    } catch (error) {
      reject(error);
    }
  }).catch((error) => {
    console.warn("[AiChatbot] Failed to load attachment", error);
    return null;
  });
}

export async function deleteAttachmentBlob(id: string): Promise<void> {
  await runTransaction("readwrite", (store) => {
    store.delete(id);
  });
}

export async function clearAllAttachments(): Promise<void> {
  await runTransaction("readwrite", (store) => {
    store.clear();
  });
}

export async function cleanupDanglingAttachments(
  validIds: Set<string>,
): Promise<void> {
  const db = await getDatabase();
  if (!db) return;

  await new Promise<void>((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => {
        const keys = request.result as IDBValidKey[];
        for (const key of keys) {
          const keyString = String(key);
          if (!validIds.has(keyString)) {
            store.delete(key);
          }
        }
      };

      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    } catch (error) {
      reject(error);
    }
  }).catch((error) => {
    console.warn("[AiChatbot] Failed to cleanup attachments", error);
  });
}
