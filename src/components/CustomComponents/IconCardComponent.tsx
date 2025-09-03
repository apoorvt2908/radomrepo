import React, { useState } from 'react'

const IconCardComponent = ({ postData }: any) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    return (
        <>
            {
                postData.map((item: any, index: number) => (
                    <div key={index} className="col-12 col-lg-6 col-xl-3" onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null)}>
                        <div className="elem2__container">
                            <div className="elem2__container_icon">
                                <img src={isHovered === index ? item.media[1]?.cdnPath : item.media[0].cdnPath} className='img-fluid' />
                            </div>
                            <div className="elem2__container_content">
                                <div className="elem2__container_content_title">{item.title}</div>
                                <div className="elem2__container_content_desc">{item.content}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default IconCardComponent
