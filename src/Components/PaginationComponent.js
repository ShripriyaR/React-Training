import React from 'react'
import ReactPaginate from 'react-paginate'
import "./PaginationComponent.css"

function PaginationComponent({pageCount,handlePageClick}) {
  return (
    <div className='d-flex justify-content-center mt-3'>
        <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}/>
    </div>
  )
}

export default PaginationComponent