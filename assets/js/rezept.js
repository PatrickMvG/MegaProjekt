const surprise = document.querySelectorAll(".surprise")
const containerMain = document.querySelector("main")


if (window.location.pathname.includes("details.html")) {
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get("lookup.php?id");
    const isRandom = params.get("random");

    if (mealId) {
        // Hier rufst du deine Funktion für das konkrete Gericht auf:
        loadMealById(mealId);
    } else if (isRandom) {
        // Überraschungs-Rezept laden:
        surpriseMeal();
    }
}




async function surpriseMeal() {
    let data
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        data = await response.json()
    } catch (e) {
        console.log("Error: ", e)
        return
    }
    containerMain.innerHTML = ""
    const meal = data.meals[0]

    const bild = document.createElement("div")
    const aBild = document.createElement("a")
    const cRezept = document.createElement("div")
    const rBild = document.createElement("div")
    const imgBild = document.createElement("img")
    const rHerkunft = document.createElement("div")
    const span = document.createElement("span")
    const rName = document.createElement("div")
    const aName = document.createElement("a")
    const rZutaten = document.createElement("div")
    const zutaten = document.createElement("div")
    const rZText = document.createElement("div")
    const zubereitung = document.createElement("div")
    const rZubereitung = document.createElement("div")

    bild.className = "back"
    aBild.className = "a-back"
    cRezept.className = "c-rezept"
    rBild.className = "r-bild"
    imgBild.className = "img-bild"
    rHerkunft.className = "r-herkunft"
    span.className = "span-herkunft"
    rName.className = "r-name"
    aName.className = "r-you"
    rZutaten.className = "r-zutaten"
    zutaten.className = "zutaten"
    rZText.className = "rZText"
    zubereitung.className = "zubereitung"
    rZubereitung.className = "r-zubereitung"

    aBild.href = "index.html"
    aBild.textContent = "← Zurück zur Hauptseite"
    bild.append(aBild)

    imgBild.src = meal.strMealThumb
    imgBild.alt = meal.strMeal
    rBild.append(imgBild)

    rHerkunft.textContent = `${meal.strCategory || ""} .`
    span.textContent = meal.strArea || ""
    rHerkunft.append(span)

    rName.textContent = meal.strMeal
    if (meal.strYoutube) {
        aName.href = meal.strYoutube
        aName.target = "_blank"
        aName.textContent = "▶ Video Anleitung"
    }
    zutaten.textContent = "Zutaten"
    rZText.textContent = "Tippe zum Abhaken beim Kochen"
    rZutaten.append(zutaten, rZText)


    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (!ingredient || ingredient.trim() === "")
            continue

        const divCheck = document.createElement("div")
        const check = document.createElement("input")
        const spanCheck = document.createElement("span")

        check.type = "checkbox"
        check.className = "r-checkbox"
        spanCheck.className = "c-span"
        spanCheck.textContent = ingredient + " " + measure

        divCheck.append(check, spanCheck)
        rZutaten.append(divCheck)
    }

    zubereitung.textContent = "Zubereitung"
    rZutaten.append(zubereitung, rZubereitung)


    const instructions = data.meals[0].strInstructions
    const steps = instructions
        .split(/(?:\r?\n){2,}/)
        .map(step => step.trim())
        .filter(step => step.length > 0);

    for (let i = 0; i < steps.length; i++) {
        const zZahl = document.createElement("div")
        const zText = document.createElement("div")

        zZahl.className = "zubereitung-zahl"
        zText.className = "zubereitung-text"

        zZahl.textContent = i + 1
        zText.textContent = steps[i]
        rZubereitung.append(zZahl, zText)
    }
    cRezept.append(rBild, rHerkunft, rName)
    if (meal.strYoutube)
        cRezept.append(aName)
    cRezept.append(rZutaten)

    containerMain.append(bild, cRezept)
}


async function loadMealById(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    containerMain.innerHTML = ""
    const meal = data.meals[0]

    const bild = document.createElement("div")
    const aBild = document.createElement("a")
    const cRezept = document.createElement("div")
    const rBild = document.createElement("div")
    const imgBild = document.createElement("img")
    const rHerkunft = document.createElement("div")
    const span = document.createElement("span")
    const rName = document.createElement("div")
    const aName = document.createElement("a")
    const rZutaten = document.createElement("div")
    const zutaten = document.createElement("div")
    const rZText = document.createElement("div")
    const zubereitung = document.createElement("div")
    const rZubereitung = document.createElement("div")

    bild.className = "back"
    aBild.className = "a-back"
    cRezept.className = "c-rezept"
    rBild.className = "r-bild"
    imgBild.className = "img-bild"
    rHerkunft.className = "r-herkunft"
    span.className = "span-herkunft"
    rName.className = "r-name"
    aName.className = "r-you"
    rZutaten.className = "r-zutaten"
    zutaten.className = "zutaten"
    rZText.className = "rZText"
    zubereitung.className = "zubereitung"
    rZubereitung.className = "r-zubereitung"

    aBild.href = "index.html"
    aBild.textContent = "← Zurück zur Hauptseite"
    bild.append(aBild)

    imgBild.src = meal.strMealThumb
    imgBild.alt = meal.strMeal
    rBild.append(imgBild)

    rHerkunft.textContent = `${meal.strCategory || ""} .`
    span.textContent = meal.strArea || ""
    rHerkunft.append(span)

    rName.textContent = meal.strMeal
    if (meal.strYoutube) {
        aName.href = meal.strYoutube
        aName.target = "_blank"
        aName.textContent = "▶ Video Anleitung"
    }
    zutaten.textContent = "Zutaten"
    rZText.textContent = "Tippe zum Abhaken beim Kochen"
    rZutaten.append(zutaten, rZText)


    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (!ingredient || ingredient.trim() === "")
            continue

        const divCheck = document.createElement("div")
        const check = document.createElement("input")
        const spanCheck = document.createElement("span")

        check.type = "checkbox"
        check.className = "r-checkbox"
        spanCheck.className = "c-span"
        spanCheck.textContent = ingredient + " " + measure

        divCheck.append(check, spanCheck)
        rZutaten.append(divCheck)
    }

    zubereitung.textContent = "Zubereitung"
    rZutaten.append(zubereitung, rZubereitung)


    const instructions = data.meals[0].strInstructions
    const steps = instructions
        .split(/(?:\r?\n){2,}/)
        .map(step => step.trim())
        .filter(step => step.length > 0);

    for (let i = 0; i < steps.length; i++) {
        const zZahl = document.createElement("div")
        const zText = document.createElement("div")

        zZahl.className = "zubereitung-zahl"
        zText.className = "zubereitung-text"

        zZahl.textContent = i + 1
        zText.textContent = steps[i]
        rZubereitung.append(zZahl, zText)
    }
    cRezept.append(rBild, rHerkunft, rName)
    if (meal.strYoutube)
        cRezept.append(aName)
    cRezept.append(rZutaten)

    containerMain.append(bild, cRezept)
}

