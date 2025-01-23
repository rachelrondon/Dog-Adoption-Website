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
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [selectedDogBreed, setSelectedDogBreed] = useState("");
  const [dogBreedList, setDogBreedList] = useState("");

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

      // returns the ids for each dog
      const data = await response.json();
      setDogIds(data.resultIds);

      // updates the 'from' query parameter 
      const next = data.next;
      const index = next?.indexOf("from");
      const x = next?.slice(index);
      console.log('x', x);
      setLoadMore(x);
      
      // removes load more btn 
      const amount = x?.replace('from=', '');
      const total = data.total;
      if (amount > total) {
        setShowLoadMore(false);
      }
    }

    getData()
  }, [sortBy, pagination, cardsPerPage, showLoadMore]);
  
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
          // Returns the information for each dog 
          const data = await response.json();
          setDogs(data);
        }
        getDogs();
      } else {
        console.log("loading");
      }

    }, [dogIds])

    useEffect(() => {
      async function getDogBreeds() {
        const response = await fetch(`${api}/dogs/breeds`, {
          method: "GET", 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(),
          credentials: "include"
        }).catch((error) => console.log('error'));
        const data = await response.json();
        console.log(data);
        setDogBreedList(data);
      }
  
      getDogBreeds();
    }, []);

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
      let input = e.target.value;
      setSelectedDogBreed(input);
    }

    const handleFilterSubmit = (e) => {
      e.preventDefault();
      setSortBy(`&breeds=${selectedDogBreed}`)
      setCardsPerPage(8);
      setShowLoadMore(true);
      setPagination('from=0');
    }

  return (
    <div className="show-page">
      <div className="show-page-container">
        <section className="show-page-top">
          <h2 className="show-page-title">Adopt or foster your next furry friend!</h2>
          <div className="show-page-search-options">
          <div className="card-sort">
            <h4>Sort by Breed</h4>
            <button className="sort-btn" onClick={toggleSort}>{sortAsc ? <span>&#8593;</span>: <span>&#8595;</span>}</button>
          </div>
          <form className="card-filter" onSubmit={handleFilterSubmit}>
            <label>
              Filter by breed:
              <select value={selectedDogBreed} onChange={handleFilter}>
                {[...dogBreedList].map((breed) => {
                  return (
                    <option value={breed}>{breed}</option>
                  )
                })}
              </select>
            </label>
            <button className="submit-btn" type="submit">Submit</button>
          </form>
          </div>
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
            <p className="loading">Loading</p>
        )}
        {dogs && showLoadMore ? (
          <button onClick={loadMoreBtn} className="load-more-btn">Load More</button>
        ): (
          console.log('loading')
        )}
     </div>
    </div>
  )
};

export default Show;