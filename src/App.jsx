import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  useState, 
  useEffect,
  useMemo
} from 'react'

import fetchCharacters from './lib/fetchCharacters'
import Loading from './components/Loading'
import CharacterTable from './components/CharacterTable'
import CharacterModal from './components/CharacterModal'
import {
  Container, 
  Row,
  Col,
} from 'react-bootstrap'
import styled from 'styled-components'

function App() {

  const [ loaded, setLoaded ] = useState(false)
  const [ characters, setCharacters ] = useState([])
  const [ showModal, setShowModal ] = useState({ show: false, url: "" })

  useEffect(async () => {
    setLoaded(false)
    const characterSet = await fetchCharacters()
    setCharacters(characterSet)
    setLoaded(true)
  }, [])

  const columns = useMemo(
    () => [
        {
          Header: 'Image',
          accessor: 'image.icon_url',
          Cell: ({ cell }) => (
            <>
              <img 
                className='characterThumb' 
                src={cell.row.original.image.icon_url} 
                onClick={() => setShowModal({ show: true, url: cell.row.original.site_detail_url })}
              />

            </>
          )
        },
        {
          Header: 'Name',
          accessor: 'name'
        },
        {
          Header: 'Real Name',
          accessor: 'real_name'
        },
        {
          Header: 'Aliases',
          accessor: 'aliases',
          Cell: ({ cell }) => (
            <div className='aliasesCell'>
              { cell.row.original.aliases }
            </div>
          )
        },
        {
          Header: 'First Appeared In',
          accessor: 'first_appeared_in_game.name'
        },
        {
          Header: 'Birthday',
          accessor: 'birthday',
          Cell: ({ cell }) => (
            <div className='birthdayCell'>
              { cell.row.original.birthday }
            </div>
          )
        },
      ],
    []
  )

  const data = useMemo(
    () => characters, [loaded]
  )


  return (
    loaded === false ? (
      <Loading />
    ) : (
      <Container fluid>
        <Row>
          <div className='App'>
            Sort by clicking column titles.
            <br />
            Click a character's image to show more details.
          </div>
        </Row>
        <Row className='padBottom'>
          <Col xs={{ span: 8, offset: 2}}>
          <CharacterTable columns={columns} data={data} />
          <CharacterModal
            show={showModal.show}
            url={showModal.url}
            onHide={() => setShowModal({ show: false, url: "" })}
          />
          </Col>
        </Row>
      </Container>
    )
  )

}

export default App
