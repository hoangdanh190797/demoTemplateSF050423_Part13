import React from 'react'

// export default function Pagination() {

//   return (
//     <div>Pagination</div>
//   )
// }

const PaginationComponent = ({postsPerPage, totalPosts, paginate }:any) => {
    const pageNumbers = [];

    for( let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
}
export default PaginationComponent;