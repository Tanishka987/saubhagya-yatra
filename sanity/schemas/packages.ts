import { Rule, defineField, defineType } from "sanity";

export default defineType({
  name: "packages",
  type: "document",
  title: "Packages",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: Rule) => Rule.required().min(2).max(2),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "seats",
      title: "Seats",
      type: "number",
      validation: (Rule: Rule) => Rule.required().integer(),
    },
    {
      name: "extras",
      title: "Extras",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "popular",
      title: "Popular",
      type: "boolean",
      description: "Toggle this to mark the package as popular",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Toggle this to mark the package as featured",
    },
  ],
});
