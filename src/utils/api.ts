export const getPosts=async()=>{
    const res =await fetch('http://localhost:3000/posts');
    return await res.json();
};
export const getError=async()=>{
    return Promise.reject('Error')
};