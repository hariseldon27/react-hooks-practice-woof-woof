import React, { useState, useEffect } from "react";

function App() {
  const [dogsInList, setDogsInList] = useState([])
  const [dogOnShow, setDogOnShow] = useState({}) //remember if it's a single thing store it as an obj
  const [isGoodDog, setIsGoodDog] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then((r) => r.json())
    .then((data) => setDogsInList(data))
   }, [])
   
   
   function handleNameClick(e) {
     const dogToShow = dogsInList.find(dog => dog.id === parseInt(e.target.id,10)) //the type error was that in the db id is num and our obj id was a string
     setDogOnShow(dogToShow)
     setIsGoodDog(dogToShow.isGoodDog)
   }

   function handleGoodDogClick(e) {
    e.stopPropagation();
    setIsGoodDog(() => !isGoodDog)
    fetch(`http://localhost:3001/pups/${dogOnShow.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: !isGoodDog,
      }),
    })
    .then((r) => r.json())
    .then((updatedDoggy) => onUpdatedDoggy(updatedDoggy))
  }

  function onUpdatedDoggy(updatedItem){
    const updatedItemList = dogsInList.map((item) => {
      if(item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item
      }
    });
    setDogOnShow(updatedItem)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        {dogsInList.map((dog) => (
          <span onClick={handleNameClick} id={dog.id} key={dog.id}>{dog.name}</span>

        ))}
        
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
        { dogOnShow.name ? dogOnShow.name : "nope"}
        { dogOnShow.image ? <img src={dogOnShow.image} /> : "nope"}
        <h3>am I a good dog?</h3>
        <button id="goodDogClicker" onClick={handleGoodDogClick}>  { dogOnShow.isGoodDog ? "Yeah!" : "nope"} </button>

        </div>
      </div>
    </div>
  );
}

export default App;
