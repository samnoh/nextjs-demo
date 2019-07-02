import axios from 'axios';
import Helmet from 'react-helmet';

const Post = ({ id, comments }) => {
    return (
        <div>
            <Helmet title={`Post | #${id}`} />
            <h1>Comments for Post #{id}</h1>
            {comments.map(comment => (
                <Comment {...comment} key={comment.id} />
            ))}
        </div>
    );
};

const Comment = ({ email, body }) => {
    return (
        <div>
            <h5>{email}</h5>
            <p>{body}</p>
            <br />
        </div>
    );
};

Post.getInitialProps = async ({ query }) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`);
    const { data } = res;

    return { ...query, comments: data };
};

export default Post;
