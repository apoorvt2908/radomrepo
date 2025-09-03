"use client";
import dynamic from 'next/dynamic';
const PageTemplate = dynamic(() => import('./PageTemplate'), { ssr: false });

const HomePage = ({ data }: any) => {
    return (
        <>
            <PageTemplate data={data} />
            {/* <TestPage /> */}
        </>
    )
}

export default HomePage;