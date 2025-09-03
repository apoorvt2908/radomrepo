import { Metadata } from 'next';
import { headers } from 'next/headers';
import { serverRequest } from '@/services/getServerSideRender';
import { GET_SPECIFIC_PAGE_ENDPOINT, PROTOCOL } from '@/config/apiConfig';
import { CONSTANTS } from '@/config/constant';
import { notFound } from 'next/navigation';

import HomePage from '@/components/Templates/HomePageTemplate';

// export const metadata: Metadata = {
//   title: 'DigiYatra Foundation - Re-imagining Airport Experiences',
//   description: 'DigiYatra Foundation - Re-imagining Airport Experiences',
// };

export default async function Home() {
  const requestHeaders = headers();
  const host = (await requestHeaders).get('host');
  let finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_URL}`
  if (host?.startsWith('wwww')) {
    finalUrl = `${PROTOCOL}://${process.env.NEXT_PUBLIC_WWW_URL}`
  }
  const fetchedInfo = await serverRequest(
    {},
    finalUrl + `${GET_SPECIFIC_PAGE_ENDPOINT}?slug=home`,
    CONSTANTS.REQUEST_GET
  );
  if (fetchedInfo.data.length == 0) return notFound();

  return (
    <>
      <HomePage data={fetchedInfo.data[0]} />
      {/* <CardView /> */}
    </>
  );
}

