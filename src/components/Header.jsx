import styled from 'styled-components'

const Div = styled.div`
  background-color: #282c34;
  display: block;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 3rem;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export default function Header() {
  return (
    <Div>
      GiantBomb Character Browser
    </Div>
  )
}