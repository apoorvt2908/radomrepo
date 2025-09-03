import React from 'react'
import MarqueeText from './MarqueeText'

const CustomMarquee = ({ data }: any) => {

    const filterData = data.filter((items: any) => items.props !== undefined);

    return (
        <>
            <MarqueeText text={filterData[0]?.props.children} direction={filterData[0]?.props.label}
                duration={50} />
        </>
    )
}

export default CustomMarquee
