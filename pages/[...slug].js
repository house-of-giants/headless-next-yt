import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Page({ slug }) {
  const { data, error } = useSWR(`/api/page/${slug}`, fetcher);
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
        <h1>{data.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.page.content}} />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/');
  return {
    props: {
      slug
    }
  }
}

export async function getStaticPaths() {
  const QUERY_ALL_PAGES = `
    query AllPages {
      pages {
        edges {
          node {
           uri
          }
        }
      }
    }
  `;

  const allPages = await fetch(process.env.WORDPRESS_LOCAL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: QUERY_ALL_PAGES
    })
  });

  const { data: { pages: { edges } } } = await allPages.json();

  const paths = edges.map(({ node }) => {
    const { uri } = node;
    return {
      params: {
        slug: uri.split('/').filter((i) => i)
      }
    }
  });

  return {
    paths,
    fallback: true,
  }
}
