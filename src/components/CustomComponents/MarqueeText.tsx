"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

type MarqueeTextProps = {
    text: string;
    direction?: "left" | "right";
    duration?: number;
};

export default function MarqueeText({
    text,
    direction = "left",
    duration = 50,
}: MarqueeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLSpanElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!containerRef.current || !itemRef.current) return;

        const reverse = direction === "right";
        const el = itemRef.current;

        const clone = el.cloneNode(true) as HTMLElement;
        el.parentNode?.appendChild(clone);

        gsap.set(clone, {
            position: "absolute",
            top: el.offsetTop,
            left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
        });

        const tl = gsap.timeline({ repeat: -1 });
        tl.to([el, clone], {
            xPercent: reverse ? 60 : -60,
            ease: "none",
            duration,
        });

        return () => {
            tl.kill();
            clone.remove();
        };
    }, [text, direction, duration]);

    return (
        <div
            className={`baseMarquee`}
            ref={containerRef}
            style={{
                position: "relative",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            <span
                ref={itemRef}
                className={`baseMarquee--item ${pathname === '/faqs' && 'v2'}`}
                style={{ display: "inline-block", marginRight: "2rem" }}
            >
                {text}
            </span>
        </div>
    );
}
