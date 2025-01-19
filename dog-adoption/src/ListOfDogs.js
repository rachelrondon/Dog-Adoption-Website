import { useState, useEffect } from 'react';

const ListOfDogs = () => {
  const [dogs, setDogs] = useState([]);
  const api = "https://frontend-take-home-service.fetch.com";
  const user = {
    name: "Rachel", 
    email: "rachel.sun.rondon@gmail.com"
  };

  useEffect(() => {
    async function fetchDogs() {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: "include"
      })
      const data = await response.json();
      setDogs(data);
    };

    fetchDogs();

  }, []);

  console.log(dogs);

  return (
    <div>
      <p>List of dogs</p>
      <p>{dogs}</p>
    </div>
  );
};

export default ListOfDogs;