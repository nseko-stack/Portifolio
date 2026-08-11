import {useState} from 'react'
import axios from 'axios';


function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameValid = name.trim().length > 0; 

  

  const emailValid = emailRegex.test(email);
  const phoneValid = phoneRegex.test(phone);

  const formValid = emailValid && phoneValid && nameValid

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid || !phoneValid) {
      alert('please fix validation error before login');
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/submit", {
        name,
        email,
        phone_number: phone,
      });
      alert(response.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };


return(
  <form onSubmit={handleSubmit}>
    <h1>Signup</h1>
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
      PhoneNumber
      <input type="number" value={phone} 
      onChange={(e) => setPhone(e.target.value)}
      className= {phone && !phoneValid ? "Must be 10 digits" : ""} placeholder ='Enter your phone number' 
      />
      {phone && !phoneValid && (
        <p className='error'>Must be 10-digits</p>
      )}
    </label>

    <button type='submit' disabled = {!formValid}>Login</button>

  </form>
);

}

export default Form;
