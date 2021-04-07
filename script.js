  // load data from meal db
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  dataLoader = async () => {
    const loadData = await fetch(url);
    const convertToJson = await loadData.json();
    processData(convertToJson);
  };
  dataLoader();
  // find single meal
  processData = (convertToJson) => {
    const getTheMealsArray = convertToJson.meals;
    getTheMealsArray.forEach((meal) => {
      const singleMeal = meal;
      dataShower(meal);
    });
  };

  // display the food with image and name
  dataShower = (meal) => {
    // console.log(meal)
    const mealName = meal.strMeal;
    const mealPic = meal.strMealThumb;
    const ingredients = meal.strIngredient1;
    const ingredientsMeasures = meal.strMeasure1;
    const parent = document.getElementById("meals");
    const createDiv = document.createElement("div");
    createDiv.className = "m-2 ";
    const createdElements = `
          <div id="meal-homepage" class="card" style="width:11rem;">
         <img src="${mealPic}" class="card-img-top" alt="...">
         <div class="card-body bg-white">
         <h3  class="bg-transparent text-center">${mealName}</h3>
         </div>
         </div>
          `;
    createDiv.innerHTML = createdElements;
    parent.appendChild(createDiv);

    // when every food item is clicked ingredients will display
    createDiv.addEventListener("click", () => {
      const mealParent = document.getElementById("ingredients-secion");
      const createIngreditentDiv = document.createElement("div");
      createIngreditentDiv.className = "custom-ingredientsDiv-style mt-5";
      createIngreditentDiv.style.display = "block";
      const createIngredients = `
            <div id="meals-ingredients" class="card" style="width: 18rem;">
            <img src="${mealPic}" class="card-img-top" alt="...">
            <div class="card-body bg-white text-center">
              <h2 class="bg-transparent">${mealName}</h2>
              </div>
              <h4 class="text-center bg-transparent">Ingredients:</h4>
          </div>
            `;
      createIngreditentDiv.innerHTML = createIngredients;
      mealParent.appendChild(createIngreditentDiv);
      // when food ingredients will display food won't be displayed
      if (createIngreditentDiv.style.display == "block") {
        const mealSection = document.getElementById("meal-section");
        const searchSection = document.getElementById("search-seciton");
        mealSection.style.display = "none";
        searchSection.style.visibility = "hidden";
      }
      // get every meal ingradients property
      const allPropertiesofEachMeal = Object.values(meal);
      const ingredientsAndMeasures = allPropertiesofEachMeal.splice(7, 42); // take only ingradients and measures
      const onlyIngredientsNames = ingredientsAndMeasures.splice(2, 19); // take only ingradients
      const onlyMeasurements = ingredientsAndMeasures.splice(3, 22); // take only measures
      // create eqivalents numbers of li of ingredients
     
      onlyIngredientsNames.forEach((ingredients) => {
        if (ingredients != "") {
          const ingredientsList = document.createElement("ul");
          ingredientsList.className = "bg-white";
          const ingredientItems = document.createElement("li");
          ingredientItems.className = "bg-transparent";
          ingredientItems.innerText = ingredients;
          ingredientsList.appendChild(ingredientItems);
          const parent = document.getElementById("meals-ingredients");
          parent.appendChild(ingredientsList);
          // before ingredients name measurement will shown...
          onlyMeasurements.forEach((measure) => {
            if(measure!=""){
       console.log(measure)}
      });


        }
      });
      
    });
  };
