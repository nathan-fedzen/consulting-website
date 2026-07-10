import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const settings = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/settings' }),
  schema: z.object({
    companyName: z.string(),
    tagline: z.string(),
    phoneDisplay: z.string(),
    phoneHref: z.string(),
    email: z.string(),
    linkedInUrl: z.string(),
    calendlyUrl: z.string(),
  }),
});

const statSchema = z.object({
  label: z.string(),
  value: z.number(),
  prefix: z.string().optional().default(''),
  suffix: z.string().optional().default(''),
});

const serviceItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
  schema: z.object({
    // Home
    heroEyebrow: z.string().optional(),
    heroSubtext: z.string().optional(),
    stats: z.array(statSchema).optional(),
    whoWeServeHeading: z.string().optional(),
    whoWeServeText: z.string().optional(),
    clientTypes: z.array(z.string()).optional(),
    expertise: z.array(serviceItemSchema).optional(),
    credibilityText: z.string().optional(),
    credentials: z.array(z.string()).optional(),
    linkedInHeading: z.string().optional(),
    linkedInText: z.string().optional(),
    linkedinEmbeds: z.array(z.string()).optional(),
    consultationText: z.string().optional(),

    // About
    consultantName: z.string().optional(),
    headshotImage: z.string().optional(),
    backgroundText: z.string().optional(),
    whyStartedText: z.string().optional(),
    philosophyText: z.string().optional(),
    education: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),

    // Services
    servicesHeading: z.string().optional(),
    servicesIntro: z.string().optional(),
    services: z.array(serviceItemSchema).optional(),
    servicesCtaHeading: z.string().optional(),
    servicesCtaText: z.string().optional(),

    // Contact
    contactHeading: z.string().optional(),
    contactIntro: z.string().optional(),
  }),
});

export const collections = { settings, pages };
