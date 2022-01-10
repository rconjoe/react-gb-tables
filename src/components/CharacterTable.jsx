import { useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

export default function CharacterTable({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy)

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
`

const THead = styled.thead`
`

const TR = styled.tr`
`

const TH = styled.th`
  color: white;
  background-color: #282c34;
  border: 1px solid white;
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