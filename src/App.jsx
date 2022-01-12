import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import fetchCharacters from './lib/fetchCharacters'
import Loading from './components/Loading'
import CharacterTable from './components/CharacterTable'
import CharacterModal from './components/CharacterModal'

import { 
  useState, 
  useEffect,
  useMemo
} from 'react'

import {
  Container, 
  Row,
  Col,
} from 'react-bootstrap'

function App() {

  /**
   * This state, instantiated as false, is set to true once the call
   * to Giant Bomb API is complete. It controls the conditional render
   * between CharacterTable and Loading.
   */
  const [ loaded, setLoaded ] = useState(false)

  /**
   * This piece of state will contain our array of characters
   * obtained from the Giant Bomb API.
   */
  const [ characters, setCharacters ] = useState([])

  /**
   * When "show: true" is set, a modal overlay opens containing
   * an iframe of the site located at "url".
   */
  const [ showModal, setShowModal ] = useState({ show: false, url: "" })


  /** 
   * Call fetchCharacters on first render.
   */
  useEffect(async () => {
    const characterSet = await fetchCharacters()
    setCharacters(characterSet)
    setLoaded(true)
  }, [])

  /**
   * Table columns and data should be memoized to prevent
   * the table from being recalculated every render, rather
   * only when values inside the memo change.
   * 
   * "Header" is displayed as the column header, while
   * "accessor" is the key used to match data to a column.
   */
  const columns = useMemo(
    () => [
        {
          Header: 'Image',
          accessor: 'image.icon_url',
          //What is rendered inside the cell space can also be explicitly defined:
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


  /**
   * The content inside the entire app body is a conditional render
   * based on whether or not character data is loaded. Once it is
   * loaded, we can pass our memoized columns, data, and modal state
   * as props to the CharacterTable and CharacterModal components.
   */
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
