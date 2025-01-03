import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import post from "./schemas/post";

import packages from "./schemas/packages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, packages, blockContent],
};
