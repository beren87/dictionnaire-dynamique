/* Étape #1 : Récupération d'un mot */
const watchSubmit = () => {
    const form = document.querySelector("#form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const data = new FormData(form)
        const wordToSearch = data.get("search")
        apiCall(wordToSearch)
    })
}

/* Étape #2 : Envoyer un mot à l'API */
const apiCall = (word) => {
    console.log("WORD TO SEARCH", word)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
}

// Lancement du programme
watchSubmit()
