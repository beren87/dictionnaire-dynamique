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

const extractData = (data) => {
    // 1 - Mot 
    const word = data.word
    // 2 - Écriture phonétique
    const phonetic = findProp(data.phonetics, "text")
    // 3 - Prononciation (audio)
    const pronoun = findProp(data.phonetics, "audio")
    // 4 - Définition(s)
    const meanings = data.meanings

    return {
        word: word,
        phonetic: phonetic,
        pronoun: pronoun, 
        meanings: meanings
    }
}
const findProp = (array, name) => {
    // Elle parcours un tableau d'objets
    for (let i = 0; i < array.length; i++) {
        // Et cherche dans ce tableau, si l'objet en cours contient une certaines propriété
        const currentObject = array[i]
        const hasProp = currentObject.hasOwnProperty(name)
        // Alors elle renvoit cette propriété
        if (hasProp) return currentObject[name]
    }
}



// Lancement du programme
watchSubmit()
