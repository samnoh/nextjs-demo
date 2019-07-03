import React from 'react';
import Link from 'next/link';

const Posts = ({ id, title }) => {
    return (
        <li>
            <Link href={`/comments?id=${id}`}>
                <a>{title}</a>
            </Link>
        </li>
    );
};

export default Posts;
