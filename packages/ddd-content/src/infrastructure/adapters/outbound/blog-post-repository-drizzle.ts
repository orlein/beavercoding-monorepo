import { PgDrizzle } from "@effect/sql-drizzle/Pg";
import { eq } from "drizzle-orm";
import { Effect, Layer } from "effect";
import { ContentId } from "../../../domain/value-objects/content-id.js";
import { ContentBody } from "../../../domain/value-objects/content-body.js";
import { Slug } from "../../../domain/value-objects/slug.js";
import { ContentNotFoundError } from "../../../domain/errors/index.js";
import type { BlogPost } from "../../../domain/entities/blog-post.js";
import type { ContentStatus } from "../../../domain/value-objects/content-status.js";
import { BlogPostRepository } from "../../ports/outbound/blog-post-repository.js";
import { blogPosts } from "../../schema/blog-posts.js";

function toDomain(row: typeof blogPosts.$inferSelect): BlogPost {
  return {
    id: ContentId.make(row.id),
    title: row.title,
    slug: Slug.fromRaw(row.slug),
    body: ContentBody.make(row.body),
    status: row.status as ContentStatus,
    authorId: row.authorId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export const BlogPostRepositoryLive = Layer.effect(
  BlogPostRepository,
  Effect.gen(function* () {
    const db = yield* PgDrizzle;

    return {
      findPublished: () =>
        db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.status, "published"))
          .pipe(
            Effect.map((rows) => rows.map(toDomain)),
            Effect.orDie,
          ),

      findBySlug: (slug: string) =>
        db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.slug, slug))
          .pipe(
            Effect.orDie,
            Effect.flatMap((rows) =>
              rows.length === 0
                ? Effect.fail(
                    new ContentNotFoundError({
                      message: `Blog post not found: ${slug}`,
                      id: slug,
                    }),
                  )
                : Effect.succeed(toDomain(rows[0]!)),
            ),
          ),

      findById: (id: string) =>
        db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.id, id))
          .pipe(
            Effect.orDie,
            Effect.flatMap((rows) =>
              rows.length === 0
                ? Effect.fail(
                    new ContentNotFoundError({
                      message: `Blog post not found: ${id}`,
                      id,
                    }),
                  )
                : Effect.succeed(toDomain(rows[0]!)),
            ),
          ),
    };
  }),
);
