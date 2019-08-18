import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import Head from 'next/head'

class Index extends Component {
    constructor() {
        super()
        this.state = {}
    }
    static async getInitialProps() {
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('sayings').get()
                .then((snapshot) => {
                    let data = []
                    snapshot.forEach((doc) => {
                        data.push(Object.assign({
                            id: doc.id,
                            content: doc.data()
                        }))
                    })
                    resolve(data)
                })
                .catch(err => { reject(err) })
        })

        return { sayings: result }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Head>
                    <title>Opinions-Every Opinion Matters</title>
                    <meta
                        name="keywords"
                        content="opinions, my opinions, response, sayings, truth"
                        key="keywords"
                    />
                    <meta name="description" content="You agree with some saying or not. Describe your feelings here. What is your opinion. Some sayings are not supposed to be truth"></meta>
                </Head>
                <Container>
                    {this.props.sayings.map((children) => {
                        return (
                            <Card key={children.id}>
                                <Card.Header as="h6"><Image width={40} height={40} src={children.content.photoURL} roundedCircle /><a href={`/user/${children.content.uid}`}>{children.content.addedBy}</a></Card.Header>
                                <Card.Body>
                                    <Link as={`/saying/${children.id}`} href={`/saying?title=${children.id}`}><a><Card.Title>{children.id.replace(/[-]/g, ' ')}</Card.Title></a></Link>
                                    <Badge pill variant="info">{children.content.type}</Badge>
                                    <Badge variant="secondary">{parseInt(children.content.responses_added)} Responses</Badge>
                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                </Container>
            </div>
        )
    }
}
export default Index