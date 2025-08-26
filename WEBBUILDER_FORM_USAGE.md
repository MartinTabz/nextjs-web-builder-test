# WebBuilder Form Integration

The WebBuilder component now supports form integration with `onChange` and `content` props.

## Props Interface

```typescript
type Props = {
	content: string; // JSON string of saved content
	onChange: (e: string) => void; // Callback when content changes
	disabled?: boolean; // Disable editing (read-only mode)
	showNavigation?: boolean; // Show/hide navigation bar
};
```

## Usage Examples

### Basic Form Integration

```tsx
"use client";

import { useState } from "react";
import WebBuilder from "@/components/FormContent/WebBuilder";

export default function MyFormPage() {
	const [webBuilderContent, setWebBuilderContent] = useState<string>("");
	const [isReadOnly, setIsReadOnly] = useState(false);

	const handleSave = () => {
		// Save webBuilderContent to your database
		console.log("Saving content:", webBuilderContent);
	};

	return (
		<div>
			<div className="mb-4 flex gap-2">
				<button onClick={() => setIsReadOnly(!isReadOnly)}>
					{isReadOnly ? "Enable Editing" : "Disable Editing"}
				</button>
				<button onClick={handleSave}>Save to Database</button>
			</div>

			<WebBuilder
				content={webBuilderContent}
				onChange={setWebBuilderContent}
				disabled={isReadOnly}
				showNavigation={true}
			/>
		</div>
	);
}
```

### React Hook Form Integration

```tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import WebBuilder from "@/components/FormContent/WebBuilder";

type FormData = {
	title: string;
	pageContent: string;
	isPublished: boolean;
};

export default function PageEditorForm() {
	const { control, handleSubmit, watch } = useForm<FormData>({
		defaultValues: {
			title: "",
			pageContent: "",
			isPublished: false,
		},
	});

	const isPublished = watch("isPublished");

	const onSubmit = (data: FormData) => {
		console.log("Form submission:", data);
		// Send to API
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label>Page Title</label>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<input {...field} className="border p-2 w-full" />
					)}
				/>
			</div>

			<div className="mb-4">
				<label>
					<Controller
						name="isPublished"
						control={control}
						render={({ field }) => (
							<input
								type="checkbox"
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					Published (read-only when published)
				</label>
			</div>

			<div className="mb-4">
				<label>Page Content</label>
				<Controller
					name="pageContent"
					control={control}
					render={({ field }) => (
						<WebBuilder
							content={field.value}
							onChange={field.onChange}
							disabled={isPublished}
							showNavigation={true}
						/>
					)}
				/>
			</div>

			<button type="submit">Save Page</button>
		</form>
	);
}
```

### Database Integration Example

```tsx
"use client";

import { useState, useEffect } from "react";
import WebBuilder from "@/components/FormContent/WebBuilder";

type Page = {
	id: string;
	title: string;
	content: string;
	isPublished: boolean;
};

export default function EditPageForm({ pageId }: { pageId: string }) {
	const [page, setPage] = useState<Page | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	// Load page data
	useEffect(() => {
		async function loadPage() {
			const response = await fetch(`/api/pages/${pageId}`);
			const data = await response.json();
			setPage(data);
		}
		loadPage();
	}, [pageId]);

	const handleContentChange = (newContent: string) => {
		if (page) {
			setPage({ ...page, content: newContent });
		}
	};

	const handleSave = async () => {
		if (!page) return;

		setIsSaving(true);
		try {
			await fetch(`/api/pages/${pageId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(page),
			});
			alert("Page saved successfully!");
		} catch (error) {
			alert("Failed to save page");
		} finally {
			setIsSaving(false);
		}
	};

	if (!page) return <div>Loading...</div>;

	return (
		<div>
			<div className="mb-4 flex gap-2">
				<input
					value={page.title}
					onChange={(e) => setPage({ ...page, title: e.target.value })}
					placeholder="Page title"
					className="border p-2"
				/>
				<button onClick={handleSave} disabled={isSaving}>
					{isSaving ? "Saving..." : "Save Page"}
				</button>
			</div>

			<WebBuilder
				content={page.content}
				onChange={handleContentChange}
				disabled={page.isPublished || isSaving}
				showNavigation={true}
			/>
		</div>
	);
}
```

## Content Format

The WebBuilder saves/loads content as a JSON string with this structure:

```json
{
	"elements": [
		{
			"id": "__body",
			"name": "Body",
			"type": "__body",
			"styles": {},
			"content": [
				// Nested page elements...
			]
		}
	],
	"device": "Desktop"
}
```

## Features

✅ **Controlled Component** - Works like any other form input  
✅ **Initial Content Loading** - Pass existing content via `content` prop  
✅ **Real-time Updates** - `onChange` fires when user makes changes  
✅ **Read-only Mode** - Use `disabled` prop to prevent editing  
✅ **Prevents Initial Trigger** - Won't call `onChange` during initial load  
✅ **Error Handling** - Gracefully handles invalid JSON content  
✅ **TypeScript Support** - Full type safety

## State Management

The WebBuilder automatically:

- Loads content when `content` prop changes
- Calls `onChange` when user modifies the design
- Disables UI interactions when `disabled={true}`
- Hides sidebar and editing tools in disabled mode
- Preserves device state in saved content
