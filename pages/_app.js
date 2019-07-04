import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Helmet from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import configureStore from 'store';
import Navbar from 'components/Navbar';
import { checkLogin } from 'modules/user';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

const MyApp = ({ Component, pageProps, store }) => {
    return (
        <Container>
            <Provider store={store}>
                <Helmet
                    title="My Next.js App"
                    htmlAttributes={{ lang: 'en' }}
                    meta={[
                        {
                            charset: 'UTF-8'
                        },
                        {
                            name: 'viewport',
                            content:
                                'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
                        },
                        {
                            'http-equiv': 'X-UA-Compatible',
                            content: 'IE=edge'
                        }
                    ]}
                    // link={[
                    //     {
                    //         rel: 'shortcut icon',
                    //         href: '/favicon.ico'
                    //     }
                    // ]}
                />
                <GlobalStyle />
                <Navbar />
                <Component {...pageProps} />
                <p>Footer</p>
            </Provider>
        </Container>
    );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

    if (ctx.isServer && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    if (!state.user.user && ctx.isServer) {
        await ctx.store.dispatch(checkLogin());
    }

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
};

export default withRedux(configureStore)(withReduxSaga(MyApp));
