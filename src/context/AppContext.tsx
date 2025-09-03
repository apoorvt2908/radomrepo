"use client";

import {
    FOOTER_BOTTOM_MENU_ENDPOINT,
    FOOTER_MENU_ENDPOINT,
    GET_MENU_ENDPOINT,
    HEADER_MENU_ENDPOINT,
    PROTOCOL,
    SOCIAL_MENU_ENDPOINT
} from "@/config/apiConfig";
import { CONSTANTS } from "@/config/constant";
import { serverRequest } from "@/services/getServerSideRender";
import { usePathname } from "next/navigation";
import {
    ReactNode,
    createContext,
    useState,
    useEffect,
    useContext,
} from "react";

// Menu item type
type MenuItem = {
    id: string;
    guid: string;
    parent_id: string | null;
    menu_group_id: string;
    network_id: string;
    name: string;
    is_new_tab: string;
    page_id: string | null;
    post_id: string | null;
    display_order: string;
    external_url: string;
    is_active: string;
    is_deleted: string;
    created_by: string | null;
    created_on: string;
    modified_by: string | null;
    modified_on: string;
    link: string;
    isExternal: number;
    type: string;
    typeGuid: string;
    target: string;
    description: string;
    children: MenuItem[];
    metaInfo?: any
};

// Context value type
type AppContextType = {
    headerMenu: MenuItem[];
    footerMenu: MenuItem[];
    socialMenu: MenuItem[];
    footerBottomMenu: MenuItem[];
    footerContent: any;
    showModal: boolean;
    showChatModal: boolean;
    openModal: () => void;
    closeModal: () => void;
    alertModal: any;
    handleShowAgain: () => void;
    handleClose: () => void;
    setShowChatModal: (isOpen: boolean) => void;
};

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
    const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
    const [socialMenu, setSocialMenu] = useState<MenuItem[]>([]);
    const [footerBottomMenu, setFooterBottomMenu] = useState<MenuItem[]>([]);
    const [footerContent, setFooterContent] = useState<any>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showChatModal, setShowChatModal] = useState<boolean>(false);
    const [alertModal, setAlertModal] = useState(false)
    const pathname = usePathname();

    const openModal = () => {
        setShowModal(true);
        document.body.classList.add("overflow-hidden");
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove("overflow-hidden");
    };

    useEffect(() => {
        let finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_URL}`;
        if (window.location.host.startsWith('www')) {
            finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_WWW_URL}`;
        }
        const fetchInitialData = async () => {
            const fetchedHeaderMenu = await serverRequest(
                {},
                finalUrl + `${GET_MENU_ENDPOINT}?slug=${HEADER_MENU_ENDPOINT}`,
                CONSTANTS.REQUEST_GET
            );
            const fetchedSocialMenu = await serverRequest(
                {},
                finalUrl + `${GET_MENU_ENDPOINT}?slug=${SOCIAL_MENU_ENDPOINT}`,
                CONSTANTS.REQUEST_GET
            );

            const fetchedFooterMenu = await serverRequest(
                {},
                finalUrl + `${GET_MENU_ENDPOINT}?slug=${FOOTER_MENU_ENDPOINT}`,
                CONSTANTS.REQUEST_GET
            );
            const fetchedFooterBottomMenu = await serverRequest(
                {},
                finalUrl + `${GET_MENU_ENDPOINT}?slug=${FOOTER_BOTTOM_MENU_ENDPOINT}`,
                CONSTANTS.REQUEST_GET
            );
            // Uncomment if footer content needed
            // const fetchedFooterData = await serverRequest(
            //     {},
            //     `${GET_CONTENT_BLOCK_ENDPOINT}?keyword=${FOOTER_CONTENT_BLOCK_ENDPOINT}`,
            //     CONSTANTS.REQUEST_GET
            // );

            if (fetchedHeaderMenu?.code === CONSTANTS.STATUS_SUCCESS) {
                setHeaderMenu(fetchedHeaderMenu.data);
            } else {
                setHeaderMenu([]);
            }
            if (fetchedFooterMenu?.code === CONSTANTS.STATUS_SUCCESS) {
                setFooterMenu(fetchedFooterMenu.data);
            } else {
                setFooterMenu([]);
            }
            if (fetchedFooterBottomMenu?.code === CONSTANTS.STATUS_SUCCESS) {
                setFooterBottomMenu(fetchedFooterBottomMenu.data);
            } else {
                setFooterBottomMenu([]);
            }
            if (fetchedSocialMenu?.code === CONSTANTS.STATUS_SUCCESS) {
                setSocialMenu(fetchedSocialMenu.data);
            } else {
                setSocialMenu([]);
            }


            // Uncomment if footer content needed
            // if (fetchedFooterData?.code === CONSTANTS.STATUS_SUCCESS) {
            //     setFooterContent(fetchedFooterData.data);
            // } else {
            //     setFooterContent(null);
            // }
        };

        fetchInitialData();
    }, []);

    const sendTracking = (type: 'website' | 'bot') => {
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type }),
        }).catch((err) => console.error('Tracking error:', err));
    };

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (!hasVisited) {
            sendTracking('website');
            sessionStorage.setItem('hasVisited', 'true');
        }
    }, []);

    useEffect(() => {
        if (showChatModal) {
            sendTracking('bot');
        }
    }, [showChatModal]);



    useEffect(() => {
        const closed = sessionStorage.getItem('alert_modal_closed');
        if (!closed || pathname === '/') {
            setAlertModal(true);
        }
    }, [pathname]);

    const handleClose = () => {
        setAlertModal(false);
        sessionStorage.setItem('alert_modal_closed', 'true');
    };

    const handleShowAgain = () => {
        setAlertModal(true);
        sessionStorage.removeItem('alert_modal_closed');
    };

    const contextValue: AppContextType = {
        headerMenu,
        footerMenu,
        socialMenu,
        footerBottomMenu,
        footerContent,
        showModal,
        openModal,
        closeModal,
        showChatModal,
        setShowChatModal,
        alertModal,
        handleClose,
        handleShowAgain
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

// Custom hook
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
};
