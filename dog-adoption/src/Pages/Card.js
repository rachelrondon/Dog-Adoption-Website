const Cards = ({dog}) => {

  return (
     <div>
        <p>{dog.name}</p>
        <p>{dog.age}</p>
        <p>{dog.breed}</p>
        <p>{dog.zip_code}</p>
      </div>  
  )
};

export default Cards;