import { menuData } from '../data.js'

const renderMenu = document.getElementById('renderMenu')
const renderOrder = document.getElementById('renderOrder')
const orderBtn = document.getElementById('orderBtn')
const renderTotal = document.getElementById('renderTotal')
const removeBtn = document.getElementById('removeBtn')
const modalBox = document.getElementById('modalBox')
const modalPayBtn = document.getElementById('modal-pay-btn')

const foodOrderArray = []
 


function render() {
    menuData.forEach((item) => {
        
        renderMenu.innerHTML += `
    
        <div class="post flex items-center justify-between m-4 p-4 gap-16">
            <div>
              <img src=${item.image} class="icon">
            </div>
            <div class="flex-col smytheDark">
              <p class="text-3xl">${item.name}</p>
              <p class="text-lg text-gray-600">${item.description}</p>
              <p class="text-2xl">$${item.price}</p>
            </div>
            <div class="flex justify-items-end">
              <img src="images/addbtn.png" class="h-12 w-12 cursor-pointer hover:bg-red-200" data-add="${item.uuid}">
            </div>
        </div>
    `  
    })
}


function handleClick(foodId) {
    const targetFoodObj = menuData.filter((food) => {
        return food.uuid === foodId
    })[0]
// console.log(targetFoodObj)
renderOrder.classList.remove('hidden')
orderBtn.classList.remove('hidden')
renderTotal.classList.remove('hidden')
renderOrder.innerHTML = ''

foodOrderArray.push({
    name: targetFoodObj.name,
    price: targetFoodObj.price,
    uuid: targetFoodObj.uuid
})

foodOrderArray.forEach((food) => {
    renderOrder.innerHTML += `
    <div class="smytheDark text-4xl flex items-center justify-between m-4 p-4 gap-16">
        <p>${food.name} $${food.price}</p> <button data-remove=${food.uuid} class="text-gray-500 text-xl border-none">remove</button>
    </div>
    `
    })

    
    let sum = 0

    foodOrderArray.forEach((order) => {
        sum += order.price
    })

    
    

    renderTotal.innerHTML = `
    <div class="post"></div>
    <p>Total Price: $${sum}</p>
    `
}  


function deleteOrder(foodId) {
    const targetFoodObj = foodOrderArray.filter((food) => {
        return food.uuid === foodId
    })[0]
 
    for(let i = 0; i < foodOrderArray.length; i++) {
        if (foodOrderArray[i] === targetFoodObj) {
            foodOrderArray.splice(i, 1)
        }
    }

    
    renderOrder.innerHTML = ''
    foodOrderArray.forEach((food) => {
        renderOrder.innerHTML += `
        <div class="smytheDark text-4xl flex items-center justify-between m-4 p-4 gap-16">
            <p>${food.name} $${food.price}</p> <button data-remove=${food.uuid} class="text-gray-500 text-xl border-none">remove</button>
        </div>
        `
     
        
       
    let sum = 0
    foodOrderArray.forEach((order) => {
        sum += order.price
    })
    
   

 
    renderTotal.innerHTML = `
    <div class="post"></div>
    <p>Total Price: $${sum}</p>
    `


        })

}


function finalMessage() {
    renderTotal.innerHTML += `<h1 class="w-full h-32 bg-green-300 text-black text-4xl ml-4 p-4 text-center">Thanks for ordering!</h1>`
}
    

    

document.addEventListener('click', (e) => {
    if(e.target.dataset.add){
        handleClick(e.target.dataset.add) 
     }

    if(e.target.dataset.remove){
       deleteOrder(e.target.dataset.remove)
    }
})

orderBtn.addEventListener('click', (order) => {
    modalBox.classList.remove('hidden')
    console.log('ordered!')
})

modalPayBtn.addEventListener('click', (submit) => {
    modalBox.classList.add('hidden')
    submit.preventDefault()
    finalMessage()
})


render()