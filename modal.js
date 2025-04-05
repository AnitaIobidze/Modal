const createProductBtn=document.getElementById("createProductBtn")
const productModal=document.getElementById("productModal")
const closeModalBtn=document.getElementById("closeModalBtn")
const createPost=document.getElementById("modalBtn")
const posts=document.getElementById("posts")
const deleteBtn=document.getElementById("delete")
const edit=document.getElementById("edit")

createProductBtn.addEventListener("click", function(){
    productModal.style.display="flex"
})
closeModalBtn.addEventListener("click", function(){
    productModal.style.display="none"
})

const fetching=async()=>{
    const response=await fetch("http://localhost:3000/api/products")
    const items=await response.json()
    console.log(items)
}

const addPost=async()=>{
    const name=document.getElementById("productName").value
    const price=document.getElementById("productPrice").value
    const description=document.getElementById("productDescription").value
    const img=document.getElementById("productImage").value
    if(!name || !price || !description || !img){
        alert("Please fill the input")
    }else{
        const dataToSend={
            name: name,
            price: price,
            description:description,
            img:img
        }
        const jsonToSend=JSON.stringify(dataToSend)

        const response=await fetch("http://localhost:3000/api/products",{
            method: "POST",
            body: jsonToSend,
            headers: {"Content-Type": "application/json"}
        })

    if(response.ok){
        fetching()
    }
    }
    productModal.style.display="none"
    const div=document.createElement("div")
    div.classList.add("postsCard")
    div.innerHTML = `
    <img src="${img}"/>
    <h1>${name}</h1>
    <p class="gray">${description}</p>
    <h1 class="red">$${price}</h1>
    <div>
    <button id="edit" class="edit">Edit</button>
    <button id="delete" class="delete">Delete</button></div>`
    posts.appendChild(div)
}
fetching()
createPost.addEventListener("click", addPost)