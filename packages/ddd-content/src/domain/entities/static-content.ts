import type { ContentBody } from "../value-objects/content-body.js";
import type { ContentId } from "../value-objects/content-id.js";

export interface StaticContent {
	readonly id: ContentId;
	readonly key: string;
	readonly title: string;
	readonly body: ContentBody;
	readonly updatedAt: Date;
}
