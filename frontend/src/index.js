const url = "http://localhost:3000/items";
let addItem = false;
let items;

document.addEventListener("DOMContentLoaded", () => {
    let itemsContainer;
    const newButton = document.getElementById("new-item-btn")
    const newForm = document.getElementById("add-item-form")
    const itemFormContainer = document.querySelector(".container")

    fetchUrl()

    newButton.addEventListener("click", () => {
        addItem = !addItem;
        if (addItem) {
          itemFormContainer.style.display = "block";
        } else {
          itemFormContainer.style.display = "none";
        }
    });

    newForm.addEventListener("submit", addNewItem)
})

function fetchUrl() {
    fetch(url)
    .then(rsp => rsp.json())
    .then(json => {
        items = json
        displayItems()
    })
}

function displayItems() {
    itemsContainer = document.getElementById("items-container")
    // itemsContainer.innerHTML = ''
    // so if line 32 is commented out then the display function runs twice and renders the images twice.
    // if line 32 is commented in then the display function can't pull the new info from the add function.
    // lose/lose. yeay
    // why is there not a freaking .uniq i can jus throw into 
    items.forEach(item => {
        let itemCard = document.createElement('div')
        itemCard.classList.add("item-card")
        
        let title = document.createElement('h3')
        title.classList.add("title")
        title.innerText = item.name
        
        let seller = document.createElement('p')
        seller.classList.add("seller")
        seller.innerText = `Seller: ${item.seller}`
        
        let image = document.createElement('img')
        image.classList.add("image")
        image.src = item.image
        
        let price = document.createElement('p')
        price.classList.add("price")
        price.innerText = `$${item.price}`
        
        let description = document.createElement('p')
        description.classList.add("description")
        description.innerText = item.description
        
        itemCard.append(title)
        itemCard.append(seller)
        itemCard.append(image)
        itemCard.append(price)
        itemCard.append(description)
        itemsContainer.appendChild(itemCard)
    });
}

function addNewItem(event) {
    event.preventDefault()
    itemsContainer = document.getElementById("items-container")
    // itemsContainer = ""
        let newItemCard = document.createElement("div")
        newItemCard.classList.add("item-card")

        let title = document.createElement('h3')
        title.classList.add("title")
        title.innerText = event.target.name.value

        let seller = document.createElement('p')
        seller.classList.add("seller")
        seller.innerText = `Seller: ${event.target.seller.value}`

        let image = document.createElement('img')
        image.classList.add("image")
        image.src = event.target.image.value

        let price = document.createElement('p')
        price.classList.add("price")
        price.innerText = `$${event.target.price.value}`

        let description = document.createElement('p')
        description.classList.add("description")
        description.innerText = event.target.description.value

        event.target.name.value = ""
        event.target.seller.value = ""
        event.target.image.value = ""
        event.target.price.value = ""
        event.target.description.value = ""
        
        newItemCard.append(title)
        newItemCard.append(seller)
        newItemCard.append(image)
        newItemCard.append(price)
        newItemCard.append(description)
    itemsContainer.appendChild(newItemCard)
    items.push(itemsContainer)
    
    let addItemPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({items})
    }
    
    fetch(url, addItemPatch)
    .then(rsp => rsp.json())
    .then(json => {
        fetchUrl()
    })
}