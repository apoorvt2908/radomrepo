import { useEffect, useRef, useState, useMemo } from "react";
import Slider from "react-slick";

declare module 'react' {
    interface CSSProperties {
        '--progress'?: string;
    }
}

const CustomContentSlider = (props: any) => {
    const data = props.data;
    const [sliderData, setSliderData] = useState<any[]>([]);
    const [sliderDotData, setSliderDotData] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const sliderRef = useRef<Slider>(null);
    const progressInterval = useRef<NodeJS.Timeout | null>(null); // For inteval ID
    const progressStartTime = useRef(Date.now());
    const isManualChange = useRef(false); //detects if the slide change was manual or automatic (false for automatic)

const goToSlide = (index: number) => {
   
    // Don't restart for current slide
    if (index === currentSlide) return;
    
    // Clear existing timer
    if (progressInterval.current) {
        clearInterval(progressInterval.current);
    }
    
    // Update UI and slider
    setCurrentSlide(index);
    sliderRef.current?.slickGoTo(index);
    
    progressStartTime.current = Date.now();  //record the time when the slide change was initiated
    setProgress(0);                 // Reset progress to 0
    startProgressTimer();           // Start the progress timer 8 seconds
    isManualChange.current = true;  // Mark as manual change
};


// Start the progress timer for the current slide
   const startProgressTimer = () => {

   // Clear any existing timer to avoid multiple intervals 
    if (progressInterval.current) {
        clearInterval(progressInterval.current);
    }
    
    // Reset progress and start time
    progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - progressStartTime.current;
        const newProgress = Math.min((elapsed / 8000) * 100, 100);
        setProgress(newProgress);
        
        // If progress reaches 100%, go to the next slide
        if (newProgress >= 100) {
            const nextSlide = (currentSlide + 1) % sliderData.length;
            isManualChange.current = false;
            goToSlide(nextSlide);
        }
    }, 16);
};


    // Effect to start the progress timer when the component mounts or when the current slide changes
    useEffect(() => {
        startProgressTimer();
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [currentSlide, sliderData.length]);



    useEffect(() => {
        if (props.homeslider === 'true') {
            const filterData = data.filter((item: any) => item.props !== undefined);
            setSliderDotData(filterData[1]);
            const childrenFilterData = filterData[0]?.props?.children?.filter((item: any) => item.props !== undefined) || [];
            setSliderData(childrenFilterData);
        } else {
            setSliderData(data.filter((item: any) => item.props !== undefined));
        }
    }, [data, props.homeslider]);

    const HomeDots = useMemo(() => {
        if (!sliderDotData?.props?.children) return null;

        return (
            <ul id="carousel-custom-dots" className="home-slider__dots">
                {sliderDotData.props.children
                    .filter((item: any) => item.props !== undefined)
                    .map((item: any, index: number) => (
                        <li
                            key={index}
                            style={{ '--progress': currentSlide === index ? `${progress}%` : '0%' } as React.CSSProperties}
                            className={`home-slider__dot ${currentSlide === index ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                        >
                            {item.props.children}
                        </li>
                    ))}
            </ul>
        );
    }, [sliderDotData, currentSlide, progress]);

    const baseSettings = {
        arrows: true,
        dots: true,
        slidesToShow: Number(props.items) || 1,
        slidesToScroll: Number(props.items) || 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(Number(props.items), 3),
                    slidesToScroll: Math.min(Number(props.items), 3),
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: Math.min(Number(props.items), 2),
                    slidesToScroll: Math.min(Number(props.items), 2),
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
        ],
    };

    const homeSliderSettings = {
        ...baseSettings,
        arrows: false,
        fade: true,
        autoplay: false,
        dots: true,
        appendDots: () => HomeDots,
        dotsClass: "home-slider__dots",
      
        afterChange: (current: number) => {
            setCurrentSlide(current);
            if (!isManualChange.current) {
            progressStartTime.current = Date.now();
            setProgress(0);            }
            isManualChange.current = false;
        },
    };

    const settings = props.homeslider === 'true' ? homeSliderSettings : baseSettings;

    return (
        <>
            {sliderData.length > 0 && (
                <div className="slider-container ">
                    <Slider ref={sliderRef} {...settings}>
                        {sliderData.map((info: any, index: number) => (
                            props.homeslider === 'true' ? (
                                <div key={index}>{info}</div>
                            ) : (
                                <div className={info.props.className} key={info.id}>
                                    {info.props.children}
                                </div>
                            )
                        ))}
                    </Slider>
                </div>
            )}
        </>
    );
};

export default CustomContentSlider;