import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { getPosts } from 'modules/posts';
import Post from 'components/Post';

const Index = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.user);
    const loadingPost = useSelector(state => state.loading)['posts/GET_POSTS'];

    return (
        <div>
            <Helmet title={'Home'} />
            <h1>Hi! {user && user.userId} </h1>
            {loadingPost && <h2>Loading...</h2>}
            {!loadingPost && posts && <button onClick={() => dispatch(getPosts())}>Refresh</button>}
            <ul>{!loadingPost && posts && posts.map(post => <Post key={post.id} {...post} />)}</ul>
        </div>
    );
};

Index.getInitialProps = async ({ store }) => {
    if (!store.getState().posts.posts) await store.dispatch(getPosts());
};

export default Index;
