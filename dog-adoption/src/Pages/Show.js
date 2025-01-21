import { useState, useEffect } from 'react';
import Card from './Card';
import './Show.css';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogIds, setDogIds] = useState("");
  const [dogs, setDogs] = useState("");
  const sortBreedAscending = 'sort=breed:asc';

  useEffect(() => {

    async function getData(sortBy) {
      const response = await fetch(`${api}/dogs/search?${sortBy}`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      }).catch((error) => console.log('error'));
      const data = await response.json();
      setDogIds(data.resultIds);
    }

    getData(sortBreedAscending)
  }, []);
  
    useEffect(() => {
      if (dogIds) {
        async function getDogs() {
          const response = await fetch(`${api}/dogs`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogIds),
            credentials: "include"
          })
          const data = await response.json();
          console.log(data);     
          setDogs(data);
        }
        getDogs();
      } else {
        console.log("loading");
        // ToDo: Add loading icon 
      }

    }, [dogIds])


  return (
    <div className="card-container">
      {dogs ? (
        <div className="card-layout">
        {[...dogs].map((dog) => {
          return (
            <Card key={dog.id} dog={dog} />
          )
        })}
        </div>
      ): (
          <p>Loading</p>
      )}

    </div>
  )
};

export default Show;