import React from 'react'

const GlobalTableFilter = ({filter, setFilter}) => {
  return (
    <span className='search-table'>
        Поиск: {''}
        <input className='mx-3' value={filter || ''}
        onChange={(e)=>setFilter(e.target.value)}
        />
    </span>
    )
}

export default GlobalTableFilter
