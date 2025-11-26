import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "~/env";
import * as schema from "./schema";

const client = neon(env.DATABASE_URL);

export const db: NeonHttpDatabase<typeof schema> = drizzle(client, { schema });
