import { useState, useEffect } from 'react';

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
        console.log(response.status)
      };
      
      userLogin();
  
    }, [name, email]);

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      console.log(name, email);
      setLoggedIn(true);
      console.log(loggedIn);
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
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;