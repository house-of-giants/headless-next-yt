import useSWR from 'swr';

import { Feed } from '@/components/feed';
import Card from '@/components/card';
import { fetcher } from '@/util/fetcher';

export const RecentPosts = () => {
  const { data: recentPosts } = useSWR('/api/post/recent', fetcher);
  if (!recentPosts) return 'loading...';
  return (
    <Feed>
      {recentPosts.posts.edges.map(({ node }) => (
        <Card imgSrc={node.featuredImage?.node.sourceUrl} imgSrcset={node.featuredImage?.node.srcSet} title={node.title} excerpt={node.excerpt} link={`/post/${node.slug}`} />
      ))}
    </Feed>
  )
}