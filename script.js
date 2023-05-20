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
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json()) 
        .then((data) => {
            /*  Étape #3 : Récupérer la donnée */ 
            const informationsNeeded = extractData(data[0])
            renderToHTML(informationsNeeded)
        })
        .catch((error) => {
            alert('Le mot demandé n\'existe pas')
            console.error(error)
        })
}


// Lancement du programme
watchSubmit()
