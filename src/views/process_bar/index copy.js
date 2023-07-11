import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:83/company/company/';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async page => {
    try {
      const response = await fetch(`${API_URL}?limit=${page}`);
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < data.count) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== data.count) {
      setCurrentPage(data.count);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button className='first-page-btn' onClick={handleFirstPage}>
          First
        </button>
        <button className='previous-page-btn' onClick={handlePreviousPage}>
          Previous
        </button>
        <button className='next-page-btn' onClick={handleNextPage}>
          Next
        </button>
        <button className='last-page-btn' onClick={handleLastPage}>
          Last
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
