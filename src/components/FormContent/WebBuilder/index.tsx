import WebBuilderNavigation from "./Navigation";
import PageEditor from "./PageEditor";
import PageEditorSidebar from "./Sidebar";
import EditorProvider from "./Utilities/provider";

type Props = {
	content: string;
	onChange: (e: string) => void;
	disabled?: boolean;
};

export default function WebBuilder({ content, onChange, disabled }: Props) {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
			<EditorProvider>
				<WebBuilderNavigation />

				<div className="h-full flex justify-center bg-sidebar">
					<PageEditor liveMode={false} showNavigation={true} />
				</div>

				<PageEditorSidebar />
			</EditorProvider>
		</div>
	);
}
