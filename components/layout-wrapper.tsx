"use client";

import { usePathname } from "next/navigation";
import Topbar from "@/components/topbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dontUseDefaultLayout = pathname.startsWith("/resume-builder");

    if (dontUseDefaultLayout) {
        return <div className="mx-auto p-6 leading-relaxed tracking-wide">{children}</div>;
    }

    return (
        <div className="mx-auto max-w-[800px] px-6 leading-relaxed tracking-wide">
            <Topbar />
            <main className="py-8">{children}</main>
        </div>
    );
}

