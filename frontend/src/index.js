const url = "http://localhost:3000/items";
let addItem = false;
let items;

document.addEventListener("DOMContentLoaded", () => {
    let itemsContainer;
    const newButton = document.getElementById("new-item-btn")
    const newForm = document.getElementById("add-item-form")
    const itemFormContainer = document.querySelector(".container")
    // const buyItemButton = document.querySelector(".buyButton")
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
    // buyItemButton.addEventListener("submit", buyItem)
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
    itemsContainer.innerHTML = ''
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

        // this is a fake "buy button" lol

        let buyButton = document.createElement('p')
        buyButton.innerHTML = '<input type="button" value="Buy Item" onclick="this.parentNode.parentNode.style.display=`none`; buyItem()" class="buyButton"/>'
        
        itemCard.append(title)
        itemCard.append(seller)
        itemCard.append(image)
        itemCard.append(price)
        itemCard.append(description)
        itemCard.append(buyButton)
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
        
        newItemCard.append(title)
        newItemCard.append(seller)
        newItemCard.append(image)
        newItemCard.append(price)
        newItemCard.append(description)
        itemsContainer.appendChild(newItemCard)
        items.push(itemsContainer)
        
        let addItemPatch = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target.name.value,
                seller: event.target.seller.value,
                image: event.target.image.value,
                price: event.target.price.value,
                description: event.target.description.value
            })
        }
        
        fetch(url, addItemPatch)
        .then(rsp => rsp.json())
        .then(json => {
            fetchUrl()
        })
        
        event.target.name.value = ""
        event.target.seller.value = ""
        event.target.image.value = ""
        event.target.price.value = ""
        event.target.description.value = ""
    }

    // just cheesing it >:333
function buyItem(event) {
    console.log("learn how to delete the itemcard lololol silly goose >:3")
}