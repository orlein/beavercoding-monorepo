import { PgDrizzle } from "@effect/sql-drizzle/Pg";
import { eq } from "drizzle-orm";
import { Effect, Layer } from "effect";
import { ContentId } from "../../../domain/value-objects/content-id.js";
import { ContentBody } from "../../../domain/value-objects/content-body.js";
import { ContentNotFoundError } from "../../../domain/errors/index.js";
import type { StaticContent } from "../../../domain/entities/static-content.js";
import { StaticContentRepository } from "../../ports/outbound/static-content-repository.js";
import { staticContents } from "../../schema/static-contents.js";

function toDomain(row: typeof staticContents.$inferSelect): StaticContent {
  return {
    id: ContentId.make(row.id),
    key: row.key,
    title: row.title,
    body: ContentBody.make(row.body),
    updatedAt: row.updatedAt,
  };
}

export const StaticContentRepositoryLive = Layer.effect(
  StaticContentRepository,
  Effect.gen(function* () {
    const db = yield* PgDrizzle;

    return {
      findByKey: (key: string) =>
        db
          .select()
          .from(staticContents)
          .where(eq(staticContents.key, key))
          .pipe(
            Effect.orDie,
            Effect.flatMap((rows) =>
              rows.length === 0
                ? Effect.fail(
                    new ContentNotFoundError({
                      message: `Static content not found: ${key}`,
                      id: key,
                    }),
                  )
                : Effect.succeed(toDomain(rows[0]!)),
            ),
          ),

      findById: (id: string) =>
        db
          .select()
          .from(staticContents)
          .where(eq(staticContents.id, id))
          .pipe(
            Effect.orDie,
            Effect.flatMap((rows) =>
              rows.length === 0
                ? Effect.fail(
                    new ContentNotFoundError({
                      message: `Static content not found: ${id}`,
                      id,
                    }),
                  )
                : Effect.succeed(toDomain(rows[0]!)),
            ),
          ),
    };
  }),
);
