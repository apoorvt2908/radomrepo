'use client';

import React from 'react';
import useFancybox from './FancyBoxWrapper';
import Image from 'next/image';
import Link from 'next/link';

const ImageGallery = ({ postData }: any) => {
        console.log(postData)

    const [fancyboxRef] = useFancybox({
        Thumbs: {
            type: "modern",
        },
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"],
            },
        },
    });

    return (
        <div className='row' ref={fancyboxRef}>
            {
                postData[0]?.teams.map((item: any, index: number) => (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <div className="elem1__container">
                            <div className="elem1__container_image">
                                <Link
                                    data-fancybox={`gallery-${index}`}
                                    href={item.media[0].cdnPath}
                                >
                                    <Image
                                        src={item.media[0].cdnPath}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        className="img-fluid"
                                    />
                                    <p className="descr">{item.title}</p>
                                </Link>

                                <div className="invisible">
                                    {item.media.slice(1).map((image: any, imageIndex: number) => (
                                        <a
                                            key={imageIndex}
                                            data-fancybox={`gallery-${index}`}
                                            href={image.cdnPath}
                                        >
                                            <Image
                                                src={image.cdnPath}
                                                alt={item.title}
                                                width={400}
                                                height={300}
                                                className="img-fluid"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ImageGallery;
