import WebBuilderNavigation from "./Navigation";
import PageEditor from "./PageEditor";
import PageEditorSidebar from "./Sidebar";
import EditorProvider from "./Utilities/provider";

type Props = {
	content: string;
	onChange: (e: string) => void;
	disabled?: boolean;
	showNavigation?: boolean;
};

export default function WebBuilder({
	content,
	onChange,
	disabled,
	showNavigation = true,
}: Props) {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
			<EditorProvider content={content} onChange={onChange} disabled={disabled}>
				<WebBuilderNavigation />

				<div className="h-full flex justify-center bg-sidebar">
					<PageEditor liveMode={false} showNavigation={showNavigation} />
				</div>

				<PageEditorSidebar />
			</EditorProvider>
		</div>
	);
}
