// model
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

  return dataFiltre;
}

const getSearchAvanceInfos = ()=>{
  const tagUl = document.querySelectorAll('.filtre_category_tagsSelected');
  const tag = [...tagUl].reduce((acc,ul)=>{
    const category = ul.getAttribute('data-category');
    const tagLi = ul.querySelectorAll('.filtre_category_tagSelected');
    console.log(tagLi);
    const option = [...tagLi].reduce((acc, li)=>{
      if(!acc.includes(li.textContent)){
        acc= [...acc,li.textContent];
      }
       return acc}
      ,[]);
    acc = {...acc,[category]:option};
    return acc
    },{});
  return {...tag};
}

const updateNbrTotalResults = (data)=>{
  const div = document.querySelector('.filtre_nbrRecettes');
  div.innerHTML = `${data.length} recettes`;
}

// vue

const displaySearchBarPrincipale = ()=>{
  const searchBarObj = new SearchBarFactory();
  const searchBarPrincipale = searchBarObj.createSearchBar();
  searchBarPrincipale.classList.add('searchBar-principale');
  searchBarPrincipale.querySelector('.searchBar_searchIcon').classList.add('searchBar_searchIcon-principale');
  searchBarPrincipale.querySelector('.searchBar_xClose').classList.add('searchBar_xClose-principale');
  const inputEle =   searchBarPrincipale.querySelector('.searchBar_input');
  inputEle.setAttribute('placeholder','Rechercher une recette, un ingrédient...');
  inputEle.setAttribute('id','inputSearchPrincipale');

  const searchPrincipale = document.querySelector('.header_search');
  searchPrincipale.appendChild(searchBarPrincipale);
}

const displayFiltre =(dataFiltre)=>{
  const category = Object.keys(dataFiltre);
  const options = dataFiltre[category];

  const filtreSection = document.querySelector('.filtre_section');
  const filtreCategory = document.createElement('div');
  filtreCategory.classList.add( 'filtre_category');
  const div = document.createElement('div');
  div.classList.add('col-sm-9','col-md-6','col-lg-4','col-xl-3');

  div.appendChild(filtreCategory);
  // caterogy
  const nameCategory = document.createElement('div');
  nameCategory.classList.add('filtre_category_name')
  nameCategory.innerHTML =`${category} <span><i class="fa-solid fa-chevron-down"></i></span>`;

  // search
  const searchBarObj = new SearchBarFactory();
  const searchBarFiltre = searchBarObj.createSearchBar();
  const searchFiltre = document.createElement('div');
  searchFiltre.classList.add('filtre_category_search');
  searchFiltre.appendChild(searchBarFiltre);

  // options
  const optionsEle = document.createElement('ul');
  optionsEle.classList.add('filtre_category_options');


  options.forEach((element) => {
    const liOption = document.createElement('li');
    liOption.setAttribute('data-selected',false);
    liOption.classList.add('filtre_category_option');
    liOption.innerHTML= `${element}`;
    optionsEle.appendChild(liOption);
  });
  const divSticky = document.createElement('div');
  divSticky.classList.add('filtre_category_sticky');


  // tag 
  const tagEles = document.createElement('ul');
  tagEles.classList.add('filtre_category_tagsSelected');
  tagEles.setAttribute('data-category',category);

  divSticky.appendChild(nameCategory);
  divSticky.appendChild(searchFiltre);
  filtreCategory.appendChild(divSticky);
  filtreCategory.appendChild(optionsEle);
  filtreCategory.appendChild(tagEles);
  filtreSection.appendChild(div);
}

const displayRecettes = (recipes)=>{
  const container = document.querySelector('.recettes');
  container.innerHTML='';
  recipes.forEach((recette)=>{
    const div = document.createElement('div');
    div.classList.add('col-sm-6','col-md-4');
    const recetteObj = new RecetteFactory(recette);
    const recetteCard = recetteObj.createRecetteCard();
    div.appendChild(recetteCard);
    container.appendChild(div);
  });
}


// control

const resetFiltre = (recipes)=>{
  const filtreSection = document.querySelector('.filtre_section');
  filtreSection.innerHTML='';
  const data = getDataForFiltre(recipes);
  data.forEach(category=>displayFiltre(category));
}

const updateResults = (results)=>{
    // resetFiltre(results);
    displayRecettes(results);
    updateNbrTotalResults(results);
}

const doSearch = ()=>{
  const data = recipes;
  const infosPrincipale = document.querySelector('#inputSearchPrincipale').value;
  const infosDetails = getSearchAvanceInfos();
  let newData;
  if(infosPrincipale.length>=3){
    newData = fetch(infosPrincipale,infosDetails,data);
  }else{
    newData = fetch('',infosDetails,data);
  }
  updateResults(newData);
}


const searchPrincipale = ()=>{
  const inputSearchPrincipale = document.querySelector('#inputSearchPrincipale');
  inputSearchPrincipale.addEventListener('input',(event)=>{
    const inputValue = event.target.value;
    doSearch();
  });

}



const init = ()=>{
  displaySearchBarPrincipale();
  resetFiltre(recipes);
  displayRecettes(recipes);
  updateNbrTotalResults(recipes);
  const filtreNode = document.querySelector('.filtre_section');
  const FiltreObj = new FiltreGestion(filtreNode);
  searchPrincipale();
}


init();



