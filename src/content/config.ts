import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
    title: z.string().min(5).max(120).optional(),
    description: z.string().min(15).max(160).optional(),
    image: z
        .object({
            src: z.string(),
            alt: z.string().optional()
        })
        .optional(),
    pageType: z.enum(['website', 'article']).default('website')
});

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        excerpt: z.string().optional(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        isFeatured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        canonicalUrl: z.string().url().optional(),
        seo: seoSchema.optional()
    })
});

const pages = defineCollection({
    schema: z.object({
        title: z.string(),
        seo: seoSchema.optional()
    })
});

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        publishDate: z.coerce.date(),
        isFeatured: z.boolean().default(false),
        seo: seoSchema.optional()
    })
});

const experience = defineCollection({
    schema: z.object({
        company: z.string(),
        role: z.string(),
        location: z.string().optional(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        isCurrent: z.boolean().default(false),
        description: z.string().optional(),
        technologies: z.array(z.string()).default([]),
        highlights: z.array(z.string()).default([]),
        companyUrl: z.string().url().optional(),
        isFeatured: z.boolean().default(false),
        seo: seoSchema.optional()
    })
});

export const collections = { blog, pages, projects, experience };
