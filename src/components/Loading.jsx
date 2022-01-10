import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'

const Div = styled.div`
  overflow: hidden;
  text-align: center;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #282c34;
  padding-bottom: 5rem;
`

export default function Loading() {
  return (
    <Div>
      <Spinner animation="border" />
      <br />
      <br />
      <span>
        <h3>
          Loading Characters...
        </h3>
      </span>
    </Div>
  )
}