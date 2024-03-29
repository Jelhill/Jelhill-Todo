function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//Initial Page Load Render
let ourHTML = items.map((item) => itemTemplate(item)).join("");

document.getElementById("item-list").insertAdjacentHTML('beforeend', ourHTML)

//Create feature
let createField = document.getElementById('create-field')

document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/create-item', {text: createField.value})
        .then((response) => {
            document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
            createField.value = "";
            createField.focus();
        })
        .catch(() => console.log("Unable to delete"));
})
        
document.addEventListener("click", (e) => {
    //Delete feature
    if (e.target.classList.contains("delete-me")) {
        if(confirm("Are you sure you want to delete this?")){
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")})
            .then(() => e.target.parentElement.parentElement.remove())
            .catch(() => console.log("Unable to delete"));
        }
    }   

    //Update Feature
    if(e.target.classList.contains('edit-me')){
        let userEditedInput = prompt("Enter your desired change", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(userEditedInput){
            axios.post('/update-item', {text: userEditedInput, id: e.target.getAttribute('data-id')})
            .then(() => e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userEditedInput)
            .catch(() => console.log("Error, cannot edit"))
        }
    }
})        