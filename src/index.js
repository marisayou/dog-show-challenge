const url = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    document.getElementById("table-body").innerHTML = ""
    return fetch(url)
    .then(resp => resp.json())
    .then(dogs => {
        for(dog of dogs) {
            insertDogInTable(dog)
        }
    })
}

function insertDogInTable(dog) {
    const tbody = document.getElementById("table-body")
    const tr = document.createElement("tr")

    const name = document.createElement("td")
    name.innerText = dog.name

    const breed = document.createElement("td")
    breed.innerText = dog.breed

    const sex = document.createElement("td")
    sex.innerText = dog.sex

    const edit = document.createElement("td")
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit Dog"
    edit.appendChild(editBtn)

    tr.appendChild(name)
    tr.appendChild(breed)
    tr.appendChild(sex)
    tr.appendChild(edit)
    tbody.appendChild(tr)

    editBtn.addEventListener("click", () => populateDogForm(dog))
}

function populateDogForm(dog) {
    const form = document.getElementById("dog-form")
    console.log(dog)
    form.children.name.value = dog.name
    form.children.breed.value = dog.breed
    form.children.sex.value = dog.sex

    form.addEventListener("submit", () => editDog(dog))
}

function editDog(dog) {
    const form = document.getElementById("dog-form")
    const name = form.children.name.value
    const breed = form.children.breed.value
    const sex = form.children.sex.value

    const dogInfo = {
        "name": name,
        "breed": breed,
        "sex": sex
    }

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dogInfo)
    }

    return fetch(url + "/" + dog.id, configObj)
    .then(resp => resp.json())
    .then(getDogs())
}