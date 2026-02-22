import { ContentId } from "../value-objects/content-id.js";
import { ContentBody } from "../value-objects/content-body.js";

export interface StaticContent {
  readonly id: ContentId;
  readonly key: string;
  readonly title: string;
  readonly body: ContentBody;
  readonly updatedAt: Date;
}
