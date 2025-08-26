"use client";

import WebBuilder from "@/components/FormContent/WebBuilder";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function WebBuilderPage() {
	const [content, setContent] = useState("");
	const [isBuilderOpen, setIsBuilderOpen] = useState(false);
	const [isReadOnly, setIsReadOnly] = useState(false);

	useEffect(() => {
		console.log("WebBuilder content updated:", content);
	}, [content]);

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">WebBuilder Modal Example</h1>

				<div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
					<h2 className="text-xl font-semibold mb-4">Form Controls</h2>
					<div className="flex gap-4 mb-4">
						<Button
							onClick={() => setIsBuilderOpen(true)}
							disabled={isBuilderOpen}
						>
							Open WebBuilder
						</Button>
						<Button
							onClick={() => setIsReadOnly(!isReadOnly)}
							variant="outline"
						>
							{isReadOnly ? "Enable Editing" : "Make Read-Only"}
						</Button>
						<Button onClick={() => setContent("")} variant="destructive">
							Clear Content
						</Button>
					</div>

					<div className="text-sm text-gray-600">
						<p>
							<strong>Status:</strong> Builder is{" "}
							{isBuilderOpen ? "open" : "closed"}
						</p>
						<p>
							<strong>Mode:</strong> {isReadOnly ? "Read-only" : "Editable"}
						</p>
						<p>
							<strong>Content Length:</strong> {content.length} characters
						</p>
					</div>
				</div>

				{content && (
					<div className="bg-white p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl font-semibold mb-4">Saved Content</h2>
						<pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
							{JSON.stringify(JSON.parse(content || "{}"), null, 2)}
						</pre>
					</div>
				)}
			</div>

			<WebBuilder
				content={content}
				onChange={setContent}
				disabled={isReadOnly}
				isOpen={isBuilderOpen}
				setOpen={setIsBuilderOpen}
				showNavigation={true}
			/>
		</div>
	);
}
