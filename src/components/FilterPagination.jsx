import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  Button,
} from 'framework7-react';
import axios from 'axios';

const FilterPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <>
      <Toolbar bottom>
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

          {/* Numeric Buttons */}
          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              small
              fill={currentPage === idx + 1}
              onClick={() => goToPage(idx + 1)}
              style={{ margin: '0 4px' }}
            >
              {idx + 1}
            </Button>
          ))}

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
    </>
  )
}

export default FilterPagination