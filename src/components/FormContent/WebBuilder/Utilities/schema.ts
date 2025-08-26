import { z } from "zod";

// Device types schema
export const DeviceTypesSchema = z.enum(["Desktop", "Mobile", "Tablet"]);

// Editor button types schema
export const EditorBtnsSchema = z
	.enum([
		"text",
		"container",
		"section",
		"contactForm",
		"paymentForm",
		"link",
		"2Col",
		"video",
		"__body",
		"image",
		"3Col",
	])
	.nullable();

// Link-like object schema
export const LinkLikeSchema = z.object({
	href: z.string().optional(),
	innerText: z.string().optional(),
});

// CSS Properties schema - allowing any CSS property as string/number
export const CSSPropertiesSchema = z.record(
	z.string(),
	z.union([z.string(), z.number()])
);

// EditorElement schema with recursive content
export const EditorElementSchema: z.ZodSchema = z.lazy(() =>
	z.object({
		id: z.string(),
		styles: CSSPropertiesSchema,
		name: z.string(),
		type: EditorBtnsSchema,
		content: z.union([
			z.array(EditorElementSchema), // Array of nested EditorElements
			LinkLikeSchema, // Or a LinkLike object
		]),
	})
);

// Main Editor schema
export const EditorSchema = z.object({
	liveMode: z.boolean(),
	elements: z.array(EditorElementSchema),
	selectedElement: EditorElementSchema,
	device: DeviceTypesSchema,
	previewMode: z.boolean(),
});

// Export types inferred from schemas for TypeScript usage
export type EditorType = z.infer<typeof EditorSchema>;
export type EditorElementType = z.infer<typeof EditorElementSchema>;
export type DeviceTypesType = z.infer<typeof DeviceTypesSchema>;
export type EditorBtnsType = z.infer<typeof EditorBtnsSchema>;
export type LinkLikeType = z.infer<typeof LinkLikeSchema>;
