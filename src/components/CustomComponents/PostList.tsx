/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GET_POST_ENDPOINT, PROTOCOL } from "@/config/apiConfig";
import { serverRequest } from "@/services/getServerSideRender";
import { CONSTANTS } from "@/config/constant";


const componentMap: Record<string, any> = {
    IconCardComponent: dynamic(() => import("./IconCardComponent")),
    ImageGallery: dynamic(() => import("./ImageGallery")),
    JobsComponent: dynamic(() => import("./JobsComponent"))

    // CardListReports: dynamic(() => import("./CardListReports")),
    // TestComp: dynamic(() => import("./TestComp"))
    // LocationComponents: dynamic(() => import("./LocationComponents")),
    // NewsComponents: dynamic(() => import("./NewsComponents")),
    // TopNewsComponents: dynamic(() => import("./TopNewsComponents")),
    // TestimonialsComponents: dynamic(() => import("./TestimonialsComponents")),
    // ShareholdersCard: dynamic(() => import("./ShareholdersCard")),
    // JobsComponents: dynamic(() => import("./JobsComponents"))
};

const PostList = (props: any) => {
    const [postData, setPostData] = useState<any>([]);
    useEffect(() => {
        let slugInfo = props.slug;
        let finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_URL}`;
        if (window.location.host.startsWith('www')) {
            finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_WWW_URL}`;
        }
        const getPostData = async () => {
            const fetchedInfo = await serverRequest(
                {},
                finalUrl + `${GET_POST_ENDPOINT}?slug=${slugInfo}`,
                CONSTANTS.REQUEST_GET,
            )

            if (fetchedInfo.code == CONSTANTS.STATUS_SUCCESS) {
                setPostData(fetchedInfo.data);
            }
            if (fetchedInfo.code == CONSTANTS.STATUS_FAILED) {
                setPostData([]);
            }
        }
        getPostData();

    }, [props.slug]);

    const PostComponentRender = componentMap[props.component];

    return (
        <>
            {PostComponentRender ? (
                <PostComponentRender postData={postData} />
            ) : (
                <div>Component not found</div>
            )}
        </>
    )

}

export default PostList;