import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { getPosts } from '../modules/posts';
import Post from '../components/Post';

const Index = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    const loadingPost = useSelector(state => state.loading)['posts/GET_POSTS'];

    useEffect(() => {
        if (posts) return;
        const fn = async () => {
            try {
                await dispatch(getPosts());
            } catch (e) {
                console.log(e);
            }
        };
        fn();
    }, [posts]);

    return (
        <div>
            <Helmet title={'Home'} />
            <h1>Our Home Page</h1>
            {loadingPost && <h2>Loading...</h2>}
            <ul>{posts && posts.map(post => <Post key={post.id} {...post} />)}</ul>
        </div>
    );
};

Index.getInitialProps = async ({ store, isServer }) => {
    if (isServer) await store.dispatch(getPosts());
};

export default Index;
