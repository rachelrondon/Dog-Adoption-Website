import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const api = "https://frontend-take-home-service.fetch.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
        });
      };
      
      userLogin();
  
    }, [name, email]);

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setLoggedIn(true);
    };

  return (
    <div className="login-page">
      <h1 className="login-page-title">Fetch Dog Shelter - Adopt or Foster</h1>
      <div className="login-page-container">
      <h2 className="login-title">Login</h2>
        <div className="login-page-form">
          <form onSubmit={handleLoginSubmit}>  
            <label>
              Name:
            <input className="input-name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              Email:
            <input className="input-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <Link className="login-btn" type="submit" to="/dogs">login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;