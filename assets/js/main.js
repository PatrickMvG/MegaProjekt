const form = document.querySelector("form");
const cbtn = document.querySelector(".c-btn")
const containerAuswahl = document.querySelector(".c-auswahl")



if (window.location.pathname.endsWith("index.html")) {
    // Falls auf index.html: Buttons & 25 Gerichte laden
    loadMealsCategoriesButtons();
    twentyFiveGerichte();
}

async function loadMealsCategoriesButtons() {
    try {
        const repsponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        const data = await repsponse.json()
        renderCategories(data.meals)
    } catch (error) {
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
        const aTag = document.createElement("a")
        
        box.className = "box"
        newPic.className = "box-pic"
        newBoxName.className = "box-name"
        newBoxDetails.className = "box-details"
        nameSpan.className = "name-span"
        sorte.className= "sorte"
        herkunft.className = "herkunft"
        aTag.className = "link"

        bild.src = meal.strMealThumb
        bild.alt = meal.strMeal
        nameSpan.textContent = meal.strMeal
        sorte.textContent = meal.strCategory
        herkunft.textContent = meal.strCountry
        aTag.href = `details.html?lookup.php?id=${gerichtDaten.meals[0].idMeal}`

        newPic.append(bild)
        newBoxName.append(nameSpan)
        newBoxDetails.append(sorte, herkunft)
        
        box.append(newPic, newBoxName, newBoxDetails)
        aTag.append(box)
        containerAuswahl.append(aTag)
        
        console.log(`Index ${j} Key: ${aktuellerKey} wertnummer ${gerichtDaten.meals[0].strCategory}`);
    }
    
    
}

twentyFiveGerichte()