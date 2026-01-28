import { Anchor, Code, Drawer, List, Stack, Text, Title } from "@mantine/core";
import { useEffect, useRef } from "react";
import classes from "./main.module.css";

const pages = {
  general: (
    <>
      <Title order={2}>AI-Kit settings</Title>
      <Text>
        This sidebar explains the options available on the AI-Kit admin screen.
        Click the <strong>info</strong> icon next to any field to jump to its
        description here.
      </Text>
      <Title order={3} mt="md" id="shared-context">
        <span className="highlightable">Shared context</span>
      </Title>
      <Text>
        Optional. A global piece of context that AI-Kit sends along with your AI
        requests. Use it to enforce your preferred style and constraints across
        the whole site.
      </Text>
      <Text mt="xs">
        <strong>Language tip:</strong> write this either in your site’s frontend
        language or in English. If you generate content in multiple languages
        (for example with Write, Rewrite, or SEO metadata), keep the shared
        context in <strong>English</strong> to stay consistent across languages
        and avoid confusing the model.
      </Text>
      <List size="sm" spacing="xs" mt="xs" withPadding>
        <List.Item>
          Example: <Code>Write in a friendly, concise tone. Avoid hype.</Code>
        </List.Item>
        <List.Item>
          Example: <Code>Use British English and our brand terminology.</Code>
        </List.Item>
      </List>
      <Title order={3} mt="md" id="default-output-language">
        <span className="highlightable">Default output language</span>
      </Title>
      <Text>
        Sets the preferred language for AI-generated text (where applicable). If
        you don’t change it, AI-Kit defaults to <strong>English</strong>. This
        is useful on multilingual sites, or when the browser/back-end can’t
        reliably infer what language the output should be.
      </Text>{" "}
      <Title order={3} mt="md" id="recaptcha-site-key">
        <span className="highlightable">Google reCAPTCHA (v3) site key</span>
      </Title>
      <Text>
        Optional. Adds bot protection for AI-triggered actions (for example
        operations initiated from the editor UI). Create a v3 key in Google
        reCAPTCHA or reCAPTCHA Enterprise and paste the <em>site key</em> here.
      </Text>
      <Title order={3} mt="md" id="use-recaptcha-enterprise">
        <span className="highlightable">Use reCAPTCHA Enterprise</span>
      </Title>
      <Text>
        Enable this if your site key was generated in{" "}
        <Anchor
          href="https://console.cloud.google.com/security/recaptcha"
          target="_blank"
          rel="noreferrer"
        >
          reCAPTCHA Enterprise
        </Anchor>
        . Leave it off for classic reCAPTCHA v3.
      </Text>
      <Title order={3} mt="md" id="use-recaptcha-net">
        <span className="highlightable">Use recaptcha.net</span>
      </Title>
      <Text>
        When enabled, the reCAPTCHA script is loaded from{" "}
        <Code>recaptcha.net</Code> instead of <Code>google.com</Code>. This is
        useful in regions where <Code>google.com</Code> may be blocked.
      </Text>
      <Title order={3} mt="md" id="hide-powered-by-ai-kit">
        <span className="highlightable">Hide “Powered by AI-Kit”</span>
      </Title>
      <Text>
        Controls whether AI-Kit shows a small attribution link in places where
        AI-Kit renders UI (where applicable). You can hide it for a cleaner
        appearance.
      </Text>
    </>
  ),

  "api-settings": (
    <>
      <Title order={2} id="api-settings">
        <span className="highlightable">API Settings</span>
      </Title>
      <Text>
        Configure how AI-Kit reaches its backend for AI features (for example
        chat, summarization, and image metadata generation). You can run fully
        local, use the backend as a fallback, or force backend-only execution.
      </Text>

      <Title order={3} mt="md" id="aikit-api-mode">
        <span className="highlightable">Mode</span>
      </Title>
      <List size="sm" spacing="xs" withPadding>
        <List.Item>
          <strong>Local only</strong>: AI-Kit will not call the backend.
        </List.Item>
        <List.Item>
          <strong>Backend fallback</strong>: try local first, then call the
          backend if local is unavailable.
        </List.Item>
        <List.Item>
          <strong>Backend only</strong>: always call the backend.
        </List.Item>
      </List>

      <Title order={3} mt="md" id="aikit-api-backend-transport">
        <span className="highlightable">Backend transport</span>
      </Title>
      <List size="sm" spacing="xs" withPadding>
        <List.Item>
          <strong>Gatey / Amplify</strong>: uses REST API names from the Amplify
          configuration exposed by Gatey (read from{" "}
          <Code>getAmplifyConfig().API.REST</Code>).
        </List.Item>
        <List.Item>
          <strong>Fetch (base URL)</strong>: calls your backend directly using a
          base URL (useful for custom endpoints or non-Amplify setups).
        </List.Item>
      </List>

      <Title order={3} mt="md" id="aikit-api-backend-api-name">
        <span className="highlightable">Backend API name</span>
      </Title>
      <Text>
        Shown when using <strong>Gatey / Amplify</strong>. Select one of the
        REST API keys found in <Code>getAmplifyConfig().API.REST</Code>.
      </Text>

      <Title order={3} mt="md" id="aikit-api-backend-base-url">
        <span className="highlightable">Backend base URL</span>
      </Title>
      <Text>
        Shown when using <strong>Fetch (base URL)</strong>. Provide the base URL
        of your backend, e.g.{" "}
        <Code>https://xyz.execute-api.eu-central-1.amazonaws.com/prod</Code>.
      </Text>
    </>
  ),

  "chatbot-settings": (
    <>
      <Title order={2} id="chatbot-settings">
        <span className="highlightable">Chatbot Settings</span>
      </Title>
      <Text>
        Configure how the on-site chatbot looks and behaves: its title and
        language, theme, open button placement, and a few safety limits.
      </Text>

      <Title order={3} mt="md" id="chatbot-preview">
        <span className="highlightable">Preview</span>
      </Title>
      <Text>
        Shows a live preview of your current settings. This is preview-only: to
        apply changes on your site, enable the chatbot and save the settings.
      </Text>

      <Title order={3} mt="md" id="chatbot-enable">
        <span className="highlightable">Enable chatbot</span>
      </Title>
      <Text>
        Turns the chatbot on or off for your site. When disabled, the chatbot UI
        will not load on the frontend.
      </Text>

      <Title order={3} mt="md" id="chatbot-title">
        <span className="highlightable">Chat title</span>
      </Title>
      <Text>
        The title shown at the top of the chat modal. If empty, the default
        localized title is used.
      </Text>

      <Title order={3} mt="md" id="chatbot-placeholder">
        <span className="highlightable">Placeholder</span>
      </Title>
      <Text>
        The placeholder text in the message input. Keep it short, as it appears
        in a compact area.
      </Text>

      <Title order={3} mt="md" id="chatbot-language">
        <span className="highlightable">Language</span>
      </Title>
      <Text>
        The UI language of the chatbot (labels, buttons, and default messages).
        Leave empty to use the built-in defaults.
      </Text>

      <Title order={3} mt="md" id="chatbot-direction">
        <span className="highlightable">Direction</span>
      </Title>
      <Text>
        Text direction of the chat UI. Use <strong>auto</strong> to follow the
        document direction, or force <strong>LTR</strong> / <strong>RTL</strong>
        for specific languages.
      </Text>

      <Title order={3} mt="md" id="chatbot-history-storage">
        <span className="highlightable">History storage</span>
      </Title>
      <List size="sm" spacing="xs" withPadding>
        <List.Item>
          <strong>Local storage</strong>: persists across page reloads and new
          tabs in the same browser.
        </List.Item>
        <List.Item>
          <strong>Session storage</strong>: persists during the current tab
          session only.
        </List.Item>
        <List.Item>
          <strong>No storage</strong>: does not persist history (every open is a
          fresh chat).
        </List.Item>
      </List>
      <Text mt="xs">
        AI-Kit automatically clears stored chat history after 24 hours.
      </Text>

      <Title order={3} mt="md" id="chatbot-color-mode">
        <span className="highlightable">Color mode</span>
      </Title>
      <Text>
        Controls whether the chatbot uses a light or dark theme. Use
        <strong> auto</strong> to follow the site’s active color scheme.
      </Text>

      <Title order={3} mt="md" id="chatbot-primary-color">
        <span className="highlightable">Primary color</span>
      </Title>
      <Text>
        The main accent color used by the chatbot (buttons, highlights, focus
        states). You can also pick from custom colors you add below.
      </Text>

      <Title order={3} mt="md" id="chatbot-primary-shade-light">
        <span className="highlightable">Primary shade (light)</span>
      </Title>
      <Text>
        The shade index (0–9) used for the primary color in light mode. Lower
        numbers are lighter; higher numbers are darker.
      </Text>

      <Title order={3} mt="md" id="chatbot-primary-shade-dark">
        <span className="highlightable">Primary shade (dark)</span>
      </Title>
      <Text>
        The shade index (0–9) used for the primary color in dark mode.
      </Text>

      <Title order={3} mt="md" id="chatbot-theme-overrides">
        <span className="highlightable">Theme Overrides</span>
      </Title>
      <Text>
        Optional scoped CSS injected into the chatbot’s root container. Primarily intended for overriding exposed design tokens
        (e.g. --ai-kit*, --mantine*), but you can also add extra rules to fine-tune spacing, borders, and typography
        when the built-in options aren’t enough. For example:{" "}
        <Code>
          {":host, #ai-kit-inline-root, #ai-kit-portal-root { --ai-kit-chat-border-radius: 16px; }"}
        </Code>{" "}
        to round the chat window.
      </Text>

      <Title order={3} mt="md" id="chatbot-custom-colors">
        <span className="highlightable">Custom colors</span>
      </Title>
      <Text>
        Define named hex colors (for example <Code>brand</Code> →
        <Code>#228be6</Code>) that you can later select as the primary color.
        Use this to match the chatbot to your brand palette.
      </Text>

      <Title order={3} mt="md" id="chatbot-openbutton-position">
        <span className="highlightable">Open button position</span>
      </Title>
      <Text>
        Where the floating chatbot open button appears on the page (for example
        bottom-right). Choose a corner that doesn’t conflict with other floating
        UI elements.
      </Text>

      <Title order={3} mt="md" id="chatbot-openbutton-label">
        <span className="highlightable">Open button label</span>
      </Title>
      <Text>
        The text shown on the open button (for example “Ask me”). If empty, the
        default localized label is used.
      </Text>

      <Title order={3} mt="md" id="chatbot-openbutton-icon-layout">
        <span className="highlightable">Open button icon layout</span>
      </Title>
      <Text>
        Controls where the icon sits relative to the label
        (top/bottom/left/right).
      </Text>

      <Title order={3} mt="md" id="chatbot-openbutton-icon">
        <span className="highlightable">Open button icon (base64)</span>
      </Title>
      <Text>
        A Data URL for the icon (for example
        <Code>data:image/svg+xml;base64,...</Code>). Leave empty to use the
        default icon. For best results, use a simple, single-color SVG.
      </Text>

      <Title order={3} mt="md" id="chatbot-openbutton-show-title">
        <span className="highlightable">Show open button title</span>
      </Title>
      <Text>Toggles whether the label text is visible on the open button.</Text>

      <Title order={3} mt="md" id="chatbot-openbutton-show-icon">
        <span className="highlightable">Show open button icon</span>
      </Title>
      <Text>Toggles whether the icon is visible on the open button.</Text>

      <Title order={3} mt="md" id="chatbot-label-overrides">
        <span className="highlightable">Label overrides</span>
      </Title>
      <Text>
        Override any built-in UI label (buttons, status texts, etc.). Only the
        labels you change are stored; removing an override restores the default
        translation for the selected language.
      </Text>

      <Title order={3} mt="md" id="chatbot-max-images">
        <span className="highlightable">Max images</span>
      </Title>
      <Text>
        Limits how many images a user can attach in a single message. Set to 0
        to effectively disable image uploads.
      </Text>

      <Title order={3} mt="md" id="chatbot-max-image-bytes">
        <span className="highlightable">Max image bytes</span>
      </Title>
      <Text>
        Maximum allowed image size in bytes. This helps avoid large uploads and
        keeps requests within backend limits.
      </Text>
    </>
  ),
};

interface DocSidebarProps {
  opened: boolean;
  close: () => void;
  page: keyof typeof pages;
  scrollToId: string;
}

export default function DocSidebar({
  opened,
  close,
  page,
  scrollToId,
}: DocSidebarProps) {
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollHighlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scrollHighlightTimeoutRef.current) {
      clearTimeout(scrollHighlightTimeoutRef.current);
      scrollHighlightTimeoutRef.current = null;
    }
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
      highlightTimeoutRef.current = null;
    }

    document
      .querySelectorAll(classes["highlighted-doc-item"])
      .forEach((el) => el.classList.remove(classes["highlighted-doc-item"]));

    if (!opened || !scrollToId) {
      return;
    }

    scrollHighlightTimeoutRef.current = setTimeout(() => {
      const targetElement = document.getElementById(scrollToId);

      if (!targetElement) {
        scrollHighlightTimeoutRef.current = null;
        return;
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const highlightableEl = targetElement.querySelector(".highlightable");

      if (highlightableEl) {
        highlightableEl.classList.add(classes["highlighted-doc-item"]);

        highlightTimeoutRef.current = setTimeout(() => {
          highlightableEl.classList.remove(classes["highlighted-doc-item"]);
          highlightTimeoutRef.current = null;
        }, 2000);
      }

      scrollHighlightTimeoutRef.current = null;
    }, 0);

    return () => {
      if (scrollHighlightTimeoutRef.current) {
        clearTimeout(scrollHighlightTimeoutRef.current);
        scrollHighlightTimeoutRef.current = null;
      }
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = null;
      }
      document
        .querySelectorAll(classes["highlighted-doc-item"])
        .forEach((el) => el.classList.remove(classes["highlighted-doc-item"]));
    };
  }, [opened, scrollToId]);

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      title="Help"
      zIndex={999999}
    >
      <Stack>{pages[page]}</Stack>
    </Drawer>
  );
}
