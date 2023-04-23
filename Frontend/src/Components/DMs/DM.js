import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/' });

const DMPage = () => {
  const [dm, setDm] = useState(null);
  const [showModal, setShowModal] = useState(false); // state variable for showing/hiding the Modal
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/dm/${id}`);
        setDm(response.data.DM);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`deleteDm/${id}`);
      navigate('/DMs');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    navigate('/DMs');
  };

  const handleEdit = () => {
    setShowModal(true); // set the state variable to show the Modal
  };

  const handleCancel = () => {
    setShowModal(false); // set the state variable to hide the Modal
  };

  const handleReport = async () => {
    navigate(`/Report/`+id);
  };
  


  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      Designation: formData.get('Designation'),
      Marque: formData.get('Marque'),
      Service: formData.get('Service'),
      Etat: formData.get('Etat'),
      Description: formData.get('Description')
    };
    try {
      await api.patch(`updateDm/${id}`, data);
      setShowModal(false); // set the state variable to hide the Modal
      const response = await api.get(`/dm/${id}`);
      setDm(response.data.DM);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dm) {
    return <div>Loading...</div>;
  }

  const getStatusClass = (etat) => {
    switch (etat) {
      case 0:
        return "open";
      case 1:
        return "in-progress";
      case 2:
        return "dead";
      default:
        return "";
    }
  }

  return (
    <div class="dm">
      {showModal && (
        <div class="modal">
          <form onSubmit={handleSave}>
            <label>
              Designation:
              <input type="text" name="Designation" defaultValue={dm.Designation} />
            </label>
            <label>
              Marque:
              <input type="text" name="Marque" defaultValue={dm.Marque} />
            </label>
            <label>
              Service:
              <input type="text" name="Service" defaultValue={dm.Service} />
            </label>
            <label>
              Etat:
              <input type="text" name="Etat" defaultValue={dm.Etat} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
        <>
          <h1>ID : {dm._id}</h1>
         

          <p>Designation: {dm.Designation}</p>
          <p>Marque: {dm.Marque}</p>
          <p>Service: {dm.Service}</p>
          <p>Etat : 
            <span className={getStatusClass(dm.Etat)}></span>
          </p>
          <div class="buttons">
          <button onClick={handleBack}>
                Back
            </button>
            <button onClick={handleEdit}>
              Edit
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
            <button onClick={handleReport}>
                Report
            </button>
            </div>
            </>
        </div>
    );
};

export default DMPage;



