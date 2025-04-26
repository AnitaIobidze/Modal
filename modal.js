const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");
const modalBtn = document.getElementById("modalBtn");
const modalTitle=document.getElementById("modalTitle")
let editingProductId=null
const closeModal = () => {
  productModal.style.display = "none";
  clearInputs();
};
const clearInputs = () => {
  productName.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productImage.value = "";
};
createProductBtn.addEventListener("click", function () {
  productModal.style.display = "flex";
  modalBtn.textContent="Create Product"
  modalTitle.textContent="Creating new product"
  editingProductId=null
});
closeModalBtn.addEventListener("click", function () {
  closeModal();
});
modalBtn.addEventListener("click", async function () {
  const nameValue = productName.value;
  const priceValue = productPrice.value;
  const descriptionValue = productDescription.value;
  const imageValue = productImage.value;
  if (nameValue && priceValue && descriptionValue && imageValue) {
    const dataToSend = {
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
      image: imageValue,
    };
    if (editingProductId===null){
        await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: { "Content-Type": "application/json" },
          });
          displayProducts();
          closeModal();
    }else{
        await fetch(`http://localhost:3000/api/products/${editingProductId}`, {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: { "Content-Type": "application/json" },
          });
          displayProducts();
          closeModal();
    }
  } else {
    alert("Please fill all the inputs");
  }
});
const displayProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product");
    productItem.innerHTML = `
      <img src="${product.image}" />
      <p>${product.name}</p>
      <p>${product.description}</p>
      <p>${product.price}</p>
      <div>
        <button onClick="editProduct('${product.id}')">Edit</button>
        <button onClick="deleteProduct('${product.id}')">Delete</button>
      </div>
    `;
    productsContainer.appendChild(productItem);
  });
};
const deleteProduct=async(id)=>{
    console.log("user wants to delete: id")
    const response=await fetch(`http://localhost:3000/api/products/${id}`,{
        method:"DELETE"
    })
    displayProducts()
}
const editProduct=async(id)=>{
    const response=await fetch(`http://localhost:3000/api/products/${id}`,{
        method:"GET"
    })
    const product=await response.json()
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value =product.price;
    productImage.value =product.image;
    productModal.style.display = "flex";
    modalBtn.textContent="Edit Product"
    editingProductId=id
}
displayProducts();