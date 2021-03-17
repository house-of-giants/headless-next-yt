import Head from 'next/head';
import useSWR from 'swr';
import { fetcher } from '@/util/fetcher';
import { RecentVideos, RecentPosts } from '@/components/feed';

export default function Home() {
  const { data: home } = useSWR('/api/page/sample-page', fetcher);

  if (!home) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href={`http://headlessnext.local/wp-includes/css/dist/block-library/style.min.css?ver=5.6`}
        />
      </Head>

      <main className="container mx-auto px-4">
        <h1>{home.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: home.page.content}} />
        <RecentVideos />
        <RecentPosts />
      </main>
    </div>
  )
}
