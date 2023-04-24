import React, { useState } from 'react';
import DMs from '../DMs/DMs';
import Users from '../Users/Users';

export default function Search() {
  const [tableName, setTableName] = useState(''); // initialize state with an empty string

  function handleSelectChange(event) {
    setTableName(event.target.value); // update state with the selected value
  }

  let selectedTable;
  if (tableName === 'DMs') {
    selectedTable = <DMs />;
  } else if (tableName === 'Users') {
    selectedTable = <Users />;
  }
   else {
    selectedTable = <div class="no-table-selected" >No table selected</div>;
  }

  return (
    <div>
      <div class="select_all">
        <form>
          <select class="table-select" value={tableName} onChange={handleSelectChange}>
            <option value="">Choose a table</option>
            <option value="Users">Users</option>
            <option value="DMs">DMs</option>
          </select>
        </form>
      </div>
      <div>
        {selectedTable}
      </div>
    </div>
  );
}
