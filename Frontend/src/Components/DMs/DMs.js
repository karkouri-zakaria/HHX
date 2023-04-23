import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/'  });

const DMs = () => {
  const [dms, setDms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCol, setSearchCol] = useState('id');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/dms?_page=${currentPage}&_limit=${perPage}`);
        setDms(response.data.DMs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(dms);
  }, [currentPage, perPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSelectChange(event) {
    setSearchCol(event.target.value); // update state with the selected value
  }


const filteredDMs = dms.filter((dm) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    let DesignationMatch = false;
    let MarqueMatch = false;
    let ServiceMatch = false;
    let idMatch = false;
    switch (searchCol) {
      case "Designation":
        DesignationMatch = dm.Designation.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "Marque":
        MarqueMatch = dm.Marque.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "Service":
        ServiceMatch = dm.Service.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "id":
        idMatch = dm._id.toLowerCase().startsWith(searchTermLowerCase);
        break;
      default:
        break;
    } 
    return DesignationMatch || MarqueMatch || ServiceMatch || idMatch;
  });

  

  return (
    <div className='dms'>
      <h1>DMs</h1>
      <div class="search-form">
        <form>
          <div class="select-wrapper">
            <select class="select" value={searchCol} onChange={handleSelectChange}>
              <option value="">Search By</option>
              <option value="id">ID</option>
              <option value="Designation">Designation</option>
              <option value="Marque">Marque</option>
              <option value="Service">Service</option>
            </select>
          </div>
          <div class="search-wrapper">
            <input
              class="search-input"
              type="text"
              placeholder="Search here ..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Designation</th>
            <th>Marque</th>
            <th>Service</th>
            <th>Etat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {filteredDMs.map((dm) => (
            <tr key={dm._id}>
              <td>{dm._id}</td>
              <td>{dm.Designation}</td>
              <td>{dm.Marque}</td>
              <td>{dm.Service}</td>
              <td>{dm.Etat}</td>
              <td>
                <Link to={`/DM/${dm._id}`}>
                  <button>View more</button>
                </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from({ length: Math.ceil(dms.length / perPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DMs;
