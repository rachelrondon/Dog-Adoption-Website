import { useState, useEffect } from 'react';
import Card from './Card';
import './Show.css';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogIds, setDogIds] = useState("");
  const [dogs, setDogs] = useState("");
  const [sortBy, setSortBy] = useState('sort=breed:asc');
  const [sortAsc, setSortAsc] = useState(true);
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [pagination, setPagination] = useState('from=0')
  const [loadMore, setLoadMore] = useState("");

  useEffect(() => {

    async function getData() {
      const response = await fetch(`${api}/dogs/search?${sortBy}&size=${cardsPerPage}&${pagination}`, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: "include"
      }).catch((error) => console.log('error'));
      const data = await response.json();
      console.log('data', data);
      const next = data.next;
      const index = next.indexOf("from");
      const x = next.slice(index);
      setLoadMore(x);
      setDogIds(data.resultIds);
    }

    getData()
  }, [sortBy, pagination]);
  
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
          console.log('data', data);
          setDogs(data);
        }
        getDogs();
      } else {
        console.log("loading");
      }

    }, [dogIds])
   

    const toggleSort = () => {
      if (sortBy.includes("asc")) {
        setSortAsc(false);
        setSortBy('sort=breed:desc')
      } else {
        setSortAsc(true);
        setSortBy('sort=breed:asc')
      }
    };

    const loadMoreBtn = () => {
      console.log('load more btn');
      setPagination(loadMore);
      setCardsPerPage(cardsPerPage + 12);
    };


  return (
    <div className="card-container">
      <div>
        <div className="card-sort">
          <h4>Sort by Breed</h4>
          <button onClick={toggleSort}>{sortAsc ? <span>&#8593;</span>: <span>&#8595;</span>}</button>
        </div>
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
        <button onClick={loadMoreBtn} className="load-more-btn">Load More</button>
     </div>
    </div>
  )
};

export default Show;