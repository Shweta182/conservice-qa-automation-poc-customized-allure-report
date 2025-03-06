import { z } from 'zod';
// z.object({...}) ----> creates a schema for an object where each key is validated against specific rules.
export const envSchema = z.object({
    //The TEST_USER variable must be a string
    TEST_USER: z.string(),
    PASSWORD: z.string(),
    BASE_URL: z.string(),
    BASE_API_URL: z.string(),
    AUTH_URL: z.string(),
    TOKEN: z.string(),
    PROJECT_KEY: z.string(),
    PROJECT_NAME: z.string(),
    VERSION: z.string().optional().nullable(),
    JIRA_KEY: z.string(),
    CYCLE: z.string().optional().nullable(),
});

//VERSION: z.string().optional().nullable(): The VERSION variable can either:
//Be a string.
//Be missing (optional).
//Be explicitly null (nullable).