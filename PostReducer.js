const PostReducer = (state,action)=>{

    switch(action.type){
        case 'ADD_NEW_POST':{
        const newPost = action.payload.post
        return{posts:[newPost,...state.posts]};
    }

    case 'DELETE_POST':{
        let deletingPost = action.payload.postID
        const newPosts=state.posts.filter(post => post.id !== deletingPost);
        return {posts:newPosts};
    }

        default:
            return state;
    }
}

export default PostReducer;