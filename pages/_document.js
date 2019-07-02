import Document, { Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        return { ...page, helmet: Helmet.renderStatic(), styleTags };
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map(tag => tag.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
