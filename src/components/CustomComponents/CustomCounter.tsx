import { useEffect, useRef, useState } from "react";

const CustomCounter = ({ data }: any) => {
    const filterData = data.filter((items: any) => items.props !== undefined)
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const duration = 1000;
    const endNumber = filterData[0]?.props?.children;
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const startTime = Date.now();
                const interval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    setCount(Math.floor(progress * endNumber));
                    if (progress === 1) {
                        clearInterval(interval);
                    }
                }, 16);

                // Once it starts, disconnect the observer so it won't trigger again
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [endNumber, duration]);


    return (
        <div ref={ref}>
            <div className="countBox">
                <div className="countBox__label inner-count">{count}</div>
                <div className="countBox__value">Airports</div>
            </div>
        </div>
    );
};
export default CustomCounter