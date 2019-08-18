import Card from 'react-bootstrap/Card'

function About(props) {
  return (<Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Opinions</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Made by Harsh Yelne</Card.Subtitle>
      <Card.Text>
        This is a webapp made using react js to create a platform where people can share there opinions on various topics
        It is still in development.
      </Card.Text>
      <Card.Link href="https://facebook.com/harsh.yelne.9">Facebook Profile</Card.Link>
      <Card.Link href="https://instagram.com/yelneharsh">Instagram</Card.Link>
    </Card.Body>
  </Card>)
}
export default About

