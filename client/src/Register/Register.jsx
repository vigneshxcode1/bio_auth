import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate()

  const register = async () => {
    try {
      const publicKey = {
        challenge: new Uint8Array(32), //replace  server-generated challenge
        rp: {
          name: 'Fingerprint Auth'
        },
        user: {
          id: new Uint8Array(32), 
          name: name,
          displayName: name
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 },   // ES256
          { type: 'public-key', alg: -257 } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'preferred'
        }
      };
      

      const credential = await navigator.credentials.create({ publicKey });

      const attestationObject = credential.response.attestationObject;
      const clientDataJSON = credential.response.clientDataJSON;

      const fingerprint = {
        attestationObject: bufferToBase64(attestationObject),
        clientDataJSON: bufferToBase64(clientDataJSON)
      };

     
      console.log("Fingerprint data being sent:", fingerprint);


    


      const response = await axios.post('https://bio-auth-server.onrender.com/api/1/register', { name, phone, fingerprint });
     
      if(response){
        navigate("/home")
      }
      console.log("Response from backend:", response.data); 
      alert('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const bufferToBase64 = (buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  };

  return (
    <>
    <h1>register wth fingerprint</h1>
    <div className="form">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <button onClick={register}>Submit</button>
    </div>
    </>
    
  );
};

export default Register;
