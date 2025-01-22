import { useState, useEffect } from 'react';
import Card from './Card';
import './Show.css';

const Show = () => {

  const api = "https://frontend-take-home-service.fetch.com";
  const [dogIds, setDogIds] = useState("");
  const [dogs, setDogs] = useState("");
  const [sortBy, setSortBy] = useState('sort=breed:asc');
  const [sortAsc, setSortAsc] = useState(true);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [pagination, setPagination] = useState('from=0')
  const [loadMore, setLoadMore] = useState("");
  const [dogBreed, setDogBreed] = useState("");

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
      const next = data.next;
      const index = next.indexOf("from");
      const x = next.slice(index);
      setLoadMore(x);
      setDogIds(data.resultIds);
    }

    getData()
  }, [sortBy, pagination, cardsPerPage]);
  
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
      setPagination(loadMore);
      setCardsPerPage(cardsPerPage + 8);
    };

    const handleFilter = (e) => {
      setDogBreed(e.target.value);
    }

    const handleFilterSubmit = (e) => {
      e.preventDefault();
      setSortBy(`&breeds=${dogBreed}`)
      setDogBreed("");
    }

  return (
    <div className="show-page">
      <div className="show-page-container">
        <section className="show-page-top">
          <div className="card-sort">
            <h4>Sort by Breed</h4>
            <button className="sort-btn" onClick={toggleSort}>{sortAsc ? <span>&#8593;</span>: <span>&#8595;</span>}</button>
          </div>
          <form className="card-filter" onSubmit={handleFilterSubmit}>
            <label>
              Sort by breed:
              <input type="text" value={dogBreed} onChange={handleFilter} />
            </label>
            <button className="submit-btn" type="submit">Submit</button>
          </form>
        </section>
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