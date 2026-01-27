"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Bold, Italic, Underline, Sparkles } from "lucide-react";

interface FormattableTextareaProps extends React.ComponentProps<typeof Textarea> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormattableTextarea({ value, onChange, ...props }: FormattableTextareaProps) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [hasSelection, setHasSelection] = React.useState(false);

    const checkSelection = () => {
        if (textareaRef.current) {
            const { selectionStart, selectionEnd } = textareaRef.current;
            setHasSelection(selectionStart !== selectionEnd);
        }
    };

    const applyFormatting = (startMarker: string, endMarker: string) => {
        if (!textareaRef.current) return;

        const { selectionStart, selectionEnd, value: currentValue } = textareaRef.current;
        
        if (selectionStart === selectionEnd) return;

        const selectedText = currentValue.substring(selectionStart, selectionEnd);
        const beforeText = currentValue.substring(0, selectionStart);
        const afterText = currentValue.substring(selectionEnd);
        
        const newValue = beforeText + startMarker + selectedText + endMarker + afterText;
        const newCursorPos = selectionEnd + startMarker.length + endMarker.length;

        const syntheticEvent = {
            target: { value: newValue },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        
        onChange(syntheticEvent);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handleBold = () => applyFormatting("**", "**");
    const handleItalic = () => applyFormatting("*", "*");
    const handleUnderline = () => applyFormatting("__", "__");
    const handleEmphasis = () => applyFormatting("~~", "~~");

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    onSelect={checkSelection}
                    onMouseUp={checkSelection}
                    onKeyUp={checkSelection}
                    {...props}
                />
            </ContextMenuTrigger>
            {hasSelection && (
                <ContextMenuContent>
                    <ContextMenuItem onClick={handleBold}>
                        <Bold className="mr-2 h-4 w-4" />
                        Bold
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleItalic}>
                        <Italic className="mr-2 h-4 w-4" />
                        Italic
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleUnderline}>
                        <Underline className="mr-2 h-4 w-4" />
                        Underline
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleEmphasis}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Emphasis
                    </ContextMenuItem>
                </ContextMenuContent>
            )}
        </ContextMenu>
    );
}
