import React from 'react';
import App, { Container } from 'next/app';
import firebase from '../config/firebaseConfig'
import 'firebase/auth'
import NavbarCustom from '../components/Navbar'
import Head from 'next/head'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Router from 'next/router'
import withGA from 'next-ga'
import Footer from '../components/Footer'

class MyApp extends App {
    constructor() {
        super()
        this.state = {
            authenticated: false,
            userData: {},
            loading: true
        }
        this.logout = this.logout.bind(this)
    }
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }
    logout() {
        firebase.auth().signOut()
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    userData: {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid
                    },
                    loading: false
                })
            } else {
                this.setState({
                    authenticated: false,
                    userData: {},
                    loading: false
                })
            }
        })
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous"
                    />
                    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
                    <meta name="google-site-verification" content="Jzj_9qtNd4GV72TxsGSuNqXYme38OLYnLGir7j9GjtM" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                </Head>
                <NavbarCustom authenticated={this.state.authenticated}
                    loading={this.state.loading}
                    userData={this.state.userData}
                >       <DropdownButton id="dropdown-basic-button" title="">
                        <Dropdown.Item onClick={this.logout}>Log out</Dropdown.Item>
                        <Dropdown.Item href={`/user/${this.state.userData.uid}`}>Profile Settings</Dropdown.Item>
                    </DropdownButton>
                </NavbarCustom>
                <Component {...pageProps} authenticated={this.state.authenticated} userData={this.state.userData} loading={this.state.loading} />
                <Footer />
            </Container>
        );
    }
}

export default withGA("UA-142197487-1", Router)(MyApp);