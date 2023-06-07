// model
// console.log(recipes);
  const getDataForFiltre = (recipes)=>{
    const dataFiltre = recipes.reduce((acc,recipe)=>{
      // get ingredients
      recipe.ingredients.forEach((ele)=>{
        if(!acc[0].Ingrédients.includes(ele.ingredient)){
          acc[0].Ingrédients = [...acc[0].Ingrédients,ele.ingredient];}
      })
      //  get appliances
      if(!acc[1].Appareils.includes(recipe.appliance)){
        acc[1].Appareils=[...acc[1].Appareils,recipe.appliance];
      };
      // get ustensile
      recipe.ustensils.forEach((ustensil)=>{
        if(!acc[2].Ustensiles.includes(ustensil)){
          acc[2].Ustensiles = [...acc[2].Ustensiles,ustensil];
        };
      })
    return acc;
    },[{Ingrédients:[]},{Appareils:[]},{Ustensiles:[]}]);
    console.log(dataFiltre);
    return dataFiltre;
  }


// vue
const createSearchBar = ()=>{
  // create elements
 const searchBarEle = document.createElement('div');
  searchBarEle.classList.add('searchBar');
 const inputEle = document.createElement('input');
  inputEle.classList.add('searchBar_input');
 const xCloseEle = document.createElement('span');
  xCloseEle.classList.add('searchBar_xClose');
  xCloseEle.innerHTML=`<i class="fa-solid fa-xmark"></i>`;
 const searchIconEle = document.createElement('span');
 searchIconEle.classList.add('searchBar_searchIcon');
 searchIconEle.innerHTML=`<i class="fa-sharp fa-solid fa-magnifying-glass">`;
// display
 searchBarEle.appendChild(inputEle);
 searchBarEle.appendChild(xCloseEle);
 searchBarEle.appendChild(searchIconEle);
 return searchBarEle;
}

const displayFiltre =(dataCategory)=>{
  const category = Object.keys(dataCategory);
  const options = dataCategory[category];

  const filtreSection = document.querySelector('.filtre_section');
  const filtreCategory = document.createElement('div');
  filtreCategory.classList.add('filtre_category');
  
  // caterogy
  const nameCategory = document.createElement('div');
  nameCategory.classList.add('filtre_category_name')
  nameCategory.innerHTML =`${category} <span><i class="fa-solid fa-chevron-down"></i></span>`;

  // search
  const searchFiltre = document.createElement('div');
  searchFiltre.classList.add('filtre_category_search');
  searchFiltre.appendChild(createSearchBar());

  // options
  const optionsEle = document.createElement('ul');
  optionsEle.classList.add('filtre_category_options');

  options.forEach((element) => {
    const liOption = document.createElement('li');
    liOption.classList.add('filtre_category_option')
    liOption.innerHTML= `${element} <i class="fa-solid fa-xmark"></i>`;
    optionsEle.appendChild(liOption);
  });
  const divSticky = document.createElement('div');
  divSticky.classList.add('filtre_category_sticky');
  divSticky.appendChild(nameCategory);
  divSticky.appendChild(searchFiltre);
  filtreCategory.appendChild(divSticky);

  filtreCategory.appendChild(optionsEle);

  filtreSection.appendChild(filtreCategory);
}


const displaySearchBarPrincipale = ()=>{
  const searchBarPrincipale = createSearchBar();
  searchBarPrincipale.classList.add('searchBar-principale');
  searchBarPrincipale.querySelector('.searchBar_searchIcon').classList.add('searchBar_searchIcon-principale');
  searchBarPrincipale.querySelector('.searchBar_xClose').classList.add('searchBar_xClose-principale');
  const inputEle =   searchBarPrincipale.querySelector('.searchBar_input');
  inputEle.setAttribute('placeholder','Rechercher une recette, un ingrédient...');

  const searchPrincipale = document.querySelector('.header_search');
  searchPrincipale.appendChild(searchBarPrincipale);
}

displaySearchBarPrincipale();
const initFiltre = ()=>{
  const data = getDataForFiltre(recipes);
  data.forEach(category=>displayFiltre(category));
}

initFiltre();

// const displayRecipe=(recipes)=>{
//   const divMeal = document.createElement('div');
//   divMeal.classList.add('');
// }
// control
