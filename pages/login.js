import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import firebase from '../config/firebaseConfig'
import 'firebase/auth'
import Link from 'next/link'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: false,
            errormsg: ''
        }
        this.emailpwdLogin = this.emailpwdLogin.bind(this)
        this.handleChangeE = this.handleChangeE.bind(this)
        this.handleChangeP = this.handleChangeP.bind(this)

    }
    emailpwdLogin() {
        console.log(this.state)
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.setState.password)
            .then((data) => {
                window.location.href = "/"
            })
            .catch((err) => {
                this.setState({ error: true, errormsg: err })
            })
    }
    handleChangeE(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangeP(e) {
        this.setState({
            password: e.target.value
        })
    }
    googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider
        firebase.auth().signInWithPopup(provider)
    }

    render() {
        return (
            <Container>
                {!this.props.authenticated &&
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.handleChangeE} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted ">
                                We'll never share your email with anyone else.
              </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={this.handleChangeP} placeholder="Password" />
                        </Form.Group>
                        <Button onClick={this.emailpwdLogin} variant="primary" type="submit">
                            Submit
            </Button>
                        <Button onClick={this.googleSignIn} variant="info">Continue with Google</Button>
                    </Form>}
                {this.props.authenticated && <Alert variant="success">You are already logged in as {this.props.userData.displayName}<Link href="/"><a>Home</a></Link></Alert>}
            </Container>)
    }
}
export default Login