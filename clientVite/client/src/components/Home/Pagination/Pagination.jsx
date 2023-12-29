import { useEffect } from 'react'
import './Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, page, currentPage, setLoading }) => {

    const totalPages = [...Array(Math.ceil(totalItems / itemsPerPage))]

   
    return (
        <>
            {totalPages.map((position, index) => {
                return (
                    <>
                            <div className={currentPage === (index + 1) ? "paginationButtonOnClick" : "paginationButton"} onClick={() => {
                                page(index + 1)
                                setLoading()
                                }} >{index + 1}</div>
                    </>
                )
            })}
        </>
    )
}

export default Pagination
