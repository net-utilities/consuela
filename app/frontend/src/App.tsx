import { Button, CssBaseline, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import fetch from 'node-fetch';
import GenerateMemberStatus from './Table/ColumnGeneration/GenerateMemberStatus';
import { CellProps, FilterProps, FilterValue, IdType, Row } from 'react-table'
import { DBMemberStats} from './Interfaces/MemberStats';

import { Page } from './Page'
import { Table } from './Table'
import {IDBResult} from './Interfaces/BackendResponse';

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
function roundedMedian(values: any[]) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach((value) => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

const getMinMax = (rows: Row<DBMemberStats>[], id: IdType<DBMemberStats>) => {
  let min = rows.length ? rows[0].values[id] : 0
  let max = rows.length ? rows[0].values[id] : 0
  rows.forEach((row) => {
    min = Math.min(row.values[id], min)
    max = Math.max(row.values[id], max)
  })
  return [min, max]
}

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<DBMemberStats>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <TextField
        name={id}
        label={render('Header')}
        type='range'
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button variant='outlined' style={{ width: 60, height: 36 }} onClick={() => setFilter(undefined)}>
        Off
      </Button>
    </div>
  )
}

const columns = [
    {
      Header: 'Metadata',
      columns: [
        {
          Header: 'Device',
          accessor: 'deviceGroupName',
          minWidth: 50,
          align: 'left',
        },
        {
          Header: 'Pool Name',
          accessor: 'poolName.description',
          minWidth: 50,
          align: 'left',
        },
        {
          Header: 'Member',
          accessor: (m:DBMemberStats) => `${m.addr.description.replace(/%[0-9]+$/, '')}:${m.port.value}`,
          width: 100,
          minWidth: 100,
          align: 'left',
        },
        {
          Header: 'State',
          accessor: GenerateMemberStatus,
          width: 80,
          minWidth: 80,
          align: 'left',
        },
      ]
    }, {
      Header: 'Days without...',
      columns: [
      {
        Header: '...being up',
        accessor: 'daysDown',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: roundedMedian,
        Aggregated: ({ cell: { value } }: CellProps<DBMemberStats>) => `${value} (med)`,
        width: 50,
        minWidth: 50,
      },
      {
        Header: '...requests',
        accessor: 'daysWithoutRequests',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: roundedMedian,
        Aggregated: ({ cell: { value } }: CellProps<DBMemberStats>) => `${value} (med)`,
        width: 50,
        minWidth: 50,
      },
      {
        Header: '...connections',
        accessor: 'daysWithoutConnections',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: roundedMedian,
        Aggregated: ({ cell: { value } }: CellProps<DBMemberStats>) => `${value} (med)`,
        width: 50,
        minWidth: 50,
      },
      {
        Header: '...data',
        accessor: 'daysWithoutData',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        aggregate: roundedMedian,
        Aggregated: ({ cell: { value } }: CellProps<DBMemberStats>) => `${value} (med)`,
        width: 50,
        minWidth: 50,
      },
    ],
  },
]//.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const App: React.FC = () => {

  const [data, setData] = React.useState<DBMemberStats[]>([])

  useEffect(() => {

    const fetchData = async () => {
      const result = await fetch('/api/v1/compliance');
      const dbData: IDBResult = await result.json();
      setData(dbData.docs)
    };

    fetchData();

  }, [])

  return (
    <Page>
      <CssBaseline />
      <Table<DBMemberStats>
        name={'F5 Compliance'}
        columns={columns}
        data={data}
      />
    </Page>
  )
}

export default App
