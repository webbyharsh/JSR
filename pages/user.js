import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'


class User extends Component {
    constructor() {
        super()
        this.state = {}
    }
    static async getInitialProps(context) {
        let uid = context.asPath.replace('/user/', '')
        console.log(context.query)
        const res = await fetch('https://secure-garden-29826.herokuapp.com/u/' + uid)
        const data = await res.json()
        return ({ user: data })
    }
    render() {
        console.log(this.props)
        return (<Container>

            <h2>User Profile - {this.props.user.displayName}</h2>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={this.props.user.photoURL}
                />
                <Figure.Caption>
                    {this.props.user.email}
                </Figure.Caption>
            </Figure>
        </Container>);
    }
}

export default User;