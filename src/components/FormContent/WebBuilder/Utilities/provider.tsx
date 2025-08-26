"use client";

import { EditorBtns } from "./constants";
import { EditorAction } from "./actions";
import {
	createContext,
	Dispatch,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

type LinkLike = { href?: string; innerText?: string };

export type EditorElement = {
	id: string;
	styles: React.CSSProperties;
	name: string;
	type: EditorBtns;
	content: EditorElement[] | LinkLike;
};

export type Editor = {
	liveMode: boolean;
	elements: EditorElement[];
	selectedElement: EditorElement;
	device: DeviceTypes;
	previewMode: boolean;
};

export type HistoryState = {
	history: Editor[];
	currentIndex: number;
};

export type EditorState = {
	editor: Editor;
	history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
	elements: [
		{
			content: [],
			id: "__body",
			name: "Body",
			styles: {},
			type: "__body",
		},
	],
	selectedElement: {
		id: "",
		content: [],
		name: "",
		styles: {},
		type: null,
	},
	device: "Desktop",
	previewMode: false,
	liveMode: false,
};

const initialHistoryState: HistoryState = {
	history: [initialEditorState],
	currentIndex: 0,
};

const initialState: EditorState = {
	editor: initialEditorState,
	history: initialHistoryState,
};

const addAnElement = (
	editorArray: EditorElement[],
	action: EditorAction
): EditorElement[] => {
	if (action.type !== "ADD_ELEMENT") {
		throw Error(
			"You sent the wrong action type to the Add Element editor State"
		);
	}
	return editorArray.map((item) => {
		if (item.id === action.payload.containerId && Array.isArray(item.content)) {
			return {
				...item,
				content: [...item.content, action.payload.elementDetails],
			};
		} else if (item.content && Array.isArray(item.content)) {
			return {
				...item,
				content: addAnElement(item.content, action),
			};
		}
		return item;
	});
};

const updateAnElement = (
	editorArray: EditorElement[],
	action: EditorAction
): EditorElement[] => {
	if (action.type !== "UPDATE_ELEMENT") {
		throw Error("You sent the wrong action type to the update Element State");
	}

	return editorArray.map((item) => {
		if (item.id === action.payload.elementDetails.id) {
			return { ...item, ...action.payload.elementDetails };
		} else if (item.content && Array.isArray(item.content)) {
			return {
				...item,
				content: updateAnElement(item.content, action),
			};
		}

		return item;
	});
};

const deleteAnElement = (
	editorArray: EditorElement[],
	action: EditorAction
): EditorElement[] => {
	if (action.type !== "DELETE_ELEMENT") {
		throw Error(
			"You sent the wrong action type to the Delete Element editor State"
		);
	}

	return editorArray.filter((item) => {
		if (item.id === action.payload.elementDetails.id) {
			return false;
		} else if (item.content && Array.isArray(item.content)) {
			item.content = deleteAnElement(item.content, action);
		}
		return true;
	});
};

const editorReducer = (
	state: EditorState = initialState,
	action: EditorAction
): EditorState => {
	switch (action.type) {
		case "ADD_ELEMENT":
			const updatedEditorState = {
				...state.editor,
				elements: addAnElement(state.editor.elements, action),
			};
			const updatedHistory = [
				...state.history.history.slice(0, state.history.currentIndex + 1),
				{ ...updatedEditorState },
			];

			const newEditorState = {
				...state,
				editor: updatedEditorState,
				history: {
					...state.history,
					history: updatedHistory,
					currentIndex: updatedHistory.length - 1,
				},
			};
			return newEditorState;

		case "UPDATE_ELEMENT":
			const updatedElements = updateAnElement(state.editor.elements, action);

			const UpdatedElementIsSelected =
				state.editor.selectedElement.id === action.payload.elementDetails.id;

			const updatedEditorStateWithUpdate = {
				...state.editor,
				elements: updatedElements,
				selectedElement: UpdatedElementIsSelected
					? action.payload.elementDetails
					: {
							id: "",
							content: [],
							name: "",
							styles: {},
							type: null,
					  },
			};

			const updatedHistoryWithUpdate = [
				...state.history.history.slice(0, state.history.currentIndex + 1),
				{ ...updatedEditorStateWithUpdate },
			];

			const updatedEditor = {
				...state,
				editor: updatedEditorStateWithUpdate,
				history: {
					...state.history,
					history: updatedHistoryWithUpdate,
					currentIndex: updatedHistoryWithUpdate.length - 1,
				},
			};

			return updatedEditor;

		case "DELETE_ELEMENT":
			const updatedElementsAfterDelete = deleteAnElement(
				state.editor.elements,
				action
			);

			const updatedEditorStateAfterDelete = {
				...state.editor,
				elements: updatedElementsAfterDelete,
			};

			const updatedHistoryAfterDelete = [
				...state.history.history.slice(0, state.history.currentIndex + 1),
				{ ...updatedEditorStateAfterDelete },
			];

			const deletedState = {
				...state,
				editor: updatedEditorStateAfterDelete,
				history: {
					...state.history,
					history: updatedHistoryAfterDelete,
					currentIndex: updatedHistoryAfterDelete.length - 1,
				},
			};

			return deletedState;

		case "CHANGE_CLICKED_ELEMENT":
			const clickedState = {
				...state,
				editor: {
					...state.editor,
					selectedElement: action.payload.elementDetails || {
						id: "",
						content: [],
						name: "",
						styles: {},
						type: null,
					},
				},
				history: {
					...state.history,
					history: [
						...state.history.history.slice(0, state.history.currentIndex + 1),
						{ ...state.editor },
					],
					currentIndex: state.history.currentIndex + 1,
				},
			};

			return clickedState;

		case "CHANGE_DEVICE":
			const changedDeviceState = {
				...state,
				editor: {
					...state.editor,
					device: action.payload.device,
				},
			};

			return changedDeviceState;

		case "TOGGLE_PREVIEW_MODE":
			const toggleState = {
				...state,
				editor: {
					...state.editor,
					previewMode: !state.editor.previewMode,
				},
			};

			return toggleState;

		case "TOGGLE_LIVE_MODE":
			const toggleLiveState = {
				...state,
				editor: {
					...state.editor,
					liveMode: action.payload
						? action.payload.value
						: !state.editor.liveMode,
				},
			};

			return toggleLiveState;

		case "REDO":
			if (state.history.currentIndex < state.history.history.length - 1) {
				const nextIndex = state.history.currentIndex + 1;
				const nextEditorState = { ...state.history.history[nextIndex] };
				const redoState = {
					...state,
					editor: nextEditorState,
					history: {
						...state.history,
						currentIndex: nextIndex,
					},
				};

				return redoState;
			}

			return state;

		case "UNDO":
			if (state.history.currentIndex > 0) {
				const prevIndex = state.history.currentIndex - 1;
				const prevEditorState = { ...state.history.history[prevIndex] };
				const undoState = {
					...state,
					editor: prevEditorState,
					history: {
						...state.history,
						currentIndex: prevIndex,
					},
				};

				return undoState;
			}

			return state;

		case "LOAD_DATA":
			return {
				...initialState,
				editor: {
					...initialState.editor,
					elements: action.payload.elements || initialEditorState.elements,
					liveMode: !!action.payload.withLive,
				},
			};

		default:
			return state;
	}
};

export type EditorContextData = {
	device: DeviceTypes;
	previewMode: boolean;
	setPreviewMode: (previewMode: boolean) => void;
	setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
	state: EditorState;
	dispatch: Dispatch<EditorAction>;
	setOpen?: (open: boolean) => void;
}>({
	state: initialState,
	dispatch: () => undefined,
	setOpen: undefined,
});

type EditorProps = {
	children: React.ReactNode;
	content?: string;
	onChange?: (content: string) => void;
	setOpen?: (open: boolean) => void;
};

const EditorProvider = (props: EditorProps) => {
	const [state, dispatch] = useReducer(editorReducer, initialState);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	// Load initial content when component mounts or content prop changes
	useEffect(() => {
		if (props.content) {
			try {
				const parsedContent = JSON.parse(props.content);
				dispatch({
					type: "LOAD_DATA",
					payload: {
						elements: parsedContent.elements || [],
						withLive: false,
					},
				});
				setIsInitialLoad(false);
			} catch (error) {
				console.warn("Failed to parse WebBuilder content:", error);
				setIsInitialLoad(false);
			}
		} else {
			setIsInitialLoad(false);
		}
	}, [props.content]);

	// Call onChange when editor elements change (but not during initial load)
	useEffect(() => {
		if (!isInitialLoad && props.onChange && state.editor.elements) {
			const contentToSave = {
				elements: state.editor.elements,
				device: state.editor.device,
			};
			props.onChange(JSON.stringify(contentToSave));
		}
	}, [state.editor.elements, props.onChange, isInitialLoad]);

	return (
		<EditorContext.Provider
			value={{
				state,
				dispatch,
				setOpen: props.setOpen,
			}}
		>
			{props.children}
		</EditorContext.Provider>
	);
};

export const useEditor = () => {
	const context = useContext(EditorContext);
	if (!context) {
		throw new Error("useEditor Hook must be used within the editor Provider");
	}
	return context;
};

export default EditorProvider;
