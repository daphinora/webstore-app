const url = "http://localhost:3000/items"

document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(rsp => rsp.json())
    .then(json => console.log(json))
})