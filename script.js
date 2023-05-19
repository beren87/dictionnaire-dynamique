/* Étape #1 : Récupération d'un mot */

const form = document.querySelector("#form")  
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const wordToSearch = data.get("search")
})
