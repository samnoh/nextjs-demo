import React from 'react';
import App, { Container } from 'next/app';
import Navbar from '../components/Navbar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <GlobalStyle />
                <Navbar /> {/* see Navbar and footer */}
                <Component {...pageProps} />
                <p>Footer!</p>
            </Container>
        );
    }
}

export default MyApp;
