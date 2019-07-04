import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import { getComments } from 'modules/posts';
import Comment from 'components/Comment';

const Comments = ({ id }) => {
    const { comments } = useSelector(state => state.posts);
    const loadingComments = useSelector(state => state.loading)['posts/GET_COMMENTS'];

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

Comments.getInitialProps = async ({ query, store }) => {
    if (!store.getState().posts.comments) await store.dispatch(getComments(query.id));
    return { ...query };
};

export default Comments;
