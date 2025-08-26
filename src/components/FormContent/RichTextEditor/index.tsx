"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";
import styles from "@/styles/rich-text-editor.module.css";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	content: string;
	onChange: (e: string) => void;
	disabled?: boolean;
};

export default function RichTextEditor({
	content,
	onChange,
	disabled = false,
}: Props) {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Heading.configure({
				levels: [2, 3],
			}),
			Underline,
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
			}),
		],
		content: content,
      immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "rounded-md border min-h-[150px] border-input",
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return (
			<section className="flex flex-col justify-stretch">
				<Skeleton className="w-full border h-[42px] rounded-md mb-1" />
				<Skeleton className="h-[150px] w-full border rounded-md" />
			</section>
		);
	}

	return (
		<section className="flex flex-col justify-stretch">
			<Toolbar disabled={disabled} editor={editor} />
			<EditorContent editor={editor} className={styles.rich_text_editor} />
		</section>
	);
}
