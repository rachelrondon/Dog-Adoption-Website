import './Card.css'; 

const Cards = ({dog}) => {

  return (
     <div className="info-card">
        <img className="info-card-img" src={dog.img} alt={dog.breed} />
        <div className="info-card-content">
          <h4>Name: {dog.name}</h4>
          <h4 className="info-card-breed">Breed: {dog.breed}</h4>
          <h4>Age: {dog.age}</h4>
          <h4>Zip Code: {dog.zip_code}</h4>
        </div>
      </div>  
  )
};

export default Cards;