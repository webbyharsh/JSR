import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

class ResponseControl extends Component {
    constructor() {
        super()
        this.state = {
            liked_by: [],
            likes: 0
        }

    }
    likeResponse(likes, ld) {
        if(ld){firebase.firestore().collection('sayings').doc(this.props.name).collection('responses').doc(this.props.responseID)
            .update({
                likes: parseInt(likes + 1),
                liked_by: firebase.firestore.FieldValue.arrayUnion(this.props.uid)
            })}else{
                firebase.firestore().collection('sayings').doc(this.props.name).collection('responses').doc(this.props.responseID)
                .update({
                    likes: parseInt(likes - 1),
                    liked_by: firebase.firestore.FieldValue.arrayRemove(this.props.uid)
                }) 
            }
    }
    componentDidMount() {
        const db = firebase.firestore().collection('sayings')
        db.doc(this.props.name).collection('responses').doc(this.props.responseID)
            .onSnapshot((snap) => {
                console.log(snap.data())
                this.setState({
                    likes: snap.data().likes,
                    liked_by: snap.data().liked_by
                })
            })
    }
    render() {
        return (
            <div>
                {!this.state.liked_by.includes(this.props.uid)
                    &&
                    <button className="btn" onClick={() => { this.likeResponse(this.state.likes, true) }}><i className="fa fa-thumbs-up">
                        <Badge variant="secondary">{this.state.likes}</Badge></i>
                    </button>}
                {this.state.liked_by.includes(this.props.uid) &&
                    <button className="btn btn-primary" onClick={() => { this.likeResponse(this.state.likes, false) }}><i className="fa fa-thumbs-up">
                        <Badge variant="secondary">{this.state.likes}</Badge></i>
                    </button>}
            </div>);
    }
}

export default ResponseControl;