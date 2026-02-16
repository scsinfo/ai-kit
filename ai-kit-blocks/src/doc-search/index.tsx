import { AiKitDocSearchIcon, TEXT_DOMAIN } from "@smart-cloud/ai-kit-core";
import { registerBlockType, type BlockAttributes } from "@wordpress/blocks";
import metadata from "./block.json";
import { Edit } from "./edit";
import { Save } from "./save";

import "./index.css";

registerBlockType(metadata.name, {
  apiVersion: metadata.apiVersion,
  attributes: metadata.attributes as BlockAttributes,
  title: metadata.title,
  category: metadata.category,
  description: metadata.description,
  edit: Edit,
  save: Save,
  icon: <AiKitDocSearchIcon style={{ fill: "none" }} />,
  textdomain: TEXT_DOMAIN,
});
