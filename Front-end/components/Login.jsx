import {useState} from 'react'
import axios from 'axios';


function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [phone, setPhone] = useState("");

  const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //const phoneRegex = /^[0-9]{10}$/;
  const nameValid = name.trim().length > 0; 
  

  

  const emailValid = emailRegex.test(email);
  const passwordValid = password.trim().length > 0;
  //const phoneValid = phoneRegex.test(phone);

  const formValid = emailValid  && nameValid

const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || 'https://portifolio-1-wbgs.onrender.com'
  : import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setIsSuccess(false);
    //setPhone('');

    try {
      const response = await axios.post(`${apiBaseUrl}/login`, { name, email, password });
      setEmail('');
      setPassword('');
      setName('');
      setStatusMessage(response.data?.message || 'Login successful!');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again later.';
      setStatusMessage(errorMessage);
      setIsSuccess(false);
    }
  };

return(
  <form onSubmit={handleSubmit}>
    <h1 >Login</h1>
    <label>
      Name
       <input type="text" value={name} onChange={(e) => 
        setName(e.target.value)} placeholder='Enter you name' />
    </label>

    {name && !nameValid && (
      <p className='error'>Name can't be empty!</p>
    )}

    <label>
      Email
      <input type="email" value={email} 
      onChange={(e) => setEmail(e.target.value)}
      className={email && !emailValid ? "invalid" : ""} placeholder ='Enter your email'
      />

      {email && !emailValid && (
        <p className='error'>Invalid email format</p>
      )}
    </label>
    <label>
      Password
      <input type="password" value={password} 
      onChange={(e) => setPassword(e.target.value)}
      placeholder ='Enter your password' 
      />
      {password && !passwordValid && (
        <p className='error'>Password can't be empty!</p>
      )}
    </label>

    <button type='submit' disabled = {!formValid}>Login</button>

  </form>
);

}

export default Form;
