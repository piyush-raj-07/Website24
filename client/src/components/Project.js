import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import btp from "./btp.json";

const ProjectTable = () => {
    
    // const [data] = useState([
    //     { id: 1, professorName: 'John Doe', projectName: 'AI Research', age: 45 },
    //     { id: 2, professorName: 'Jane Smith', projectName: 'Quantum Computing', age: 38 },
    //     { id: 3, professorName: 'Emily Davis', projectName: 'Data Science', age: 40 },
    //     { id: 4, professorName: 'Michael Brown', projectName: 'Robotics', age: 50 },
    //     { id: 5, professorName: 'Sarah Wilson', projectName: 'Cybersecurity', age: 35 },
    //     { id: 6, professorName: 'David Lee', projectName: 'Cloud Computing', age: 42 },
    //     { id: 7, professorName: 'Laura Martinez', projectName: 'Software Engineering', age: 29 },
    //     { id: 8, professorName: 'Robert Garcia', projectName: 'Blockchain Technology', age: 37 },
    //     { id: 9, professorName: 'Sophia Clark', projectName: 'Neural Networks', age: 48 },
    //     { id: 10, professorName: 'William Walker', projectName: 'Artificial Intelligence', age: 55 },
    //     { id: 11, professorName: 'Olivia Moore', projectName: 'Machine Learning', age: 33 },
    // ]);

    const [records, setRecords] = useState(btp);

    function handleFilter(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = btp.filter(row => 
            row.projectNo.toLowerCase().includes(searchTerm) ||
            row.title.toLowerCase().includes(searchTerm) ||
            row.supervisor.toLowerCase().includes(searchTerm)
            
        );
        setRecords(filteredData);
    }

    const columns = [
        {
            name: 'Project No.',
            selector: row => row.projectNo,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Project Title',
            selector: row => row.title,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Supervisor',
            selector: row => row.supervisor,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Co-Supervisor',
            selector: row => row.coSupervisor,
            sortable: true,
            style: { color: 'purple' },
        },
        {
            name: 'Students',
            selector: row => row.students.map(student => student.name).join(", "),
            style: { color: 'purple' },
        },
        {
            name: 'Roll No.',
            selector: row => row.students.map(student => student.rollNo).join(", "),
            style: { color: 'purple' },
        },
    ];

    
    return(
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-80 p-4 mx-4">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-purple-600">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-4 ">
                     {column.name}
                  </th>
                ))}
                </tr>
              </thead>
              <tbody>
              {btp.map((record, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  {/* Render each cell for this row */}
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="whitespace-normal px-6 py-4 break-words font-semibold">
                         {column.selector(record)}
                      </td>
                    ))}
                </tr>
             ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
    );
};

export default ProjectTable;



