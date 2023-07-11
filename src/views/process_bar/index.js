import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.instantwebtools.net/v1/passenger';

const TableComponent = () => {
  const [data, setData] = useState({
    data: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async page => {
    try {
      const response = await fetch(`${API_URL}?page=${page}&size=10`);
      const responseData = await response.json();
      setData(responseData);
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
    if (currentPage < data.totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== data.totalPages) {
      setCurrentPage(data.totalPages);
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
          {data.data.map(item => (
            <tr key={item._id}>
              <td>{item._id.slice(0, 6)}</td>
              <td>{item.name.slice(0, 3)}</td>
              <td>{item.name}</td>
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
