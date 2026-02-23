import { layer as DrizzleLayer } from "@effect/sql-drizzle/Pg";
import { Layer } from "effect";
import { BlogPostRepositoryLive } from "./adapters/outbound/blog-post-repository-drizzle.js";
import { StaticContentRepositoryLive } from "./adapters/outbound/static-content-repository-drizzle.js";

export const ContentRepositories = Layer.mergeAll(
  BlogPostRepositoryLive,
  StaticContentRepositoryLive,
);

export const ContentLive = ContentRepositories.pipe(
  Layer.provide(DrizzleLayer),
);
