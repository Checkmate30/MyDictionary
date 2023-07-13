// States & declarations
let searches = [];
let currentSearch = "";

//Selectors
const searchBox = document.getElementById("search-box");
const resultContainer = document.getElementById("result");
const historyContainer = document.getElementById('history-container');


// Function for history button clicked.
function historyPageButton() {
  window.location.href = "history.html";

  function getWordsFromLocalStorage() {
    let getArray = localStorage.getItem("searches");
    let getWords = JSON.parse(getArray);
    console.log(getWords);
  }

  //for each word, generate a card in card section



getWordsFromLocalStorage();
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

    if (response === null || response === undefined) {
      resultContainer.innerText =
        "No context found for your input. Try searching for a different word.";
    } else {
      //push the definition on html div
      resultContainer.style.boxShadow = "0px 0px 5px 1px skyblue";
      resultContainer.innerText = receivedDefinition;
      // document.createElement("p");
    }

    //Saving current word with description in a new object
    const wordObj = {
      word: [currentSearch],
      meaning: [receivedDefinition],
    };

    //adding current object to array
    searches.push(wordObj);
    // console.log(searches);

    //storing array to the local storage
    let string = JSON.stringify(searches);
    localStorage.setItem("searches", string);
  }
  getResult();
}