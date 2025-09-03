export const GET_MENU_ENDPOINT = `/v1/menu/get`;
export const GET_FEED_ENDPOINT = `/tweeter-feed`;
export const GET_SPECIFIC_PAGE_ENDPOINT = `/v1/page/get`;
export const GET_CONTENT_BLOCK_ENDPOINT = `/v1/content-block/get`; //?keyword=footerv2
export const GET_POST_ENDPOINT = `/v1/post/get-all`;
export const HEADER_MENU_ENDPOINT = `header-menu`;
export const SOCIAL_MENU_ENDPOINT = `social-menu`;
export const FOOTER_MENU_ENDPOINT = `footer-menu`;
export const FOOTER_BOTTOM_MENU_ENDPOINT = `footer-bottom-menu`;
export const FOOTER_CONTENT_BLOCK_ENDPOINT = `footerv2`;
export const PROTOCOL =
  process.env.NODE_ENV === 'development' ? 'http' : 'https';
