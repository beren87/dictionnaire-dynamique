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

/* ÉTAPE 4 : Afficher les informations de mon mot sur ma page */
const renderToHTML = (data) => {
    const card = document.querySelector('.js-card')
    card.classList.remove('card--hidden')

    // Manipulation de textes avec la propriété textContent
    const title = document.querySelector(".js-card-title")
    title.textContent = data.word
    const phonetic = document.querySelector(".js-card-phonetic")
    phonetic.textContent = data.phonetic
    
    // Création d'élements HTML dynamiques
    const list = document.querySelector('.js-card-list')
    list.innerHTML = ""
    for(let i = 0; i < data.meanings.length; i++) {
        const meaning = data.meanings[i]
        const partOfSpeech = meaning.partOfSpeech
        const definition = meaning.definitions[0].definition

    // La création d'élements 
        const li = document.createElement('li')
        li.classList.add('card__meaning')
        const pPartOfSpeech = document.createElement('p')
        pPartOfSpeech.textContent = partOfSpeech
        pPartOfSpeech.classList.add('card__part-of-speech')
        const pDefinition = document.createElement('p')
        pDefinition.textContent = definition
        pDefinition.classList.add('card__definition')
        
        li.appendChild(pPartOfSpeech)
        li.appendChild(pDefinition)
        list.appendChild(li)
    }

    // Ajout de l'audio en JS
    const button = document.querySelector('.js-card-button')
    const audio = new Audio(data.pronoun)
    button.addEventListener('click', () => {
        button.classList.remove("card__player--off")
        button.classList.add("card__player--on")
        audio.play()
    })
    audio.addEventListener('ended', () => {
        button.classList.remove("card__player--on")
        button.classList.add("card__player--off")
    })
}


// LANCEMENT DU PROGRAMME
watchSubmit()
