import { useState, useEffect } from 'react';

const Login = () => {
  const api = "https://frontend-take-home-service.fetch.com";
  const [theName, setName] = useState("");
  const [theEmail, setEmail] = useState("");

useEffect(() => {
    const user = {
      name: theName, 
      email: theEmail
    }

    async function userLogin() {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: "include"
      });

      const data = await response.json();
    };
    
    userLogin();

  }, [theName, theEmail]);

  return (
    <div>
      <form>  
        <label>
          Name:
         <input onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Email:
        <input onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;