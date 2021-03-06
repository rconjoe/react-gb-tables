import { useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

/**
 * The react-table table component take a props object containing
 * the memoized columns and data from its parent.
 */
export default function CharacterTable({ columns, data }) {

  /**
   * The useTable method provides getter methods and classes that render
   * content inside cells per the tag defined in the columns definition.
   * Also provided are utility functions to trigger column sorting.
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy)

  /**
   * React-table getters are used to map table data to 
   * Headers, Columns, Rows, and Cells.
   */
  return (
    <TableDiv>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map(headerGroup => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TH {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                  </span>
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <TR {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>
                    )
                  })}
                </TR>
              )
            }
          )}
        </TBody>
      </Table>
    </TableDiv>
  )
}

const TableDiv = styled.div`
  text-align: center;
  margin-top: 3rem;
`

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

const THead = styled.thead`
  color: #ffffff;
`

const TR = styled.tr`
  border-bottom: 1px solid #dddddd;
`

const TH = styled.th`
  color: white;
  background-color: #282c34;
  border: 1px solid white;
  padding: 12px 15px;
`

const TD = styled.td`
  color: white;
  background-color: #282c34;
  border: 1px dotted white;
`

const TBody = styled.tbody`
  color: white;
  background-color: #282c34;
  border: 1px solid white;
`