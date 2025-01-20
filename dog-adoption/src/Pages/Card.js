import './Card.css'; 

const Cards = ({dog}) => {

  return (
     <div className="info-card">
        <p>{dog.name}</p>
        <img className="info-card-img" src={dog.img} />
        <p>{dog.age}</p>
        <p>{dog.breed}</p>
        <p>{dog.zip_code}</p>
      </div>  
  )
};

export default Cards;