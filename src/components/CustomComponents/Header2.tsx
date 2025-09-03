// 'use client'
// import { useAppContext } from '@/context/AppContext';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect, useRef, useState, KeyboardEvent } from 'react'

// const Header2 = () => {
//     const [isFixed, setIsFixed] = useState<boolean>(false);
//     const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
//     const [showMobileDropdown, setShowMobileDropdown] = useState<string | null>(null);
//     const [activeMenu, setActiveMenu] = useState<string | null>(null);
//     const headerRef = useRef<HTMLElement | null>(null);
//     const menuItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
//     const pathname = usePathname();
//     const { headerMenu } = useAppContext();

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.outerWidth > 1248) {
//                 if (window.scrollY > 165) {
//                     setIsFixed(true);
//                 } else {
//                     setIsFixed(false);
//                 }
//             } else if (window.outerWidth < 992) {
//                 setIsFixed(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         handleScroll();

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [isFixed]);

//     const updateMenuHeight = () => {
//         const header = headerRef.current as HTMLElement | null;
//         const headerHeight = header?.clientHeight || 0;
//         const megaMenus = document.querySelectorAll('.c-navMain__megaMenu');

//         megaMenus.forEach((menu: Element) => {
//             (menu as HTMLElement).style.top = `${headerHeight}px`;
//             (menu as HTMLElement).style.height = `${window.innerHeight - headerHeight - 10}px`;
//         });
//     };

//     const handleMenuHover = (menuId: string) => {
//         setActiveMenu(menuId);
//         document.body.classList.add("no-scroll");
//         updateMenuHeight();
//     };

//     const handleMenuFocus = (menuId: string) => {
//         setActiveMenu(menuId);
//         document.body.classList.add("no-scroll");
//         updateMenuHeight();
//     };

//     const closeMegaMenu = () => {
//         setActiveMenu(null);
//         document.body.classList.remove("no-scroll");
//     };

//     const handleKeyDown = (e: KeyboardEvent, menuId: string) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             setActiveMenu(activeMenu === menuId ? null : menuId);
//         } else if (e.key === 'Escape') {
//             closeMegaMenu();
//             const currentItem = menuItemRefs.current[menuId];
//             currentItem?.querySelector('a')?.focus();
//         } else if (e.key === 'Tab' && activeMenu) {
//             const megaMenu = document.querySelector(`.c-navMain__megaMenu[data-menu="${activeMenu}"]`);
//             if (megaMenu && !megaMenu.contains(document.activeElement)) {
//                 closeMegaMenu();
//             }
//         }
//     };

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             const target = event.target as HTMLElement;
//             const isInNavMain = target.closest('.c-navMain');
//             const isInMegaMenu = target.closest('.c-navMain__megaMenu');
//             const isInChosenCustomized = target.closest('.chosen-customized');

//             if (!isInNavMain && !isInMegaMenu && !isInChosenCustomized) {
//                 closeMegaMenu();
//             }
//         };

//         if (activeMenu) {
//             document.addEventListener('mousemove', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousemove', handleClickOutside);
//         };
//     }, [activeMenu]);

//     useEffect(() => {
//         const handleFocusOutside = (event: FocusEvent) => {
//             const target = event.target as HTMLElement;
//             if (
//                 activeMenu &&
//                 !target.closest('.c-navMain') &&
//                 !target.closest('.c-navMain__megaMenu')
//             ) {
//                 closeMegaMenu();
//             }
//         };

//         if (activeMenu) {
//             document.addEventListener('focusin', handleFocusOutside);
//         }

//         return () => {
//             document.removeEventListener('focusin', handleFocusOutside);
//         };
//     }, [activeMenu]);

//     useEffect(() => {
//         if (activeMenu) {
//             updateMenuHeight();
//             const firstFocusable = document.querySelector(`.c-navMain__megaMenu[data-menu="${activeMenu}"] a, .c-navMain__megaMenu[data-menu="${activeMenu}"] button, .c-navMain__megaMenu[data-menu="${activeMenu}"] [tabindex]`);
//             if (firstFocusable) {
//                 (firstFocusable as HTMLElement).focus();
//             }
//         }

//         window.addEventListener("resize", updateMenuHeight);
//         return () => window.removeEventListener("resize", updateMenuHeight);
//     }, [activeMenu]);

//     const handelMobileMenu = () => {
//         setIsMobileOpen((prev) => !prev)
//     }

//     useEffect(() => {
//         if (isMobileOpen) {
//             document.body.classList.add("no-scroll");
//         } else {
//             document.body.classList.remove("no-scroll");
//         }
//     }, [isMobileOpen])

//     const handelMobileDropdown = (menu_group_id: string) => {
//         setShowMobileDropdown((prev) => (prev === menu_group_id ? null : menu_group_id))
//     }

