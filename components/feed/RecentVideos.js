import useSWR from 'swr';

import { Feed } from '@/components/feed';
import Card from '@/components/card';
import { fetcher } from '@/util/fetcher';

export const RecentVideos = () => {
  const { data: recentVideos } = useSWR('/api/video/recent', fetcher);
  if (!recentVideos) return 'loading...';
  return (
    <Feed>
      {recentVideos.videos.edges.map(({ node }) => (
        <Card key={node.slug} title={node.title} ytId={node.youtubeID} excerpt={node.excerpt} />
      ))}
    </Feed>
  )
}