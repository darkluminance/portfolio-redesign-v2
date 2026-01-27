import React from "react";

export function parseFormattedText(text: string): React.ReactNode {
    if (!text) return text;

    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        let matched = false;

        const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
        if (boldMatch) {
            parts.push(
                <strong key={key++}>{parseFormattedText(boldMatch[1])}</strong>
            );
            remaining = remaining.slice(boldMatch[0].length);
            matched = true;
            continue;
        }

        const underlineMatch = remaining.match(/^__(.+?)__/);
        if (underlineMatch) {
            parts.push(
                <u key={key++}>{parseFormattedText(underlineMatch[1])}</u>
            );
            remaining = remaining.slice(underlineMatch[0].length);
            matched = true;
            continue;
        }

        const emphasisMatch = remaining.match(/^~~(.+?)~~/);
        if (emphasisMatch) {
            parts.push(
                <em key={key++}>{parseFormattedText(emphasisMatch[1])}</em>
            );
            remaining = remaining.slice(emphasisMatch[0].length);
            matched = true;
            continue;
        }

        const italicMatch = remaining.match(/^\*(.+?)\*/);
        if (italicMatch) {
            parts.push(
                <em key={key++}>{parseFormattedText(italicMatch[1])}</em>
            );
            remaining = remaining.slice(italicMatch[0].length);
            matched = true;
            continue;
        }

        if (!matched) {
            const nextMarkerIndex = remaining.search(/\*\*|__|~~|\*/);
            if (nextMarkerIndex === -1) {
                parts.push(remaining);
                break;
            } else {
                parts.push(remaining.slice(0, nextMarkerIndex));
                remaining = remaining.slice(nextMarkerIndex);
            }
        }
    }

    return parts.length === 0 ? text : <>{parts}</>;
}
