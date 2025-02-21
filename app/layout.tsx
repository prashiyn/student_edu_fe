import SupabaseProvider from '@/providers/supabase-provider';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>
          Horizon UI Boilerplate - Launch your startup project 10X in a few
          moments - The best NextJS Boilerplate (This is an example)
        </title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!--  Social tags   --> */}
        <meta
          name="keywords"
          content="Add here your main keywords and separate them with a comma"
        />
        <meta name="description" content="Add here your website description" />
        {/* <!-- Schema.org markup for Google+ --> */}
        <meta itemProp="name" content="Add here your website name / title" />
        <meta
          itemProp="description"
          content="Add here your website description"
        />
        <meta
          itemProp="image"
          content="Add here the link for your website SEO image"
        />
        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="product" />
        <meta
          name="twitter:title"
          content="Add here your website name / title"
        />
        <meta
          name="twitter:description"
          content="Add here your website description"
        />
        <meta
          name="twitter:image"
          content="Add here the link for your website SEO image"
        />
        {/* <!-- Open Graph data --> */}
        <meta
          property="og:title"
          content="Add here your website name / title"
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://your-website.com" />
        <meta
          property="og:image"
          content="Add here the link for your website SEO image"
        />
        <meta
          property="og:description"
          content="Add here your website description"
        />
        <meta
          property="og:site_name"
          content="Add here your website name / title"
        />
        <link rel="canonical" href="https://your-website.com" />
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body id={'root'} className="loading bg-white">
        <NextIntlClientProvider messages={messages} locale={locale}>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SupabaseProvider>
              <main id="skip">{children}</main>
            </SupabaseProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
