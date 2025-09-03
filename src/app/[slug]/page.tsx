import { notFound, redirect } from "next/navigation";
import { headers } from 'next/headers';

import { GET_SPECIFIC_PAGE_ENDPOINT, PROTOCOL } from "@/config/apiConfig";
import { CONSTANTS } from "@/config/constant";
import { serverRequest } from "@/services/getServerSideRender";
import InnerBanner from '@/components/Elements/InnerBanner';
import PageTemplate from "@/components/Templates/PageTemplate";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const requestHeaders = headers();
  const host = (await requestHeaders).get('host');
  let finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_URL}`
  if (host?.startsWith('wwww')) {
    finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_WWW_URL}`
  }
  let fetchedInfo = null;
  if (slug == 'home') {
    redirect('/');
  } else {
    fetchedInfo = await serverRequest(
      {},
      finalUrl + `${GET_SPECIFIC_PAGE_ENDPOINT}?slug=${slug}`,
      CONSTANTS.REQUEST_GET
    )
    if (fetchedInfo.data.length == 0) return notFound();
  }
  return (
    <>
      <PageTemplate data={fetchedInfo.data[0]} />
    </>
  );
}
