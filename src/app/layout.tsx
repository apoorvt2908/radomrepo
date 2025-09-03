import type { Metadata } from "next";
import { Lexend, Poppins } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "@/styles/components.scss";
import AppContextProvider from "@/context/AppContext";
import Header from "@/components/Templates/HeaderTemplate";
import Footer from "@/components/Templates/FooterTemplate";

import { Ubuntu } from "next/font/google";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
// import Header2 from "@/components/CustomComponents/Header2";

const genericFont = Ubuntu({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="shortcut icon" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <title>InSphere Solutions</title>
        <meta name="keywords"
          content="it services and solutions, business solutions, it consulting services, it consulting firms" />
        <meta name="description"
          content="InSphere Solutions, formerly focused on traditional IT services, has evolved into a leading provider of AWS and Google Cloud-based IT infrastructure, managed services, and IT security solutions. Our expertise also includes comprehensive capabilities in web, mobile, and chatbot app development." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@InsphereSoln" />
        <meta name="twitter:title" content="InSphere Solutions | InSphere Solutions " />
        <meta name="twitter:description"
          content="InSphere Solutions, formerly focused on traditional IT services, has evolved into a leading provider of AWS and Google Cloud-based IT infrastructure, managed services, and IT security solutions. Our expertise also includes comprehensive capabilities in web, mobile, and chatbot app development." />
        <meta name="twitter:image" content="https://www.inspheresolutions.com/dist/images/logo/ispl-meta.jpg" />
        <meta name="twitter:domain" content="https://www.inspheresolutions.com/" />
        <meta property="og:url" content="https://www.inspheresolutions.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="InSphere Solutions | InSphere Solutions " />
        <meta property="og:description"
          content="InSphere Solutions, formerly focused on traditional IT services, has evolved into a leading provider of AWS and Google Cloud-based IT infrastructure, managed services, and IT security solutions. Our expertise also includes comprehensive capabilities in web, mobile, and chatbot app development." />
        <meta property="og:image" content="https://www.inspheresolutions.com/dist/images/logo/ispl-meta.jpg" />

      </head>
      <body className={`app-container ${genericFont.variable}  ${lexend.variable}`} >
        <AppContextProvider>
          <AccessibilityProvider>
            <Header />
            <main className="app-mainWrapper">
              {children}
            </main>
            <Footer />
          </AccessibilityProvider>
        </AppContextProvider>
      </body>
    </html >
  );
}
