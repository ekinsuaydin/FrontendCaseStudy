import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';


const Paginationn = ({productPerPage, totalProducts, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
                {pageNumbers.map(number => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                        {number}
                    </Pagination.Item>
                ))}
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    );
}

export default Paginationn;