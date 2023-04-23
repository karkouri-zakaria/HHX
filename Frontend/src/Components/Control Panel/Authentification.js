import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from './Auth-Context';

const api = axios.create({ baseURL: 'http://localhost:2020/api/v1/' });

function Authentification() {

  const {register, handleSubmit, errors, getValues}=useForm()
  const [showRegistrationForm, setShowRegistrationForm] = useState(true)
  const { login } = useContext(AuthContext)
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setShowRegistrationForm(!showRegistrationForm)
  }

  const onSubmitLogin = async (data, e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', {
        "Email": data.email,
        "Password": data.password
      });
      login(res.data);

    } catch (error) {
      console.error(error);
    }
  }
  

  const onSubmitRegister = async (data, e) => {
    try {
      const response = await api.post('/register', {
        CIN: data.CIN,
        Nom: data.Nom,
        Prenom: data.Prenom,
        Email: data.email,
        Telephone: data.Telephone,
        Fonction: data.Fonction,
        Password: data.password
      });
      console.log(response.data); // optional: log the response data
    } catch (error) {
      setMessage('This account already exists')
      console.log(error); // optional: log the error
    }
  };
  

  return (
    <div class="register">
      { showRegistrationForm &&
        ( <div className="login">
            <form onSubmit={handleSubmit(onSubmitLogin)}>
            <button onClick={toggleForm}>You don't have an account yet ?</button>
              <label htmlFor="email">Email</label>
              <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
              {errors && errors.email && <span>This field is required</span>}

              <label htmlFor="password">Password</label>
              <input type="password" {...register('password', { required: true, minLength: 0 })} />
              {errors && errors.password && <span>This field is required and must be at least 6 characters long</span>}
              <button type="submit">Log in</button>
            </form>
          </div>)
        }
        { !showRegistrationForm &&
        ( <form onSubmit={handleSubmit(onSubmitRegister)}>
        <button onClick={toggleForm}>You already have an account ?</button>
  
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors && errors.email && <span>This field is required</span>}
  
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password', { required: true, minLength: 0})} />
        {errors && errors.password && <span>This field is required and must be at least 6 characters long</span>}
  
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" {...register('confirmPassword', {
          required: true,
          validate: (value) => value === getValues('password')
        })} />
        {errors && errors.confirmPassword && <span>This field is required and must match the Password field</span>}
  
        <label htmlFor="CIN">CIN</label>
        <input type="text" {...register('CIN', { required: true })} />
        {errors && errors.CIN && <span>This field is required</span>}
  
        <label htmlFor="Nom">Nom</label>
        <input type="text" {...register('Nom', { required: true })} />
        {errors && errors.Nom && <span>This field is required</span>}
  
        <label htmlFor="Prenom">Prenom</label>
        <input type="text" {...register('Prenom', { required: true })} />
        {errors && errors.Prenom && <span>This field is required</span>}
  
        <label htmlFor="Fonction">Fonction</label>
      <select {...register('Fonction', { required: true })}>
      <option value="">Select a function</option>
      <option value="BioMed">BioMed</option>
      <option value="Nurse">Nurse</option>
      <option value="Admin">Admin</option>
      <option value="Provider">Provider</option>
      </select>
      {errors && errors.Fonction && <span>This field is required</span>}
  
        <label htmlFor="Telephone">Telephone</label>
        <input type="text" {...register('Telephone', { required: true })} />
        {errors && errors.Telephone && <span>This field is required</span>}
        <button type="submit">Register</button>
        <p>{message}</p >
        
      </form>)
        }
    </div>
  )
}

export default Authentification
