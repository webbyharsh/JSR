import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'

class CreateSaying extends Component {
    constructor(){
        super()
        this.state={
            saying:'',
            sayingAdded:false
        }
        this.addSaying = this.addSaying.bind(this)
        this.handleChange= this.handleChange.bind(this)
    }
    addSaying(){
        let category = document.getElementById("category").value
        console.log(category)
        const date = new Date()
        const time = Math.floor(date.getTime()/1000)
        const sayingData = {
            addedBy:this.props.userData.displayName,
            photoURL:this.props.userData.photoURL,
            timeAdded: {seconds:time},
            type: category,
            id:this.state.saying,
            uid:this.props.userData.uid,
            responses_added:0
        }
        document.getElementById('saying').value=''
        console.log(sayingData)
        const actual = sayingData.id.replace(/[ ]/g, '-' )
        firebase.firestore().collection('sayings').doc(actual).set(sayingData);
        this.setState({sayingAdded:true})
        
    }
    handleChange(e){
        this.setState({
            saying:e.target.value
        })
    }
    render() { 
        return (
        <Container>
            {this.props.loading && <Spinner animation="border" />}
            {!this.props.loading && this.props.authenticated && <div>
            <InputGroup size="lg">
            <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-lg">Saying</InputGroup.Text>
            </InputGroup.Prepend>
                <FormControl aria-label="Large" onChange={this.handleChange} id="saying"aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <Form.Group >
                <Form.Label>Select Category</Form.Label>
                <Form.Control id="category" as="select">
                    <option>educational</option>
                    <option>politics</option>
                    <option>entertainment</option>
                    <option>sports</option>
                    <option>health</option>
                </Form.Control>
            </Form.Group>
            <Button variant="success" size="lg" onClick={this.addSaying}block>Add Saying as {this.props.userData.displayName}</Button></div>}
        {!this.props.loading && !this.props.authenticated && <Alert variant="danger" >You are not authorized for this page. <Link><a>Login to add Saying</a></Link></Alert>}
        {this.state.sayingAdded && <Alert variant="success">Your Saying {this.state.saying} has been added as {this.props.userData.email} . Go to <Link href="/"><a>Home</a></Link></Alert>}
        </Container>);

    }
}
 
export default CreateSaying;