export default async (req, res) => {
  const { query: { slug } } = req;

  const QUERY_SINGLE_VIDEO = `
    query SingleVideo($id: ID!) {
      video(id: $id, idType: SLUG) {
        title
        content
        youtubeID
        featuredImage {
          node {
            srcSet
          }
        }
      }
    }
  `;

  const data = await fetch( process.env.WORDPRESS_LOCAL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: QUERY_SINGLE_VIDEO,
      variables: {
        id: slug
      }
    })
  } );

  const json = await data.json();

  res.json(json.data) ;
}