//     return (
//         <header ref={headerRef} className={`c-header ${pathname === '/' ? 'homepage' : ''} ${isFixed ? 'sticky' : ''}`}>
//             <div className="container custom_container">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="c-header__top-Container">
//                             <div className="c-header__contact">
//                                 <ul>
//                                     <li className="c-header__contact_list">
//                                         <span className="c-header__contact_icon">
//                                             <img src="/images/icons/mail.svg" className="img-fluid" alt="mail icon" />
//                                         </span>
//                                         <a href="mailto:contact@inspheresolutions.com"
//                                             className="c-header__contact_item">contact@inspheresolutions.com</a>
//                                     </li>
//                                     <li className="c-header__contact_list">
//                                         <span className="c-header__contact_icon">
//                                             <img src="/images/icons/phone.svg" className="img-fluid"
//                                                 alt="phone icon" />
//                                         </span>
//                                         <a href="tel:+911147047879" className="c-header__contact_item">+91 11 4704 7879</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="generic__social d1">
//                                 <div className="generic__social_item">
//                                     <a href="https://www.linkedin.com/company/insphere-solutions-private-limited/"
//                                         className="rounded_icon">
//                                         <img src="/images/icons/linkedin.svg" className="img-fluid"
//                                             alt="linkedin icon" />
//                                     </a>
//                                     <a href="https://clutch.co/profile/insphere-solutions" target="_blank">
//                                         <img src="/images/icons/clutch.png" className="img-fluid" alt="clutch icon" />
//                                     </a>
//                                 </div>
//                                 <div className="generic__social_item">
//                                     <a href="https://www.glassdoor.co.in/Overview/Working-at-Insphere-Solutions-EI_IE2426751.11,29.htm"
//                                         target="_blank">
//                                         <img src="/images/icons/glassdoor.svg" className="img-fluid"
//                                             alt="glassdoor icon" />
//                                     </a>
//                                     <a href="https://www.quora.com/profile/Insphere-Solutions-Pvt-Ltd-1"
//                                         target="_blank">
//                                         <img src="/images/icons/quora.svg" className="img-fluid" alt="quora icon" />
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="c-header__main-Container">
//                             <div className="c-header__logo">
//                                 <Link href="/" className="main_logo">
//                                     <img src="/images/logo/insphere-logo.svg" className="img-fluid"
//                                         alt="insphere logo" />
//                                 </Link>
//                                 <Link href="/" className="resp_logo">
//                                     <img src="/images/logo/insphere-resp-logo.svg" className="img-fluid"
//                                         alt="insphere logo" />
//                                 </Link>
//                             </div>

//                             <div className="c-header__rs">
//                                 <div className={`menu-toggle ${isMobileOpen ? 'open' : ''}`} onClick={handelMobileMenu}>
//                                     <i></i>
//                                 </div>
//                                 <nav className="c-navMain" aria-label="Main navigation">
//                                     <ul>
//                                         {headerMenu.slice(0, headerMenu.length - 1).map((item: any, index: number) => (
//                                             <li
//                                                 key={index}
//                                                 className="c-navMain__list"
//                                                 onMouseOver={() => handleMenuHover(`${item.id}`)}
//                                                 ref={el => menuItemRefs.current[`${item.id}`] = el}
//                                             >
//                                                 <a
//                                                     href="#"
//                                                     className={`c-navMain__item dropdown ${activeMenu === `${item.id}` ? 'active' : ''}`}
//                                                     onFocus={() => handleMenuFocus(`${item.id}`)}
//                                                     onKeyDown={(e) => handleKeyDown(e, `${item.id}`)}
//                                                     tabIndex={0}
//                                                     aria-haspopup="true"
//                                                     aria-expanded={activeMenu === `${item.id}`}
//                                                 >
//                                                     {item.name}
//                                                 </a>

//                                                 {/* Mega Menu - Now inside the header */}
//                                                 <div
//                                                     className={`c-navMain__megaMenu ${activeMenu === `${item.id}` ? 'active' : ''}`}
//                                                     data-menu={`${item.id}`}
//                                                     onMouseLeave={closeMegaMenu}
//                                                 >
//                                                     <div className="c-navMain__megaMenu__close" onClick={closeMegaMenu} tabIndex={activeMenu === `${item.id}` ? 0 : -1}>
//                                                         <i></i>
//                                                     </div>

