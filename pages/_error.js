import React from 'react';

const MyError = ({ statusCode }) => {
    return (
        <div>
            <h1>{statusCode} Error</h1>
        </div>
    );
};

MyError.defaultProps = {
    statusCode: 400
};

MyError.getInitialProps = context => {
    const statusCode = context.res
        ? context.res.statusCode
        : context.err
        ? context.err.statusCode
        : null;
    return { statusCode };
};

export default MyError;
