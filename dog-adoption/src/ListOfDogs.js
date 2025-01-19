import { useState, useEffect } from 'react';

const ListOfDogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function fetchDogs() {
      const response = await fetch('https://frontend-take-home-service.fetch.com')
      const data = await response.json();
      console.log(data);
    };
  });

  return (
    <div>
      <p>List of dogs</p>
      <p>{dogs}</p>
    </div>
  );
};

export default ListOfDogs;