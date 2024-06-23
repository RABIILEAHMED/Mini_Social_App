import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostReducer from './PostReducer';

export const postContext=createContext({
  posts:[]
  })
export const UserContext = createContext();


const App = () => {
  const [user,setUser] = useState("")
  // const [posts,setPosts] =useState([])
  const inialPostState = useContext(postContext);
  const [state,dispatch]=useReducer(PostReducer,inialPostState);

useEffect(()=> {
  document.title = user ? `${user} s feed` : `Please Login`
},[user])


  if (!user) return <Login user={setUser}/>
  return (
    <postContext.Provider value={{state,dispatch}}>
    <UserContext.Provider value={user}>
       <Header user={user} setuser={setUser}/>
       <CreatePost user={user}/>
       <PostList posts={state.posts} />
    </UserContext.Provider>
    </postContext.Provider>
       
    
  )
}

export default App
