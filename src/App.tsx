import React from 'react'
import { useQuery, UseQuery } from '@tanstack/react-query'
import { getPosts } from './utils/api'
const App = () => {
  const getPostsQuery = useQuery<Array<{ id: string, title: string, views: number }>>({
    queryKey: ['getPosts'],  //used by it to map and cache data
    queryFn: getPosts 
  })
  const { data, isLoading, isError } = getPostsQuery;
  return (
    <div>
      Hello There
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && data?.map(post => {
        return <div key={post.id}>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.views}</p>
        </div>
      })}
      {isError && <div>Something went wrong</div>}
    </div>
  )
}

export default App
