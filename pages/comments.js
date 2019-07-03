import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { getComments } from '../modules/posts';
import Comment from '../components/Comment';

const Comments = ({ id }) => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.posts);
    const loadingComments = useSelector(state => state.loading)['posts/GET_COMMENTS'];

    useEffect(() => {
        if (comments && comments[0].postId === +id) return;
        const fn = async () => {
            try {
                await dispatch(getComments(id));
            } catch (e) {
                console.log(e);
            }
        };
        fn();
    }, [comments, id]);

    return (
        <div>
            <Helmet title={`Post | #${id}`} />
            <h1>Comments for Post #{id}</h1>
            {loadingComments && <h2>Loading...</h2>}
            {!loadingComments &&
                comments &&
                comments.map(comment => <Comment {...comment} key={comment.id} />)}
        </div>
    );
};

Comments.getInitialProps = async ({ query, store, isServer }) => {
    if (isServer) await store.dispatch(getComments(query.id));
    return { ...query };
};

export default Comments;
