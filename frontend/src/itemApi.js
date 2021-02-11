// handle all fetch requests for the items 

class ItemApi {

    constructor(port){
        this.baseUrl = `${port}/items`
    }
        

    getItems(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then( json => {
            json["data"].forEach(element => {
                const i = new Item({id: element.id, ...element.attributes})
                i.attachToDom()
            })
        })
    }

    createItem(){
        const itemInfo = {
            price:  priceInput.value,
            name: nameInput.value,
            description: descriptionInput.value
       }
    
       const configObj = {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
           },
           body: JSON.stringify(itemInfo)
       }
      
       // pessimistic rendering 
       fetch(this.baseUrl, configObj)
        // .then(r => r.json())
        // .then(json => {
        //     // renderItem(json.data)
        //     const i = new Item({id: json.data.id, ...json.data.attributes})
        //     i.attachToDom()
        // })
    }

    sendPatch = (item) => {
        debugger
        let {price, name, description} = item
        const itemInfo = {
            price,
            name,
            description
        }

        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(itemInfo)
        }
       
        fetch(`${this.baseUrl}/${item.id}`, configObj)
        .then(r => r.json())
        .then(json => {
            // we are optomistically rendering here since we don't use the json response
            item.render()
        })
    }

    deleteItem = (id) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
        
        fetch(`${this.baseUrl}/${id}`, configObj)
            // .then(r => r.json())
            // .then(json => alert(json.message))
    }
}

