"use client";
import { useAppContext } from "@/context/AppContext";
import React, { useState } from 'react'
import AccessibilityDrawer from "../Accessibility/AccessibilityDrawer";
import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import Image from "next/image";
import Link from "next/link";

// Define interfaces for the menu data structure
interface FooterMenuItem {
    name: string;
    link: string;
    icon?: string;
    children?: FooterMenuItem[];
}

interface FooterMenuGroup {
    name: string;
    children: FooterMenuItem[];
}

interface FooterBottomMenuItem {
    name: string;
    link: string;
}

const Footer = () => {
    const { footerMenu, footerBottomMenu } = useAppContext() as {
        footerMenu: FooterMenuGroup[];
        footerBottomMenu: FooterBottomMenuItem[];
    };
    const [footerExpended, setFooterExpended] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handelFooterExpend = () => {
        setFooterExpended((prev: boolean) => !prev);
    }

    return (
        <>
            <footer className="c-footer">
                <div className="c-footer__main">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-12">
                                <div className="c-footer__main_container">
                                    <div className="c-footer__main_show_container">
                                        <span onClick={handelFooterExpend} className="c-footer__main_showMore js_toggleFootNav">
                                            <span className="txt-more">{footerExpended ? "Hide" : 'More'}</span>
                                            <span><img src="/images/icons/arrow.svg" alt="arrow icon" /></span>
                                        </span>
                                    </div>
                                    <div className={`row js_navigationAction navigation_display ${footerExpended ? 'active' : ''}`}>
                                        <div className="col-12 col-xl-7">
                                            <div className="navigation_container">
                                                <div className="navigation_container__list multiple_entities">
                                                    <Link href={'#'} className="navigation_container__list_head">{footerMenu[0]?.name}</Link>
                                                    <ul>
                                                        {footerMenu[0]?.children.map((item: FooterMenuItem, index: number) => (
                                                            <li key={index}>
                                                                <div className="navigation_container__head">
                                                                    <Link href={item.link} className="navigation_container__item">
                                                                        {item.icon && (
                                                                            <div className="navBox_icon">
                                                                                <img src={`/images/icons${item.icon}`}
                                                                                    className="img-fluid" alt={item.name} />
                                                                            </div>
                                                                        )}
                                                                        {item.name}
                                                                    </Link>
                                                                </div>
                                                                {
                                                                    item?.children?.map((child: FooterMenuItem, index: number) => (
                                                                        <Link key={index} href={child.link}
                                                                            className="navigation_container__item">{child.name}</Link>
                                                                    ))
                                                                }
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-5">
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    <div className="navigation_container">
                                                        <div className="navigation_container__list">
                                                            <Link href="#"
                                                                className="navigation_container__list_head">{footerMenu[1]?.name}</Link>
                                                            <ul>
                                                                <li>
                                                                    {
                                                                        footerMenu[1]?.children.map((item: FooterMenuItem, index: number) => (
                                                                            <Link key={index} href={item.link}
                                                                                className="navigation_container__item">{item.name}</Link>
                                                                        ))
                                                                    }
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="navigation_container">
                                                        <div className="navigation_container__list">
                                                            <Link href="#"
                                                                className="navigation_container__list_head">{footerMenu[2]?.name}</Link>
                                                            <ul>
                                                                <li>
                                                                    {
                                                                        footerMenu[2]?.children.map((item: FooterMenuItem, index: number) => (
                                                                            <Link key={index} href={item.link}
                                                                                className="navigation_container__item">{item.name}</Link>
                                                                        ))
                                                                    }
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="navigation_container__list">
                                                            <Link href="#"
                                                                className="navigation_container__list_head">{footerMenu[3]?.name}</Link>
                                                            <ul>
                                                                <li>
                                                                    {
                                                                        footerMenu[3]?.children.map((item: FooterMenuItem, index: number) => (
                                                                            <Link key={index} href={item.link}
                                                                                className="navigation_container__item">{item.name}</Link>
                                                                        ))
                                                                    }
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="c-footer__bottom">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-12">
                                <div className="c-footer__bottom_p1">
                                    <div className="c-footer__link">
                                        {
                                            footerBottomMenu?.map((item: FooterBottomMenuItem, index: number) => (
                                                <Link key={index} href={item.link}
                                                    className="c-footer__link_item">{item.name}</Link>
                                            ))
                                        }
                                    </div>
                                    <div className="c-footer__connect">
                                        <div className="connect-text">Connect with Us</div>
                                        <div className="generic__social d1">
                                            <div className="generic__social_item">
                                                <Link href="https://www.linkedin.com/company/insphere-solutions-private-limited/"
                                                    target="_blank" className="rounded_icon">
                                                    <img src="/images/icons/linkedin.svg" className="img-fluid"
                                                        alt="linkedin icon" />
                                                </Link>
                                                <Link href="https://clutch.co/profile/insphere-solutions" target="_blank">
                                                    <img src="/images/icons/clutch.png" className="img-fluid"
                                                        alt="clutch icon" />
                                                </Link>
                                            </div>
                                            <div className="generic__social_item">
                                                <Link href="https://www.glassdoor.co.in/Overview/Working-at-Insphere-Solutions-EI_IE2426751.11,29.htm"
                                                    target="_blank">
                                                    <img src="/images/icons/glassdoor.svg" className="img-fluid"
                                                        alt="glassdoor icon" />
                                                </Link>
                                                <Link href="https://www.quora.com/profile/Insphere-Solutions-Pvt-Ltd-1"
                                                    target="_blank">
                                                    <img src="/images/icons/quora.svg" className="img-fluid"
                                                        alt="quora icon" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="c-footer__bottom_p2">
                                    <div className="c-header__contact">
                                        <ul>
                                            <li className="c-header__contact_list">
                                                <span className="c-header__contact_icon">
                                                    <img src="/images/icons/mail.svg" className="u-icon" alt="mail icon" />
                                                </span>
                                                <Link target="_blank" href="mailto:contact@inspheresolutions.com"
                                                    className="c-header__contact_item">contact@inspheresolutions.com</Link>
                                            </li>
                                            <li className="c-header__contact_list">
                                                <span className="c-header__contact_icon">
                                                    <img src="/images/icons/phone.svg" className="u-icon"
                                                        alt="phone icon" />
                                                </span>
                                                <Link href="tel:+911147047879" className="c-header__contact_item">+91 11 4704 7879</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="copyright">&copy; 2005 - {new Date().getFullYear()} InSphere Solutions All Rights Reserved.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!open &&
                    <button tabIndex={1} className="accessbilitytoggler" aria-label="Accessibility Options" onClick={() => setOpen(true)} data-uw-trigger="true" aria-haspopup="dialog" aria-controls="uw-main" aria-expanded="false" id="uw-widget-custom-trigger">
                        <Image height={32} width={32} alt="Accessibility icon" loading="lazy" src="/images/icons/accessibilityIcon.svg" />
                        <span className="txt">Accessibility Options</span>
                    </button>
                }

                <AccessibilityDrawer isOpen={open} onClose={() => setOpen(false)}>
                    {open &&
                        <AccessibilityPanel />
                    }
                </AccessibilityDrawer>
            </footer>
        </>
    )
}

export default Footer