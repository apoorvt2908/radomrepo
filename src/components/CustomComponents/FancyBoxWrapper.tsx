// hooks/useFancybox.ts
'use client';

import { useEffect, useState, useCallback } from "react";
import { Fancybox as NativeFancybox, FancyboxOptions } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Define our extended options type
type ExtendedFancyboxOptions = FancyboxOptions & {
    Thumbs?: {
        type?: "modern" | "classic";
    };
    Toolbar?: {
        display?: {
            left?: string[];
            middle?: string[];
            right?: string[];
        };
    };
};

export default function useFancybox(options?: Partial<ExtendedFancyboxOptions>) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!container) return;

        NativeFancybox.bind(container, "[data-fancybox]", options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    }, [container, options]);

    const ref = useCallback((node: HTMLElement | null) => {
        if (node) {
            setContainer(node);
        }
    }, []);

    return [ref] as const;
}