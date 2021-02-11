// build out an Item class


// the html we want to put on the dom for each item 
// attach event listeners particular to each item 

class Item{

    static all = []
    static container = document.getElementById('item-list')

    constructor({id, name, description, price, category_id}){
        // setting the properties of each item
        this.name = name 
        this.price = price 
        this.description = description
        this.id = id 
        this.category_id = category_id

        // setup the html element that will contain the item
        this.element = document.createElement('li')
        this.element.dataset["id"] = id
        this.element.id = `item-${id}`
        
        this.element.addEventListener('click', this.handleLiClick)

        // remembering all the items 
        Item.all.push(this)
    }

    // arrow function b/c it is used as a callback in an event listener
    handleLiClick = (e) => {
        if(e.target.innerText === "Edit"){
            e.target.innerText = "Save"
            this.createEditFields(e.target)
        } else if (e.target.innerText === "Delete"){
            this.deleteItem(e)
        } else if(e.target.innerText === "Save"){
            e.target.innerText = "Edit"
            // save this info to the DB
            // turn all input fields back into spans
            this.saveUpdatedItem()
        }
    }

    createEditFields = (editBtn) =>{
        const li = this.element
        const div = this.element.querySelector('div')
    
        for(const e of div.children){
            let inputValue = e.innerText
            let name = e.classList[0]
            e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`
        }
    }

    deleteItem = (e) => {
        itemApi.deleteItem(this.id)
    }

    saveUpdatedItem = () => {
        this.price = this.element.querySelector(".edit-price").value
        this.name = this.element.querySelector(".edit-name").value
        this.description = this.element.querySelector(".edit-description").value
    
       itemApi.sendPatch(this)
    }

    render(){
        this.element.innerHTML = `
            <div data-id="${this.id}">
                $<span class="price">${this.price}</span>
                <strong class="name">${this.name}</strong>:
                <span class="description">${this.description}</span> 
            </div>
            <button class="edit" data-id="${this.id}">Edit</button>
            <button class="delete" data-id="${this.id}">Delete</button>
        `
        return this.element
    }

    attachToDom(){
        this.render()
        Item.container.appendChild(this.element)
        // Item.container.appendChild(this.render())

        // adding the event listener could be placed here instead of the constructor function
    }

    
    
    
   
}