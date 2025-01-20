import { useState, useEffect } from 'react';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogBreeds, setDogBreeds] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${api}/dogs/breeds`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      });
      const data = await response.json();
      setDogBreeds(data);
    }

    getData()
  }, []);

  console.log(dogBreeds);
  return (
    <div>
      <p>List of Dogs</p>
      {dogBreeds.map((breed) => {
        return (
          <h2>
            {breed}
          </h2>
        )
      })}
    </div>
  )
};

export default Show;