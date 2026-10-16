const form = document.querySelector("form");
const cbtn = document.querySelector(".c-btn")
const containerAuswahl = document.querySelector(".c-auswahl")



form.addEventListener("click", (event) => {
    event.preventDefault()
})

async function loadMealsCategoriesButtons() {
    try {
        const repsponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        const data = await repsponse.json()
        renderCategories(data.meals)
    } catch (e) {
        console.error("Fehler beim Laden: ", error)
    }
}

async function renderCategories(categories) {
    if (!categories || !cbtn) return;
    for (const item of categories) {
        const newBtn = document.createElement("button")
        newBtn.className = "food"
        newBtn.textContent = item.strCategory
        cbtn.append(newBtn)
    }
}
loadMealsCategoriesButtons()



async function twentyFiveGerichte() {
    const object = {}
    try {
        for (let i = 1; i < 26; i++) {
            const repsponse = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            const data = await repsponse.json()
            object[`Gericht${i}`] = data
        }
    }catch(e){
        console.log("Error: ", e)
    }
    const keyss = Object.keys(object)

    for(let j = 0; j < keyss.length; j++){
        const aktuellerKey = keyss[j]
        const gerichtDaten = object[aktuellerKey];

        const meal = gerichtDaten?.meals?.[0]
        if(!meal) continue

        const box = document.createElement("div")
        const newPic = document.createElement("div")
        const newBoxName = document.createElement("div")
        const newBoxDetails = document.createElement("div")
        const bild = document.createElement("img")
        const nameSpan = document.createElement("span")
        const sorte = document.createElement("span")
        const herkunft = document.createElement("span")
        
        box.className = "box"
        newPic.className = "box-pic"
        newBoxName.className = "box-name"
        newBoxDetails.className = "box-details"
        nameSpan.className = "name-span"
        sorte.className= "sorte"
        herkunft.className = "herkunft"

        bild.src = meal.strMealThumb
        bild.alt = meal.strMeal
        nameSpan.textContent = meal.strMeal
        sorte.textContent = meal.strCategory
        herkunft.textContent = meal.strCountry

        newPic.append(bild)
        newBoxName.append(nameSpan)
        newBoxDetails.append(sorte, herkunft)
        
        box.append(newPic, newBoxName, newBoxDetails)

        containerAuswahl.append(box)
        
        console.log(`Index ${j} Key: ${aktuellerKey} wertnummer ${gerichtDaten.meals[0].strCategory}`);
    }
    
    
}

twentyFiveGerichte()