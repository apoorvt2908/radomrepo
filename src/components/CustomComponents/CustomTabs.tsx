/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { useState, useEffect } from "react";

const CustomTabs: FC<{ data: any }> = ({ data }) => {
    const [openTab, setOpenTab] = useState(0);

    const clickHandler = (key: any) => {
        setOpenTab(key);
    };

    useEffect(() => {
        const filterData = data.filter((items: any) => items.props !== undefined);
        if (filterData.length > 0) {
            setOpenTab(filterData[0].key);
        }
    }, []);
    return (
        <>
            <div className="elementor-tabs-content-wrapper" role="tablist" aria-orientation="vertical">
                {data.length > 0 &&
                    data
                        .filter((items: any) => items.props !== undefined)
                        .map((tabItem: any) => {
                            return (
                                <div key={tabItem.props.label} onClick={() => clickHandler(tabItem.key)} className={`elementor-tab-title elementor-tab-mobile-title ${openTab == tabItem.key ? "elementor-active" : ""}`} >
                                    {tabItem.props.label}
                                </div>

                            );
                        })}
            </div>

            {data.length > 0 &&
                data
                    .filter((items: any) => items.props !== undefined)
                    .map((tabItem: any) => {
                        return (
                            <div key={tabItem.key} className={`tabbing_wrap_content_item ${openTab == tabItem.key ? "" : "d-none"}`}>
                                {tabItem.props.children}
                            </div>
                        );
                    })}
        </>
    );
};

export default CustomTabs;
