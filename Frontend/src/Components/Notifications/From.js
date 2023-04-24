import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/'  });

export default function From () {

    const [archivesFrom, setArchivesFrom] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCol, setSearchCol] = useState('DM');
    const [details, setDetails] = useState(null);
    const [name, setName] = useState("")

    useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await api.get(`/ArchivesFrom/${localStorage.getItem("id")}?_page=${currentPage}&_limit=${perPage}`);
          setArchivesFrom(res.data.Archive)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [currentPage, perPage]);

    useEffect(() => {
        const getUserNames = async () => {
          if (!archivesFrom) return;
          const userNames = await Promise.all(
            archivesFrom.map((archive) => api.get(`User/${archive.id_to}`))
          );
          setName(
            userNames.reduce(
              (acc, res) => ({
                ...acc,
                [res.data.user._id]: `${res.data.user.Nom} ${res.data.user.Prenom}`,
              }),
              {}
            )
          );
        };
        console.log(name)
        getUserNames();
      }, [archivesFrom]);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    function handleSelectChange(event) {
      setSearchCol(event.target.value); // update state with the selected value
    }

    function handleDetails(index) {
        setDetails(index === details ? null : index);
      }      
      
    
    function handleDelete(id) {
        return async () => {
          try {
            await api.delete("deleteArchive/"+id)
            // Update the state here if needed after successful deletion
          } catch (error) {
            console.error(error);
          }
        }
      }
  
const filteredArchives = archivesFrom && archivesFrom.filter((archive) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    let DM = false;
    let From = false;
    switch (searchCol) {
      case "DM":
        DM = archive.id_dm.toLowerCase().startsWith(searchTermLowerCase);
        break;
      case "From":
        From = archive.id_to.toLowerCase().startsWith(searchTermLowerCase);
        break;
      default:
        break;
    } 
    return DM || From ;
  });
  

    return (
        <div className='dms'>
           <h2>Outbox</h2>
          <div class="search-form">
            <form>
              <div class="select-wrapper">
                <select class="select" value={searchCol} onChange={handleSelectChange}>
                  <option value="">Search By</option>
                  <option value="DM">DM</option>
                  <option value="From">From</option>
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
          {filteredArchives && (
  <div>
    <table>
      <thead>
        <tr>
          <th>DM</th>
          <th>To</th>
          <th>Date</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {filteredArchives.map((archive, index) => (
        <React.Fragment key={archive._id}>
            <tr>
            <td><Link to={`/DM/${archive.id_dm}`}>{archive.id_dm}</Link></td>
            <td>{`${Object.values(name).join(', ')} : ${archive.id_to}`}</td>
            <td>{new Date(archive.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} {new Date(archive.Date).toLocaleDateString()}</td>
            <td><button onClick={() => handleDetails(index)}>Details</button></td>
            <td><button onClick={handleDelete(archive._id)}>Delete</button></td>
            </tr>
            {details === index && (
            <tr>
                <td colSpan="6" class="comment">Report ID :{archive._id}<br/>Message : {archive.comment}</td>
            </tr>
            )}
        </React.Fragment>
        ))}
</tbody>

    </table>
    <div className='pagination'>
      {Array.from({ length: Math.ceil(archivesFrom.length / perPage) }, (_, i) => (
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
)}

          
        </div>
      );
    };