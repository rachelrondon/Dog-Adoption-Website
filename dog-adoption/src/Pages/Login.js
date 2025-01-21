import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <form onSubmit={handleLoginSubmit}>  
        <label>
          Name:
         <input value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <Link type="submit" to="/dogs">login</Link>
      </form>
    </div>
  );
};

export default Login;