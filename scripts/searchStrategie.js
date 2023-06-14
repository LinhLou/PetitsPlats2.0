  const getSearchInfos = ()=>{
    const inputSearchPrincipale = document.querySelector('#inputSearchPrincipale');
    const wordInput = inputSearchPrincipale.textContent;
    const tagUl = document.querySelectorAll('.filtre_category_tags');
    const tag = [...tagUl].reduce((acc,ul)=>{
      const category = ul.getAttribute('data-category');
      const tagLi = ul.querySelectorAll('li');
      const option = [...tagLi].reduce((acc, li)=>{acc= [...acc,li.textContent]; return acc},[]);
      acc = {...acc,[category]:option};
      return acc
      },{});
    return {'wordInput':wordInput,...tag};
  }

  const searchPrincipale = (searchInfos, recipes)=>{
    const {wordInput, Ingrédients, Appareils, Ustensiles} = searchInfos;

    if(wordInput.length>=3){
      const results = recipes.filter((recipe)=>{
        const name = recipe.name;
        const description = recipe.description;
        const ingre = recipe.ingredients.reduce((acc,ele)=>{acc=[...acc,ele.ingredient]; return acc},[]);
        const appli = recipe.appliance;
        const usten = recipe.ustensils;

        return (name.includes(wordInput)||description.includes(wordInput)||ingre.includes(wordInput))&&(Appareils.every(i=>appli.includes(i)))&&(Ustensiles.every(i=>usten.includes(i)))&&(Ingrédients.every(i=>ingre.includes(i)))
      })
      console.log(results);
      return results
    }
  }

  initSearch = ()=>{
    // document.querySelector('.')
    const searchInfos = getSearchInfos();
    searchPrincipale(searchInfos,recipes);
  }

  initSearch();


  //  Pour tester-------------------------------------------------------
  // const searchInfos = {
  //   wordInput:"",
  //   Ingrédients:["Pomme"],
  //   Appareils: [],
  //   Ustensiles: []
  // };
  // searchPrincipale(searchInfos,recipes);