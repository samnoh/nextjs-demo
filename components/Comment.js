import React from 'react';

const Comment = ({ email, body }) => {
    return (
        <div>
            <h5>{email}</h5>
            <p>{body}</p>
            <br />
        </div>
    );
};

export default Comment;
