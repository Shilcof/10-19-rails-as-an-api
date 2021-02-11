// make a fetch request to the '/items' and display items on the DOM
const port = 'http://localhost:3000'
const webSocket = 'ws://localhost:3000/cable'
const itemApi =  new ItemApi(port)
const categoryApi = new CategoryApi(port)
const list = document.getElementById('item-list')
const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
   e.preventDefault()
   itemApi.createItem()
   e.target.reset()
}


itemApi.getItems()
categoryApi.getCategories()

// sockets
const socket = new WebSocket(webSocket);

socket.onopen = function(e){
   console.log("this is on open", e)
   const message = {
      command: "subscribe",
      identifier: JSON.stringify({
         channel: "ItemChannel"
      })
   }
   console.log(JSON.stringify(message))
   socket.send(JSON.stringify(message));
}

socket.onmessage = function(e){
   const message = JSON.parse(e.data);
   if (message.type === 'ping') return
   if (!message.message) return
   if (message.message.method === "create") {
      const i = new Item(message.message.item);
      i.attachToDom()
   } else if (message.message.method === "destroy") {
      const i = Item.all.find(item=>item.id == message.message.item.id);
      i.element.remove();
      Item.all = Item.all.filter(item=>item.id != message.message.item.id);
   }
}