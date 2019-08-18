import React, { Component } from 'react';
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'
import Response from '../components/Response'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Head from 'next/head'
import Alert from 'react-bootstrap/Alert'
import dynamic from 'next/dynamic';
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RichEditor = dynamic(
    () => import('../components/Editor'),
    {
        ssr: false
    }
);
const RespCont = dynamic(
    () => import('../components/ResponseControl'),
    {
        ssr: false
    }
);

class Saying extends Component {
    constructor() {
        super()
        this.state = {
            opinion: '',
            notification: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.deleteResponse = this.deleteResponse.bind(this)
        this.editResponse = this.editResponse.bind(this)
        this.likeResponse = this.likeResponse.bind(this)
    }
    handleChange(e) {
        this.setState({
            opinion: e.target.value
        })
    }
    likeResponse(id, likes) {
        firebase.firestore().collection('sayings').doc(this.props.name).collection('responses').doc(id)
            .update({
                likes: parseInt(likes + 1),
                liked_by: firebase.firestore.FieldValue.arrayUnion(this.props.userData.uid)
            })
    }
    deleteResponse(responseID) {
        console.log(responseID);
        firebase.firestore().collection('sayings').doc(this.props.name).collection('responses').
            doc(responseID).
            delete()
            .then(() => { this.setState({ notification: true, message: "Response successfully deleted!" }); window.location.reload() })
            .catch(() => { this.setState({ notification: true, message: "Response deleting error" }) })
        firebase.firestore().collection('sayings').doc(this.props.name).update({
            responses_added: parseInt(this.props.saying_data.responses_added - 1)
        })
    }
    editResponse(responseID) {
        console.log(responseID);
        console.log("Editing response")
    }
    static async getInitialProps(context) {
        console.log(context.asPath.replace('/saying/', ''))
        let id = context.asPath.replace('/saying/', '')
        const results = 0
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('sayings').doc(id).collection('responses')
                .onSnapshot((snapshot) => {
                    let data = []
                    snapshot.forEach((doc) => {
                        data.push(Object.assign({
                            id: doc.id,
                            content: doc.data(),
                        }))
                    })
                    resolve(data)
                })
            // .catch((err) => { reject(err) })
        })
        let result2 = await new Promise((resolve, reject) => {
            firebase.firestore().collection('sayings').doc(id).get()
                .then((data) => {
                    if (data) {
                        console.log(data.data())
                        resolve(data.data())
                    }
                })
        })
            .catch((err) => {
                resolve(err)
            })

        return { sayings: result, name: id, saying_data: result2 }
    }

    render() {
        console.log(this.props)
        const time = new Date(this.props.saying_data.timeAdded.seconds * 1000).toUTCString()
        return (
            <div>
                <Head>
                    <title>Opinions-Every Opinion Matters</title>
                    <meta
                        name="keywords"
                        content="opinions, my opinions, response, sayings, truth"
                        key="keywords"
                    />
                    <meta name="description" content="You agree with some saying or not. Describe your feelings here. What is your opinion.Some sayings are not supposed to be truth"></meta>
                </Head>
                <Container>
                    <h1>{this.props.name.replace(/[-]/g, ' ')}</h1>
                    <small>{time}</small>
                    <hr></hr>
                    {this.props.sayings.map((children) => {
                        const user = true ? children.content.uid === this.props.userData.uid : false
                        return (
                            <Container>
                                <Response displayName={children.content.authorName}
                                    photoURL={children.content.photoURL}
                                    key={children.id}
                                    uid={children.content.uid}
                                    displayContent={children.content.response}
                                    timeAdded={children.content.date.seconds}
                                    likeCount={children.content.likes}
                                    responseKey={children.id}
                                    owner={user}
                                    name={this.props.name}
                                    responseAdded={this.props.saying_data.responses_added}
                                >

                                    {/* {children.content.liked_by.includes(this.props.userData.uid) && <button className="btn btn-primary fa fa-thumbs-up" >{children.content.likes}</button>}
                                {!children.content.liked_by.includes(this.props.userData.uid) && <button className="btn btn-outline-primary fa fa-thumbs-up" 
                                onClick={()=>this.likeResponse(children.id, children.content.likes)}>{children.content.likes}</button>}
                                    {user && <Button variant="outline-danger" onClick={() => { this.deleteResponse(children.id) }}>Delete</Button>}
                                    {user && <Button variant="outline-info" onClick={() => { this.editResponse(children.id) }}>Edit</Button>} */}
                                    <RespCont owner={user} uid={this.props.userData.uid} name={this.props.name} responseID={children.id}></RespCont>
                                </Response>

                            </Container>)
                    })}
                    {this.state.notification && <Alert variant="info">{this.state.message}</Alert>}
                    <h5>Your Opinion</h5>
                    {!this.props.loading && this.props.authenticated &&
                        <div>
                            <Container>
                                <RichEditor authorName={this.props.userData.displayName}
                                    uid={this.props.userData.uid}
                                    photoURL={this.props.userData.photoURL}
                                    name={this.props.name}
                                    addedFor={this.props.saying_data.addedBy_uid}
                                    responsesAdded={this.props.saying_data.responses_added}
                                />
                            </Container>
                            <br />
                        </div>}
                    {!this.props.loading && !this.props.authenticated && <div>
                        <p>Please log in to add your valuable opinion </p>
                        <Button>Log In</Button>
                    </div>}
                    {this.props.loading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    }
                </Container>
                <style global jsx>{`
                    .ql-container {
                        border-bottom-left-radius: 0.5em;
                        border-bottom-right-radius: 0.5em;
                        background: #fefcfc;
                        height:320px;
                      }
                      .ql-snow.ql-toolbar {
                        display: block;
                        background: #eaecec;
                        border-top-left-radius: 0.5em;
                        border-top-right-radius: 0.5em;
                      }
                `}</style>
            </div>);
    }
}

export default Saying;