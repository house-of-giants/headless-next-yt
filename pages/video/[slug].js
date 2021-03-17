import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Video({ slug }) {
  const { data, error } = useSWR(`/api/video/${slug}`, fetcher);

  if (error) return <div>error...</div>
  if (!data) return <div>loading...</div>

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

      <main>
        <h1>{data.video.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.video.content }} />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  }
}

export async function getStaticPaths() {
  const QUERY_ALL_VIDEOS = `
    query AllVideos {
      videos {
        edges {
          node {
           slug
          }
        }
      }
    }
  `;

  const allVideos = await fetch(process.env.WORDPRESS_LOCAL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: QUERY_ALL_VIDEOS
    })
  });

  const { data: { videos: { edges } } } = await allVideos.json();

  return {
    paths: edges.map(({ node }) => `/video/${node.slug}`) || [],
    fallback: true,
  }
}
