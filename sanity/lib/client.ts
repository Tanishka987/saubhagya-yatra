import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export const previewClient = createClient({
  apiVersion,
  dataset,
  projectId,

  useCdn: false,
  // Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
  // As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
  token:
    process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

export const getClient = (preview: any) =>
  preview ? previewClient : sanityClient;

export function overlayDrafts(docs: any) {
  const documents = docs || [];
  const overlayed = documents.reduce((map: any, doc: any) => {
    if (!doc._id) {
      throw new Error("Ensure that `_id` is included in query projection");
    }

    const isDraft = doc._id.startsWith("drafts.");
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map());

  return Array.from(overlayed.values());
}
