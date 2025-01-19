import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ProjectTable = () => {
    const [data] = useState([
        { id: 1, professorName: 'John Doe', projectName: 'AI Research', age: 45 },
        { id: 2, professorName: 'Jane Smith', projectName: 'Quantum Computing', age: 38 },
        { id: 3, professorName: 'Emily Davis', projectName: 'Data Science', age: 40 },
        { id: 4, professorName: 'Michael Brown', projectName: 'Robotics', age: 50 },
        { id: 5, professorName: 'Sarah Wilson', projectName: 'Cybersecurity', age: 35 },
        { id: 6, professorName: 'David Lee', projectName: 'Cloud Computing', age: 42 },
        { id: 7, professorName: 'Laura Martinez', projectName: 'Software Engineering', age: 29 },
        { id: 8, professorName: 'Robert Garcia', projectName: 'Blockchain Technology', age: 37 },
        { id: 9, professorName: 'Sophia Clark', projectName: 'Neural Networks', age: 48 },
        { id: 10, professorName: 'William Walker', projectName: 'Artificial Intelligence', age: 55 },
        { id: 11, professorName: 'Olivia Moore', projectName: 'Machine Learning', age: 33 },
    ]);

    const [records, setRecords] = useState(data);

    function handleFilter(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = data.filter(row => 
            row.professorName.toLowerCase().includes(searchTerm) ||
            row.projectName.toLowerCase().includes(searchTerm)
        );
        setRecords(filteredData);
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Professor Name',
            selector: row => row.professorName,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Project Name',
            selector: row => row.projectName,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
            style: { color: 'purple' },
        },
    ];

    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundColor: 'black' }}>
            <div className="table-container">
                <div className='text-end'>
                    <input
                        type='text'
                        placeholder='Search...'
                        onChange={handleFilter}
                        className='mb-3 p-2 border rounded'
                        style={{
                            borderColor: 'purple',
                            color: 'purple',
                            backgroundColor: 'black',
                        }}
                    />
                </div>
                <h1
                    style={{
                        color: 'purple', 
                        backgroundColor: 'black', 
                        padding: '10px', 
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Professor and Project Information
                </h1>
                <DataTable
                    title=""
                    columns={columns}
                    data={records}
                    pagination
                    responsive
                    selectableRows
                    fixedHeader
                    highlightOnHover
                    striped
                    customStyles={{
                        table: {
                            style: {
                                backgroundColor: 'black',
                                color: 'purple',
                                border: '1px solid purple',
                            }
                        },
                        headRow: {
                            style: {
                                backgroundColor: 'black',
                                borderBottom: '2px solid purple',
                            }
                        },
                        headCells: {
                            style: {
                                color: 'purple',
                            }
                        },
                        cells: {
                            style: {
                                color: 'purple',
                                backgroundColor: 'black',
                                border: '1px solid purple',
                            }
                        },
                        pagination: {
                            style: {
                                backgroundColor: 'black',
                                color: 'purple',
                            },
                            pageButtonsStyle: {
                                color: 'purple',
                                backgroundColor: 'black',
                            },
                            activeStyle: {
                                backgroundColor: 'purple',
                                color: 'black',
                            }
                        },
                        checkbox: {
                            style: {
                                backgroundColor: 'black',
                                borderColor: 'purple',
                                color: 'purple',
                            }
                        },
                        row: {
                            style: {
                                backgroundColor: 'black',
                                borderBottom: '1px solid purple', // Ensures bottom border for all rows
                            }
                        },
                        rowStriped: {
                            style: {
                                backgroundColor: 'black',
                                borderBottom: '1px solid purple', // Ensures bottom border for striped rows
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ProjectTable;
