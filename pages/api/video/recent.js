export default async (req, res) => {

  const QUERY_RECENT_VIDEOS = `
    query RecentVideos {
      videos(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            slug
            title
            excerpt
            youtubeID
          }
        }
      }
    }
  `;

  const data = await fetch( process.env.WORDPRESS_LOCAL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: QUERY_RECENT_VIDEOS
    })
  } );

  const json = await data.json();

  res.json(json.data) ;
}