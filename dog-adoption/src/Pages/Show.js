import { useState, useEffect } from 'react';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogIds, setDogIds] = useState("");
  const [dogs, setDogs] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${api}/dogs/search?size=10&from=10?sort=[asc|desc]`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      });
      const data = await response.json();
      setDogIds(data.resultIds);
    }

    getData()
  }, []);

    useEffect(() => {
      async function getDogs() {
        const response = await fetch(`${api}/dogs`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dogIds),
          credentials: "include"
        });
        const data = await response.json();
        console.log(data);
        setDogs(data);
      }

      getDogs();
    }, [dogIds])

    console.log(dogs);
  return (
    <div>
      <p>List of Dogs</p>
    </div>
  )
};

export default Show;