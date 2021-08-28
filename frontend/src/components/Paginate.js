import React, {useState} from 'react'
import Pagination from "react-js-pagination";


const Paginate = (props) => {
    const handlePageChange = (pageNumber) => {
        props.history.push(`/articles/${pageNumber}`)
      }
    return (
        <div>
        <Pagination
          activePage={props.page}
          itemsCountPerPage={5}
          totalItemsCount={props.count}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => {handlePageChange(pageNumber)}}
        />
      </div>
    )
}

export default Paginate
