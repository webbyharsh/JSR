import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

function Footer() {
    return (<Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Opinions</Card.Title>
          <Card.Text>
            Made with ReactJS
          </Card.Text>
        </Card.Body>
      </Card>)
}
export default Footer