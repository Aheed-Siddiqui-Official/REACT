import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;

  if(action.type === 'DELETE_POST') {
    newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
  } else if(action.type === 'ADD_POST') {
    newPostList = [action.payload, ...currPostList]
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);

  const addPost = (userIdElement, postBodyElement, postTitleElement, reactionsElement, tagsElement) => {
    dispatchPostList({
      type: 'ADD_POST',
      payload: {
        id: Date.now(),
        title: postTitleElement,
        body: postBodyElement,
        reactions: reactionsElement,
        userId: userIdElement,
        tags: tagsElement,
      }
    })
    
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: 'DELETE_POST',
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
  id: '1',
  title: 'Fox Story',
  body: 'The quick brown fox jumps over the lazy dog while the morning sun rises behind the hills. Children laugh and play, filling the streets with joy. Cars move slowly, and the city awakens. People greet each other warmly, sharing smiles and kindness as another beautiful day begins peacefully.',
  reactions: 2,
  userId: 'user-9',
  tags: ['vacation', 'mas', 'abc']
  },
  {
  id: '2',
  title: 'Technology',
  body: 'Technology grows rapidly, changing how humans live, work, and communicate across the world. Mobile phones connect millions instantly, while computers handle complex tasks within seconds. The internet spreads knowledge faster than ever, bridging cultures and ideas. Every innovation inspires progress, shaping societies toward smarter solutions, better opportunities, and endless future possibilities.',
  reactions: 12,
  userId: 'user-3',
  tags: ['vacation', 'mas', 'abc', 'pass']
  },
];

export default PostListProvider;
