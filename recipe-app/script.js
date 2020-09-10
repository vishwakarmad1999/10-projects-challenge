const mealContainer = document.querySelector(".meal-container")
const ul = document.querySelector("ul")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const randomBtn = document.getElementById("random-btn")
const mealInfo = document.getElementById("meal-info")

let liked = []

function getRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
        const meal = res.meals[0]
        mealContainer.innerHTML = ""
        addMeal(meal)
    })
}

function addMeal(meal) {
    const mealEl = document.createElement("div")
    mealEl.innerHTML = `
        <div class="meal">
            <img class="random-img" src="${meal.strMealThumb}" onclick="showInfo(${meal.idMeal})">
            <div class="d-flex justify-content-between">
                <h5 class="random-img-text" class="text-center text-danger">${meal.strMeal}</h5>
                <button id="like-button" onclick="handleClick(${meal.idMeal})" class="fa fa-thumbs-up like"></button>
            </div>
        </div>
    `
    mealContainer.appendChild(mealEl)
} 

function showInfo(id) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(res => res.json())
    .then(res => {
        const meal = res.meals[0]
        let ingredients = ""
        let temp = "strIngredient"

        for (let i = 1; i <= 20; i++) {
            if (meal[[temp + i]])
                ingredients += meal[[temp + i]] + ", "
        }

        const s = `
Name: ${meal.strMeal}
Ingredients: ${ingredients}
Instructions:
${meal.strInstructions}
        `
        alert(s)
    })
    .catch(message => console.log(message))
}

function handleClick(id) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(res => res.json())
    .then(res => {
        const meal = res.meals[0]
        liked.push(meal)
        updateLikedFeed()
    })
    .catch(message => console.log(message))
}

function updateLikedFeed() {
    ul.innerHTML = ""
    for (let i = 0; i < liked.length; i++) {
        let temp = document.createElement("li")
        temp.innerHTML = `
            <li>
                <img src="${liked[i].strMealThumb}" onclick="showInfo(${liked[i].idMeal})" style="cursor:pointer" alt="" />
                <p>${liked[i].strMeal}</p>
                <div align="center">
                    <button class="btn btn-danger" onclick="removeMeal(${liked[i].idMeal})">X</button>
                </div>
            </li>
        `
        ul.appendChild(temp)
    }
}

function removeMeal(id) {
    liked = liked.filter(item => {
        if (item.idMeal != id) {
            return item
        }
    })
    updateLikedFeed()
}

searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value
    if (searchTerm) {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm)
        .then(res => res.json())
        .then(res => {
            const meals = res.meals

            if (meals) {
                mealContainer.innerHTML = ""
                meals.forEach(meal => {
                    addMeal(meal)
                })
            }
        })
    }
})

randomBtn.addEventListener("click", () => {
    getRandomMeal()
})

getRandomMeal()