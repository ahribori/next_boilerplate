import App, { Container } from 'next/app';
import React from 'react';
import '../lib/helpers/requestMiddleware';
import withReduxStore from '../lib/hoc/with-redux-store';
import { Provider } from 'react-redux';

@withReduxStore
class MyApp extends App {
    render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default MyApp;
