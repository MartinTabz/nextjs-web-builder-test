"use client";

import WebBuilder from "@/components/FormContent/WebBuilder";
import { useEffect, useState } from "react";

export default function WebBuilderPage() {
	const [content, setContent] = useState("");

	useEffect(() => {
		console.log(content);
	}, [content]);

	return (
		<WebBuilder content={content} onChange={setContent} disabled={false} />
	);
}
