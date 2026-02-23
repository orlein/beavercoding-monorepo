import Link from "next/link";
import {
	Button,
} from "@beavercoding/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@beavercoding/ui/components/card";
import { Separator } from "@beavercoding/ui/components/separator";

const features = [
	{
		title: "React Native & Web Apps",
		description:
			"Cross-platform mobile apps and responsive web experiences built with React Native and React.js.",
	},
	{
		title: "Next.js Frontends",
		description:
			"High-performance frontend applications using Next.js App Router, server components, and streaming.",
	},
	{
		title: "Node.js Backends",
		description:
			"Robust, scalable server-side systems with Node.js, Effect.ts, and well-structured domain architecture.",
	},
	{
		title: "Knowledge Monetization",
		description:
			"Systems for efficiently storing, retrieving, and monetizing information and digital knowledge assets.",
	},
];

export default function HomePage() {
	return (
		<div className="mx-auto max-w-5xl px-4">
			{/* Hero */}
			<section className="flex flex-col items-center py-24 text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					BeaverCoding
				</h1>
				<p className="mt-4 max-w-xl text-lg text-muted-foreground">
					We build React Native apps, Next.js frontends, and Node.js backends
					— and we help teams turn knowledge into products.
				</p>
				<div className="mt-8 flex gap-3">
					<Button asChild>
						<Link href="/blog">Read our blog</Link>
					</Button>
					<Button variant="outline" asChild>
						<a href="#contact">Contact us</a>
					</Button>
				</div>
			</section>

			<Separator />

			{/* Features */}
			<section className="py-20">
				<h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">
					What we do
				</h2>
				<div className="grid gap-6 sm:grid-cols-2">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader>
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{feature.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Separator />

			{/* Contact */}
			<section id="contact" className="py-20 text-center">
				<h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
				<p className="mt-4 text-muted-foreground">
					Have a project in mind? We would love to hear from you.
				</p>
				<Button className="mt-6" asChild>
					<a href="mailto:hello@beavercoding.dev">
						hello@beavercoding.dev
					</a>
				</Button>
			</section>
		</div>
	);
}
