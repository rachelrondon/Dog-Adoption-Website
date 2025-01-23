import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const api = "https://frontend-take-home-service.fetch.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const user = {
    name: name, 
    email: email
  };

    useEffect(() => {  
      async function userLogin() {
        const response = await fetch(`${api}/auth/login`, {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
          credentials: "include"
        }).catch((error) => console.log('error logging in'))
        let statusCode = response.status;
        setStatusCode(statusCode);
      };

      userLogin();
  
    }, [name, email]);

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
    };

  return (
    <div className="login-page">
      <h1 className="login-page-title">Fetch Dog Shelter - Adopt or Foster</h1>
      <div className="login-page-container">
      <h2 className="login-title">Login</h2>
        <div className="login-page-form">
          <form onSubmit={handleLoginSubmit}>  
            <label className="login-form-name">
              Name:
            <input required className="input-name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              Email:
            <input required className="input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            {statusCode === 200 ? (
              <Link 
              className="login-btn" 
              type="submit"
              to="/dogs">
              login</Link>            
            ): (
              <Link 
              className="login-btn" 
              type="submit"
              to="">
              login</Link>  
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;