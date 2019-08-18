import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Figure from 'react-bootstrap/Figure'
import Link from 'next/link'

class NavbarCustom extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="/">Opinions</Navbar.Brand>
                <Navbar.Toggle />
                <a href="/createSaying"><Button variant="primary">Create Saying</Button></a>
                <Navbar.Collapse className="justify-content-end">
                {!this.props.loading && this.props.authenticated && this.props.children}<span />
                    {!this.props.loading && this.props.authenticated && <Figure>
                        <Link as={`user/${this.props.userData.uid}`}href={`user?uid=${this.props.userData.uid}`}>
                        <a><Figure.Image width={50} height={50} alt="profile pic" src={this.props.userData.photoURL} roundedCircle />
                        </a>
                        </Link>
                        <Figure.Caption>{this.props.userData.displayName}</Figure.Caption>
                    </Figure>}
                    {this.props.loading && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    {!this.props.loading && !this.props.authenticated && <a href="/login"><Button variant="info">Login/Register</Button></a>}
                </Navbar.Collapse>
            </Navbar>);
    }
}

export default NavbarCustom;