import { ContentId } from "../value-objects/content-id.js";
import { Slug } from "../value-objects/slug.js";
import { ContentBody } from "../value-objects/content-body.js";
import type { ContentStatus } from "../value-objects/content-status.js";

export interface BlogPost {
  readonly id: ContentId;
  readonly title: string;
  readonly slug: Slug;
  readonly body: ContentBody;
  readonly status: ContentStatus;
  readonly authorId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
