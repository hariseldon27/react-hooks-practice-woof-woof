import React, { useState, useEffect } from "react";

function App() {
  const [dogsInList, setDogsInList] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then((r) => r.json())
    .then((data) => setDogsInList(data))
   }, [])

   function handleNameClick(e) {
     console.log(e.target.id)
     const dogOnShow = dogsInList.filter(dog => dog.id === e.target.id)
    //  showMeThis(dogOnShow)
    console.log(dogOnShow)
   }

   function showMeThis(thingToShow) {
     console.log(thingToShow)
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
        <div id="dog-info"></div>
      </div>
    </div>
  );
}

export default App;
