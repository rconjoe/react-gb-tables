import '../App.css'
import {
  Modal,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap'

/**
 * Modal is a react-bootstrap component which takes props to define its style and content. 
 * Here we place an iframe inside the modal and fill it with content from the selected 
 * character's site_detail_url.
 */
export default function CharacterModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName='characterModal'
    >
      <Modal.Body>
        <Container>
          <Row fluid={true}>
            <Col lg={{ span: 12 }}>
              <iframe src={props.url} className='characterFrame' />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}