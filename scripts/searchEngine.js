searchEngine = (input,infosAvance,data)=>{
  const wordInput = input;
  const {Ingrédients, Appareils, Ustensiles} = infosAvance;
  const results = data.filter((recipe)=>{
    const name = recipe.name;
    const description = recipe.description;
    const ingre = recipe.ingredients.reduce((acc,ele)=>{acc=[...acc,ele.ingredient]; return acc;},[]);
    const appli = recipe.appliance;
    const usten = recipe.ustensils;

    return (name.includes(wordInput)||description.includes(wordInput)||ingre.includes(wordInput))&&(Appareils.every(i=>appli.includes(i)))&&(Ustensiles.every(i=>usten.includes(i)))&&(Ingrédients.every(i=>ingre.includes(i)));

  });
  return results;
}
 