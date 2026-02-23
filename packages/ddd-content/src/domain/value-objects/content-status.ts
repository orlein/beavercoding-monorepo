export const ContentStatus = {
	Draft: "draft",
	Published: "published",
	Hidden: "hidden",
} as const;

export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];
