import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import renderHTML from 'react-render-html'
import React from 'react'
import Card from 'react-bootstrap/Card'
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'

class Response extends React.Component {
    constructor() {
        super()
        this.deleteResponse = this.deleteResponse.bind(this)
    }
    deleteResponse() {
        firebase.firestore().collection('sayings').doc(this.props.name).collection('responses').
            doc(this.props.responseKey).
            delete()
            .catch(() => { this.setState({ notification: true, message: "Response deleting error" }) })
        firebase.firestore().collection('sayings').doc(this.props.name).update({
            responses_added: parseInt(this.props.responseAdded - 1)
        })
        .then(()=>{window.location.reload()})
    }
    handleHover(e) {
        // console.log("Hovered over me")
        // console.log(e.target.href)
    }
    render() {
        return (
            <Media>
                <Image src={this.props.photoURL}
                    width={64} height={64}
                    className="mr-3"
                    alt="profile picture"
                    roundedCircle
                />
                <Media.Body>
                    <Card>
                        <Card.Header>
                            <h5><a href={`/user/${this.props.uid}`}>{this.props.displayName}</a></h5>
                            {this.props.owner && <button onClick={() => this.deleteResponse()} className="btn float-right"><i className="fa fa-trash"></i></button>}
                            {this.props.owner && <button className="btn float-right"><i className="fa fa-pencil"></i></button>}
                        </Card.Header>
                        <Card.Body>
                            {renderHTML(this.props.displayContent)}
                            <p>{this.props.children}</p>
                        </Card.Body>
                    </Card>
                </Media.Body>
            </Media>)
    }
}
export default Response