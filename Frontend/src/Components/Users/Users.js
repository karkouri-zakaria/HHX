import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/' });

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCol, setSearchCol] = useState('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/users?_page=${currentPage}&_limit=${perPage}`
        );
        setUsers(response.data.User);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, perPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSelectChange(event) {
    setSearchCol(event.target.value);
  }

 const filteredUsers = users.filter((user) => {
    //console.log(users)
    const searchTermLowerCase = searchTerm.toLowerCase();
    let nomMatch = false;
    let prenomMatch = false;
    let CINMatch = false;
    let idMatch = false;
    let fonctionMatch = false;
    switch (searchCol) {
      case "Nom":
        nomMatch = user.Nom.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "Prenom":
        prenomMatch = user.Prenom.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "CIN":
        CINMatch = user.CIN.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "id":
        idMatch = user._id.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "Fonction":
        fonctionMatch = user.Fonction.toLowerCase().startsWith(searchTermLowerCase);
        break;
      default:
        break;
    } 
    return nomMatch || prenomMatch || CINMatch || idMatch || fonctionMatch;
  }); 
  
  

  return (
    <div className='dms'>
      <h1>Users</h1>
      <div class="search-form">
        <form>
          <div class="select-wrapper">
            <select class="select" value={searchCol} onChange={handleSelectChange}>
              <option value="id">ID</option>
              <option value="CIN">CIN</option>
              <option value="Nom">Nom</option>
              <option value="Prenom">Prenom</option>
              <option value="Fonction">Fonction</option>
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
          <th>ID</th>
            <th>CIN</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Fonction</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.CIN}</td>
              <td>{user.Nom}</td>
              <td>{user.Prenom}</td>
              <td>{user.Fonction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from(
          { length: Math.ceil(filteredUsers.length / perPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Users;
