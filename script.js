// States & declarations
let searches = [];
let currentSearch = "";

//Selectors
const searchBox = document.getElementById("search-box");
const resultContainer = document.getElementById("search-container");
const historyContainer = document.getElementById("history-container");


// Function for history button clicked.
function historyPageButton() {
  window.location.href = "history.html";
}

// Function to get words from storage as soon as the history page loads.
function getWordsFromLocalStorage() {
  let getArray = localStorage.getItem("searches");
  let getWords = JSON.parse(getArray);

  let oldItems = JSON.parse(localStorage.getItem("searches")) || [];

  //Building a card for each word found in storage
  getWords.forEach((element) => {
    const currWord = element.word;
    const currMeaning = element.meaning;

    const newOuterDiv = document.createElement("div");
    newOuterDiv.classList.add("card-body");
    const newDivForWord = document.createElement("div");
    newDivForWord.classList.add("word-container");
    newDivForWord.innerText = "Word: " + currWord;
    const newDivForMeaning = document.createElement("div");
    newDivForMeaning.classList.add("description-container");
    newDivForMeaning.innerText = currMeaning;
    const newDivForButton = document.createElement("div");
    newDivForButton.setAttribute("id", "delete-button");
    newDivForButton.setAttribute("class", element.id);
    const newIMG = document.createElement("img");
    newIMG.src = "src/img/delete.png";
    newIMG.alt = "Delete_Button";
    // newIMG.setAttribute("id", [arrayLength + 1]);
    newIMG.setAttribute("onclick", "deleteWordsFromLocalStorage()");
    newDivForButton.appendChild(newIMG);

    historyContainer
      .appendChild(newOuterDiv)
      .append(newDivForWord, newDivForMeaning, newDivForButton);
  });
}

// funtion to delete a card from history page
function deleteWordsFromLocalStorage() {}

// Function for Search button clicked to come back to search page.
function searchPageButton() {
  window.location.href = "index.html";
}

//function to call API, fetch and display the result in DOM
function searchButtonClicked() {
  currentSearch = searchBox.value;
  console.log(currentSearch); // for confirmation purpose, can be removed later on

  //API call
  const api_call = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  async function getResult() {
    //getting response
    const response = await fetch(api_call + [currentSearch]);
    //parse to JSON
    const data = await response.json();
    // console.log(data[0].meanings[0].definitions[0].definition);
    const receivedDefinition = data[0].meanings[0].definitions[0].definition;

    const resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "result");
    resultDiv.innerHTML = receivedDefinition;
    resultContainer.appendChild(resultDiv);

    //Getting old words from storage
    let oldItems = JSON.parse(localStorage.getItem("searches")) || [];

    //find length of stored array
    let arrayLength = oldItems.length;

    //Saving current word with description in a new object
    const wordObj = {
      id: [arrayLength + 1],
      word: [currentSearch],
      meaning: [receivedDefinition],
    };

    console.log(wordObj);
    console.log(arrayLength);

    //adding current word object to existing array
    oldItems.push(wordObj);

    //saving the updated array.
    localStorage.setItem("searches", JSON.stringify(oldItems));
  }

  getResult();
}
