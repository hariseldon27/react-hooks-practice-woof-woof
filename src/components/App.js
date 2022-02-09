import React, { useState, useEffect } from "react";

function App() {
  const [dogsInList, setDogsInList] = useState([])
  const [dogOnShow, setDogOnShow] = useState({})

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then((r) => r.json())
    .then((data) => setDogsInList(data))
   }, [])
   
   
   function handleNameClick(e) {
     const dogToShow = dogsInList.find(dog => dog.id === parseInt(e.target.id,10))
     console.log(dogsInList)
     console.log(e.target.id)
     console.log(dogToShow)
     setDogOnShow(dogToShow)
    //  debugger
    // console.log(dogOnShow)
   }

  //  useEffect(() => {
  //    console.log("dogOnShow: " + dogOnShow.id)
  //   //  console.log("dogToShow: " + dogToShow)
  //  }, [dogOnShow])

  //  function showMeThis(thingToShow) {
  //    console.log(dogOnShow)
  //  }

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


        </div>
      </div>
    </div>
  );
}

export default App;