//                                                     <div className="container custom_container">
//                                                         <div className="row">
//                                                             <div className="col-12">
//                                                                 {index === 0 ? (
//                                                                     <div className="c-navMain__megaMenu__navBox d2">
//                                                                         <ul>
//                                                                             {item?.children.map((child: any, childIndex: number) => (
//                                                                                 <li key={childIndex}>
//                                                                                     <div className="navBox_container">
//                                                                                         <div className="navBox_icon">
//                                                                                             <img src={`/images/icons${child.icon}`}
//                                                                                                 className="img-fluid" alt={`${child.name} icon`} />
//                                                                                         </div>
//                                                                                         <a
//                                                                                             href={child.link}
//                                                                                             className="navBox_title"
//                                                                                             tabIndex={activeMenu === `${item.id}` ? 0 : -1}
//                                                                                         >
//                                                                                             {child.name}
//                                                                                         </a>
//                                                                                         <div className="navBox_links">
//                                                                                             {child.children.map((grandchild: any, grandchildIndex: number) => (
//                                                                                                 <a
//                                                                                                     key={grandchildIndex}
//                                                                                                     href={grandchild.link}
//                                                                                                     tabIndex={activeMenu === `${item.id}` ? 0 : -1}
//                                                                                                 >
//                                                                                                     {grandchild.name}
//                                                                                                 </a>
//                                                                                             ))}
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 </li>
//                                                                             ))}
//                                                                         </ul>
//                                                                     </div>
//                                                                 ) : (
//                                                                     <div className="row">
//                                                                         <div className="col-4">
//                                                                             <div className="c-navMain__megaMenu__contentBox">
//                                                                                 <h3 tabIndex={activeMenu === `${item.id}` ? 0 : -1}>{item.children.title}</h3>
//                                                                                 <p tabIndex={activeMenu === `${item.id}` ? 0 : -1}>
//                                                                                     {item.children.description}
//                                                                                 </p>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="col-8">
//                                                                             <div className="c-navMain__megaMenu__navBox d1">
//                                                                                 <ul>
//                                                                                     {item.children.menuItems.map((menuItem: any, menuItemIndex: number) => (
//                                                                                         <li key={menuItemIndex}>
//                                                                                             <div className="navBox_links">
//                                                                                                 <a
//                                                                                                     href={menuItem.href}
//                                                                                                     tabIndex={activeMenu === `${item.id}` ? 0 : -1}
//                                                                                                 >
//                                                                                                     {menuItem?.icon && (
//                                                                                                         <span className="navBox_links-icon">
//                                                                                                             <img
//                                                                                                                 src={`/images/icons${menuItem.icon}`}
//                                                                                                                 className="img-fluid"
//                                                                                                                 alt={menuItem.text} />
//                                                                                                         </span>
//                                                                                                     )}
//                                                                                                     <span>{menuItem.text}</span>
//                                                                                                 </a>
//                                                                                             </div>
//                                                                                         </li>
//                                                                                     ))}
//                                                                                 </ul>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                     <a href="contact_us.html" className="button button--radius12 button--white-bordered" tabIndex={0}>
//                                         Connect with Us
//                                     </a>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Navigation - Kept separate as it's a different view */}
//             <div className={`c-navigation__responsive ${isMobileOpen ? 'active' : ''}`}>
//                 <ul className="menubar__resp">
//                     {headerMenu?.map((item: any, index: number) => (
//                         <li
//                             key={index}
//                             className={`menubar__item dropdown ${showMobileDropdown === `${item.id}` ? 'active' : ''}`}
//                             onClick={() => handelMobileDropdown(`${item.id}`)}
//                         >
//                             <a href="#" tabIndex={0}>
//                                 <span>{item.name}</span>
//                                 <span className="dropdown_arrow">
//                                     <img src="/images/icons/arrow.svg" alt="arrow icon" />
//                                 </span>
//                             </a>
//                             {index === 0 && (
//                                 <ul className="submenu box_layout">
//                                     {item?.children.map((child: any, childIndex: number) => (
//                                         <li key={childIndex}>
//                                             <a href="cloud.html" className="submenu__item" tabIndex={showMobileDropdown === `${item.id}` ? 0 : -1}>
//                                                 <span className="submenu__item_icon">
//                                                     <img src={`/images/icons${child.icon}`} className="img-fluid"
//                                                         alt="cloud icon" />
//                                                 </span>
//                                                 <span className="submenu__item_text">{child.name}</span>
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                             {index !== 0 && (
//                                 <ul className="submenu">
//                                     {item?.children?.menuItems?.map((menuItem: any, menuItemIndex: number) => (
//                                         <li key={menuItemIndex}>
//                                             <a
//                                                 href={menuItem.href}
//                                                 className="submenu__item"
//                                                 tabIndex={showMobileDropdown === `${item.id}` ? 0 : -1}
//                                             >
//                                                 {menuItem?.icon && (
//                                                     <span className="submenu__item_icon">
//                                                         <img src={`/images/icons/${menuItem.icon}`} className="img-fluid"
//                                                             alt="cloud icon" />
//                                                     </span>
//                                                 )}
//                                                 <span className="submenu__item_text">{menuItem.text}</span>
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </header>
//     )
// }

// export default Header2;