const loadData = async () => {
  const name = document.getElementById("input").value;
  if (name == "") {
    document.getElementById(
      "div-meal"
    ).innerHTML = `<h1 class="text-nowrap mx-auto w-auto text-danger text-center  ">please input valid data</h1>`;
  } else {
    // clear value
    document.getElementById("input").value = "";
    //clear load data
    // document.getElementById("div-meal").textContent = "";

    //fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    // .then((res) => res.json())
    // .then((data) => displayData(data));
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      const data = await res.json();
      displayData(data);
    } catch (error) {
      // console.log("error in line");
      document.getElementById(
        "div-meal"
      ).innerHTML = `<h1 class="text-nowrap mx-auto w-auto text-danger text-center  ">your api url Invalid </h1>`;
    }
  }
};
const displayData = (n) => {
  //console.log(n.meals);
  const ms = n.meals;
  ms.forEach((meal) => {
    // clear load

    //console.log(meal);
    const mealss = document.getElementById("div-meal");

    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="data(${meal.idMeal})" class="   bg-light rounded-4 p-1 m-4 text-center grid justify-items-center align-items-center mx-auto">
        <h4 class="text-danger">${meal.idMeal}</h4>
          <img
            class="img my-2 mx-auto p-3"
            width="330px"
            height="330px"
            src="${meal.strMealThumb}"
            alt=""
          />
          <h4 class="text-danger">${meal.strMeal}</h4>
          
        </div>
        `;
    mealss.appendChild(div);
  });
};

const data = async (n) => {
  //console.log(n);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${n}`;
  //console.log(url);
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => tdisplayData(data));
  const res = await fetch(url);
  const data = await res.json();
  tdisplayData(data);
};
const tdisplayData = (meals) => {
  //console.log(meals);
  const meal = meals.meals;
  // clear load data
  document.getElementById("div-details").textContent = "";

  meal.forEach((meal) => {
    // console.log(m);
    const div = document.createElement("div");

    const mealss = document.getElementById("div-details");

    mealss.innerHTML = `
        <div  class="bg-light rounded-4 p-2 m-1 mb-5     justify-items-center align-items-between  ">
        <div class="d-flex gap-2 p-2 m-2">
        <div>
        <img
        class="img my-3"
        width="250px"
        height="250px"
        src="${meal.strMealThumb}"
        alt=""
      /></div>
      <div>
      <div>
        <h2 class="text-warning">${meal.strMeal}</h2>
        <h4>Ingredient List:  </h4>
      </div>
      <div>
        <ul>
          <li>${meal.strIngredient1}</li>
          <li>${meal.strIngredient2}</li>
          <li>${meal.strIngredient3}</li>
          <li>${meal.strIngredient4}</li>
          <li>${meal.strIngredient5}</li>
          <li>${meal.strIngredient6}</li>
          <li>${meal.strIngredient7}</li>
          <li>${meal.strIngredient8}</li>
        </ul>
      </div> 
    </div>
    </div>
    <div class="d-flex">
    <a class="btn btn-primary" href="${meal.strYoutube}" role="button" target="_blank"
      >Youtube</a
    >
    <a  onclick="mainAreaSHow()" " class="btn btn-primary" href="" role="button" 
      >Go Back</a
    >
    </div>
        </div>
        `;
    mealss.appendChild(div);
  });
  document.getElementById("div-meal").style.display = "none";
};

function mainAreaSHow() {
  document.getElementById("div-details").style.display = "none";
  document.getElementById("div-meal").style.display = "";
}
