import React, { useState } from 'react';
import styled from 'styled-components';
import btp from './btp.json';

const ProjectTable = () => {
  const [records, setRecords] = useState(btp);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = btp.filter((row) =>
      row.projectNo.toLowerCase().includes(searchTerm) ||
      row.title.toLowerCase().includes(searchTerm) ||
      row.supervisor.toLowerCase().includes(searchTerm) ||
      (row.coSupervisor && row.coSupervisor.toLowerCase().includes(searchTerm)) ||
      (row.students && row.students.some(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.rollNo.toLowerCase().includes(searchTerm)
      ))
    );
    setRecords(filteredData);
  };

  const columns = [
    { name: 'Project No.', selector: row => row.projectNo },
    { name: 'Project Title', selector: row => row.title },
    { name: 'Supervisor', selector: row => row.supervisor },
    { name: 'Co-Supervisor', selector: row => row.coSupervisor || 'N/A' },
    {
      name: 'Students',
      selector: row => Array.isArray(row.students)
        ? row.students.map(student => student.name).join(", ")
        : "N/A"
    },
    {
      name: 'Roll No.',
      selector: row => Array.isArray(row.students)
        ? row.students.map(student => student.rollNo).join(", ")
        : "N/A"
    }
  ];

  return (
    <StyledWrapper className=''>
      <div className="table-container">
       
        <input
          type="text"
          placeholder=" Search by any keyword..."
          onChange={handleFilter}
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((record, idx) => (
                <tr key={idx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>{col.selector(record)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StyledWrapper>
  );
};

// Styled Components optimized for dark background and stylish search bar
const StyledWrapper = styled.div`
  .table-container {
    width: 90%;
    max-width: 1200px;
    margin: 30px auto;
    overflow-x: auto;
    font-family: Arial, Helvetica, sans-serif;
  }

  .search-input {
    width: 50%;
    padding: 10px;
    margin: 0 auto 20px auto;
    display: block;
    border-radius: 20px;
    border: solid 2px #4a148c;
    background-color: #222;
    color: #ddd;
    font-size: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    outline:none;
  }

  .search-input::placeholder {
    color: #888;
  }

  .search-input:hover,
  .search-input:focus {
    border-color:#9c27b0; /* lighter purple */
    box-shadow:0px 0px 10px rgba(156,39,176,0.6);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.5);
    border-radius: 6px;
    overflow: hidden;
  }

  th, td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #4a148c; /* Dark Purple */
    color: #ffffff; /* White */
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: #2c2c2c; /* Dark Grey */
  }

  tbody tr:nth-child(even) {
    background-color: #1f1f1f; /* Slightly darker Grey */
  }

  tbody tr:hover {
    background-color: #3d235d; /* Hover Purple */
  }

  td {
    color:#ddd; /* Light grey text for readability */
  }

  .no-data {
    text-align:center;
    padding:20px;
    color:#aaa; /* Lighter grey for no data message */
  }
`;

export default ProjectTable;
