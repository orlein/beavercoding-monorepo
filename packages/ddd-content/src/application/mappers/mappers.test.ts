import { describe, expect, it } from "vitest";
import type { BlogPost } from "../../domain/entities/blog-post.js";
import type { StaticContent } from "../../domain/entities/static-content.js";
import { ContentBody } from "../../domain/value-objects/content-body.js";
import { ContentId } from "../../domain/value-objects/content-id.js";
import { Slug } from "../../domain/value-objects/slug.js";
import { toBlogPostDto, toStaticContentDto } from "./index.js";

describe("toBlogPostDto", () => {
	const now = new Date("2026-01-15T10:00:00.000Z");

	const post: BlogPost = {
		id: ContentId.make("post-1"),
		title: "Test Post",
		slug: Slug.fromRaw("test-post"),
		body: ContentBody.make("Hello world"),
		status: "published",
		authorId: "author-1",
		createdAt: now,
		updatedAt: now,
	};

	it("maps id to string value", () => {
		expect(toBlogPostDto(post).id).toBe("post-1");
	});

	it("maps slug to string value", () => {
		expect(toBlogPostDto(post).slug).toBe("test-post");
	});

	it("maps body to string value", () => {
		expect(toBlogPostDto(post).body).toBe("Hello world");
	});

	it("converts dates to ISO strings", () => {
		const dto = toBlogPostDto(post);
		expect(dto.createdAt).toBe("2026-01-15T10:00:00.000Z");
		expect(dto.updatedAt).toBe("2026-01-15T10:00:00.000Z");
	});

	it("preserves title, status, authorId", () => {
		const dto = toBlogPostDto(post);
		expect(dto.title).toBe("Test Post");
		expect(dto.status).toBe("published");
		expect(dto.authorId).toBe("author-1");
	});
});

describe("toStaticContentDto", () => {
	const now = new Date("2026-02-20T12:00:00.000Z");

	const content: StaticContent = {
		id: ContentId.make("content-1"),
		key: "about",
		title: "About Page",
		body: ContentBody.make("About us text"),
		updatedAt: now,
	};

	it("maps id to string value", () => {
		expect(toStaticContentDto(content).id).toBe("content-1");
	});

	it("maps body to string value", () => {
		expect(toStaticContentDto(content).body).toBe("About us text");
	});

	it("converts date to ISO string", () => {
		expect(toStaticContentDto(content).updatedAt).toBe(
			"2026-02-20T12:00:00.000Z",
		);
	});

	it("preserves key and title", () => {
		const dto = toStaticContentDto(content);
		expect(dto.key).toBe("about");
		expect(dto.title).toBe("About Page");
	});
});
