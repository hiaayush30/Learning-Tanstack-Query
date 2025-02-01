export const getPosts = async () => {
    const res = await fetch('http://localhost:3000/posts');
    return await res.json();
};


interface AddPost{
    title:string;
    id:string;
    views:number;
}
export const addPost = async (body:AddPost) => {
    const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-Type':'application/json; charset=UTF-8'
        }
    });
    return await res.json();
}
export const getError = async () => {
    return Promise.reject('Error')
};