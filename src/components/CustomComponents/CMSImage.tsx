import Image from "next/image";

const CMSImage = (props: any) => {
    return (
        <>
            <Image
                alt={props.alt}
                src={props.src}
                quality={100}
                className={props.className}
                // loading="lazy"
                // placeholder="blur"
                //blurDataURL={rgbDataURL(128, 128, 128)}
                width={props.width !== undefined ? props.width : 500}
                height={props.height !== undefined ? props.height : 500}
                style={props.style !== undefined ? props.style : ''}
            />
        </>
    )
}

export default CMSImage;