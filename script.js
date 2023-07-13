// Function for history button clicked.
function historyPageButton () {
  window.location.href = 'history.html'
}

// Function for Search button clicked to come back to search page.
function searchPageButton () {
  window.location.href = 'index.html'
}

// States & declarations
let searches = []
let currentSearch = ''

//Selectors
const searchBox = document.getElementById('search-box')
const resultContainer = document.getElementById('result')

//function to call API, fetch and display the result in DOM
function searchButtonClicked () {
  currentSearch = searchBox.value
  console.log(currentSearch) // for confirmation purpose, can be removed later on

  //API call
  const api_call = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
  async function getResult () {
    //getting response
    const response = await fetch(api_call + [currentSearch])

    //parse to JSON
    const data = await response.json()
    // console.log(data[0].meanings[0].definitions[0].definition);
    const receivedDefinition = data[0].meanings[0].definitions[0].definition

    if (response === null || response === undefined) {
      resultContainer.innerText =
        'No context found for your input. Try searching for a different word.'
    } else {
      //push the definition on html div
      resultContainer.style.boxShadow = '0px 0px 5px 1px skyblue'
      resultContainer.innerText = receivedDefinition
      // document.createElement("p");
    }
  }
  getResult()
}

// Get and set words in local storage
function setWordsToLocalStorage (currentSearch) {
  localStorage.setItem('')
}

function getWordsFromLocalStorage () {}

function deleteWordsFromLocalStorage () {}

// -------------------------------------------------
