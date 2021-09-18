import React from 'react'
import Pagination from "react-js-pagination";

const Paginate = (props) => {
    const handlePageChange = (pageNumber) => {
        if(props.setPage) {
           props.setPage(pageNumber);
        } else{
          props.history.push(`/${props.list}${props.id ? "/" + props.id:""}/${pageNumber}`)
        }
      }
    return (
        <div className="d-flex justify-content-center py-3">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
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
