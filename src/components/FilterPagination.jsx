import React from 'react';
import { Toolbar, Button } from 'framework7-react';

const FilterPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxButtons = 5, // show max 5 buttons at once
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculate the pagination window
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Toolbar bottom className='transparentBg'>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {/* Prev Button */}
        <Button
          small
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ margin: '0 4px' }}
        >
          Prev
        </Button>

        {/* Show first page if not in window */}
        {startPage > 1 && (
          <>
            <Button small onClick={() => goToPage(1)} style={{ margin: '0 4px' }}>
              1
            </Button>
            {startPage > 2 && <span style={{ margin: '0 6px' }}>...</span>}
          </>
        )}

        {/* Windowed numeric buttons */}
        {pageNumbers.map((num) => (
          <Button
            key={num}
            small
            fill={currentPage === num}
            onClick={() => goToPage(num)}
            style={{ margin: '0 4px' }}
          >
            {num}
          </Button>
        ))}

        {/* Show last page if not in window */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span style={{ margin: '0 6px' }}>...</span>}
            <Button small onClick={() => goToPage(totalPages)} style={{ margin: '0 4px' }}>
              {totalPages}
            </Button>
          </>
        )}

        {/* Next Button */}
        <Button
          small
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ margin: '0 4px' }}
        >
          Next
        </Button>
      </div>
    </Toolbar>
  );
};

export default FilterPagination;
