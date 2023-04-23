import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Control Panel/Auth-Context';

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [comment, setComment] = useState('');
  const [userNames, setUserNames] = useState([]);
  const { user } = useContext(AuthContext)

  const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/' });

  useEffect(() => {
    const fetchUserData = async (id) => {
      const response = await api.get(`Users`);
      const userData = response.data.Users;
      const userMap = userData.reduce((acc, user) => ({ ...acc, [user._id]: user.Nom }), {});
      setUserNames(userMap);
    };
    fetchUserData(id);
    console.log(user)
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timestamp = Date.now();
    const date = new Date(timestamp)
    const archiveData = {
      id_dm:id,
      id_from: localStorage.getItem('id'),
      id_to: to,
      comment: comment,
      Date: date
    };
    try {
      await api.post(`addArchive`, archiveData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleBack = async () => {
    navigate('/DM/' + id);
  };


  return (
    <div class="report">
      <form onSubmit={handleSubmit}>
        <label>
          DM :
        </label>
        <input type="text" readOnly value={id} />
        <label>
          From:
          <input type="text" readOnly value={localStorage.getItem("name")} />
          <input type="text" readOnly value={localStorage.getItem("id")} />
        </label>
        <label>
          To:
          <input type="text" value={to} onChange={(event) => setTo(event.target.value)} />
        </label>

        <label>
          Comment:
          <textarea type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
};
