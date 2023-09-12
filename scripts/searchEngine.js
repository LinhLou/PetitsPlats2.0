searchEngine = (input,infosAvance,data)=>{
  const wordInput = input;
  const {Ingrédients, Appareils, Ustensiles} = infosAvance;
  let results = [];
  for(let i=0; i<data.length; i++){
    const name = data[i].name;
    const description = data[i].description;
    const appli = data[i].appliance;
    const usten = data[i].ustensils;
    let ingre = [];
    for(let j=0;j<data[i].ingredients.length;j++){
      ingre = [...ingre,data[i].ingredients[j].ingredient];
    }

    let ingreValid = true;
    for(let i=0;i<Ingrédients.length;i++){
      if(!ingre.includes(Ingrédients[i])){
        ingreValid = false;
      }
    }

    let appliValid = true;
    for(let i=0;i<Appareils.length;i++){
      if(!appli.includes(Appareils[i])){
        appliValid = false;
      }
    }

    let ustenValid = true;
    for(let i=0;i<Ustensiles.length;i++){
      if(!usten.includes(Ustensiles[i])){
        ustenValid = false;
      }
    }
    if((name.includes(wordInput)||description.includes(wordInput)||ingre.includes(wordInput))&&(ingreValid)&&(appliValid)&&(ustenValid)){
      results =  [...results,data[i]];
    }
  }
  return results;
}
 