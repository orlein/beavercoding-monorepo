import { Context, Effect } from "effect";
import type { StaticContent } from "../../../domain/entities/static-content.js";
import type { ContentNotFoundError } from "../../../domain/errors/index.js";

export interface StaticContentRepositoryService {
  readonly findByKey: (
    key: string,
  ) => Effect.Effect<StaticContent, ContentNotFoundError>;
  readonly findById: (
    id: string,
  ) => Effect.Effect<StaticContent, ContentNotFoundError>;
}

export class StaticContentRepository extends Context.Tag(
  "@ddd-content/StaticContentRepository",
)<StaticContentRepository, StaticContentRepositoryService>() {}
