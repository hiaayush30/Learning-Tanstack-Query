import React, { FormEvent, FormEventHandler, useEffect, useRef } from 'react'
import { useQuery, useMutation,useQueryClient} from '@tanstack/react-query'
import { addPost, getPosts } from './utils/api'
const App = () => {
  const { data, isLoading, isError, refetch: refetchGetPosts } = useQuery<Array<{ id: string, title: string, views: number }>>({
    queryKey: ['getPosts'],  //used by it to map and cache data
    queryFn: getPosts
  })

  const titleRef = useRef<HTMLInputElement>(null);

  const { mutate: addPostMutation, isSuccess: isAddPostSuccess, isPending: isAddPostPending } = useMutation({
    mutationFn: addPost,
    // onSuccess:refetchGetPosts
    // onSuccess:()=>queryClient.invalidateQueries({queryKey:['getPosts']})
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = String(Math.random() * 10);
    const title = titleRef.current.value;
    const views = 500;
    addPostMutation({ id, title, views });
    refetchGetPosts();
    titleRef.current.value = '';
  }

  const queryClient=useQueryClient();
  useEffect(() => {
    if (isAddPostSuccess) {
      // refetchGetPosts();
      //or
      // queryClient.invalidateQueries({queryKey:['getPosts']})
    }
  }, [isAddPostSuccess,refetchGetPosts,queryClient])
  return (
    <div>
      Hello There
      <h1>Add a new post</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='title' ref={titleRef} />
        <button type='submit' disabled={isAddPostPending}>Add</button>
      </form>
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
