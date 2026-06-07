import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    publishDate: z.string().optional(),
    isFeatured: z.boolean().default(false),
    itchGameId: z.string().optional(),
    youtubeVideoId: z.string().optional(),
  }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/logs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, logs };
