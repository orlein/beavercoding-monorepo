import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import type { BlogPost } from "../../../domain/entities/blog-post.js";
import { ContentNotFoundError } from "../../../domain/errors/index.js";
import { ContentBody } from "../../../domain/value-objects/content-body.js";
import { ContentId } from "../../../domain/value-objects/content-id.js";
import { Slug } from "../../../domain/value-objects/slug.js";
import type { BlogPostRepositoryService } from "../../ports/outbound/blog-post-repository.js";
import { BlogPostRepository } from "../../ports/outbound/blog-post-repository.js";

const now = new Date("2026-01-15T10:00:00.000Z");

const samplePost: BlogPost = {
	id: ContentId.make("post-1"),
	title: "Test Post",
	slug: Slug.fromRaw("test-post"),
	body: ContentBody.make("Hello world"),
	status: "published",
	authorId: "author-1",
	createdAt: now,
	updatedAt: now,
};

const mockService: BlogPostRepositoryService = {
	findPublished: () => Effect.succeed([samplePost]),
	findBySlug: (slug: string) =>
		slug === "test-post"
			? Effect.succeed(samplePost)
			: Effect.fail(
					new ContentNotFoundError({
						message: `Not found: ${slug}`,
						id: slug,
					}),
				),
	findById: (id: string) =>
		id === "post-1"
			? Effect.succeed(samplePost)
			: Effect.fail(
					new ContentNotFoundError({
						message: `Not found: ${id}`,
						id,
					}),
				),
};

const TestLayer = Layer.succeed(BlogPostRepository, mockService);

describe("BlogPostRepository (mock)", () => {
	it("findPublished returns published posts", async () => {
		const result = await Effect.runPromise(
			Effect.gen(function* () {
				const repo = yield* BlogPostRepository;
				return yield* repo.findPublished();
			}).pipe(Effect.provide(TestLayer)),
		);

		expect(result).toHaveLength(1);
		expect(result[0]?.title).toBe("Test Post");
		expect(result[0]?.status).toBe("published");
	});

	it("findBySlug returns matching post", async () => {
		const result = await Effect.runPromise(
			Effect.gen(function* () {
				const repo = yield* BlogPostRepository;
				return yield* repo.findBySlug("test-post");
			}).pipe(Effect.provide(TestLayer)),
		);

		expect(result.slug.value).toBe("test-post");
	});

	it("findBySlug fails with ContentNotFoundError for unknown slug", async () => {
		const result = await Effect.runPromiseExit(
			Effect.gen(function* () {
				const repo = yield* BlogPostRepository;
				return yield* repo.findBySlug("unknown");
			}).pipe(Effect.provide(TestLayer)),
		);

		expect(result._tag).toBe("Failure");
	});

	it("findById returns matching post", async () => {
		const result = await Effect.runPromise(
			Effect.gen(function* () {
				const repo = yield* BlogPostRepository;
				return yield* repo.findById("post-1");
			}).pipe(Effect.provide(TestLayer)),
		);

		expect(result.id.value).toBe("post-1");
	});

	it("findById fails with ContentNotFoundError for unknown id", async () => {
		const result = await Effect.runPromiseExit(
			Effect.gen(function* () {
				const repo = yield* BlogPostRepository;
				return yield* repo.findById("unknown");
			}).pipe(Effect.provide(TestLayer)),
		);

		expect(result._tag).toBe("Failure");
	});
});
