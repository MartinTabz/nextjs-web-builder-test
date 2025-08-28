"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/FormContent/RichTextEditor";

// Helper function to generate slug
const generateSlug = (text: string) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove special characters
		.replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
		.replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Slug refinement function
const slugRefine = (slug: string) => {
	const refined = generateSlug(slug);
	return refined.length >= 3 && refined.length <= 100;
};

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters." })
		.max(100, { message: "Name must not exceed 100 characters." }),
	slug: z
		.string()
		.min(3, { message: "Slug must be at least 3 characters." })
		.max(100, { message: "Slug must not exceed 100 characters." })
		.refine(slugRefine, {
			message: "Slug must contain only letters, numbers, and hyphens.",
		}),
	content: z.string().min(1, { message: "Content is required." }),
});

export function SimpleForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			slug: "",
			content: "",
		},
	});

	// Watch the name field to auto-generate slug
	const nameValue = form.watch("name");

	// Auto-generate slug when name changes
	React.useEffect(() => {
		if (nameValue) {
			const generatedSlug = generateSlug(nameValue);
			form.setValue("slug", generatedSlug, { shouldValidate: true });
		}
	}, [nameValue, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		toast("Form submitted successfully!", {
			description: (
				<pre className="mt-2 relative overflow-scroll bg-muted w-[320px] rounded-md p-4">
					<code>{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
		console.log(values);
	}

	return (
		<section className="flex flex-col gap-4 items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<Card className="max-w-md mx-auto mt-8">
						<CardHeader>
							<CardTitle>Create New Item</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter item name" {...field} />
										</FormControl>
										<FormDescription>
											Enter a descriptive name (3-100 characters).
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input placeholder="auto-generated-slug" {...field} />
										</FormControl>
										<FormDescription>
											URL-friendly identifier (auto-generated from name,
											editable).
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<Card className="max-w-md mx-auto">
						<CardHeader>
							<CardTitle>Content</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<RichTextEditor
												content={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<Button type="submit" className="w-fit mx-auto">
						Create Item
					</Button>
				</form>
			</Form>
		</section>
	);
}
