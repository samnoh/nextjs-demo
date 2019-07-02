import React from 'react';
import App, { Container } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';

import Navbar from '../components/Navbar';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

const MyApp = ({ Component, pageProps }) => {
    return (
        <Container>
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
        </Container>
    );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
};

export default MyApp;
