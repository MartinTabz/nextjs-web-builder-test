"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/FormContent/RichTextEditor";
import WebBuilder from "@/components/FormContent/WebBuilder";

type Content = {
	type: "rte" | "web";
	content: string;
};

type Props = {
	content: Content;
	onUpdate: (content: Content) => void;
};

export default function FormContentAdapter({ content, onUpdate }: Props) {
	const [isBuilderOpen, setIsBuilderOpen] = React.useState(false);
	const builderInitialContentRef = React.useRef<string>(content?.content ?? "");

	const currentType = content?.type ?? "rte";
	const currentContent = content?.content ?? "";

	const handleTypeChange = React.useCallback(
		(value: string) => {
			if (value === currentType) return;
			onUpdate({ type: value as Content["type"], content: currentContent });
		},
		[onUpdate, currentType, currentContent]
	);

	const handleRteChange = React.useCallback(
		(html: string) => {
			onUpdate({ type: "rte", content: html });
		},
		[onUpdate]
	);

	const handleWebChange = React.useCallback(
		(data: string) => {
			onUpdate({ type: "web", content: data });
		},
		[onUpdate]
	);

	return (
		<section className="flex flex-col gap-3">
			<Tabs
				value={currentType}
				onValueChange={handleTypeChange}
				className="w-fit"
			>
				<TabsList className="grid grid-cols-2 w-full">
					<TabsTrigger value="rte">Rich Text</TabsTrigger>
					<TabsTrigger value="web">Web Builder</TabsTrigger>
				</TabsList>
			</Tabs>

			{currentType === "rte" ? (
				<RichTextEditor content={currentContent} onChange={handleRteChange} />
			) : (
				<div className="flex flex-col gap-2">
					<Button
						type="button"
						variant="secondary"
						onClick={() => {
							builderInitialContentRef.current = currentContent;
							setIsBuilderOpen(true);
						}}
					>
						Open Web Builder
					</Button>

					<WebBuilder
						content={builderInitialContentRef.current}
						onChange={handleWebChange}
						isOpen={isBuilderOpen}
						setOpen={setIsBuilderOpen}
					/>
				</div>
			)}
		</section>
	);
}
