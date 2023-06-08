class RecetteFactory {
  constructor(recipe){
    this.name = recipe.name;
    this.time = recipe.time;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.description = recipe.description;
    this.imageSource = `assets/${this.image}`;
  }

  createRecetteCard = ()=>{
    const cardDomNode = document.createElement('div');
    cardDomNode.classList.add('recetteCard');
    const image =  document.createElement('img');
    image.classList.add('recetteCard_photo');
    image.setAttribute('alt',this.name);
    image.setAttribute('src',this.imageSource);
    const title = document.createElement('h2');
    title.classList.add('recetteCard_title');
    title.innerHTML=this.name;
    const description = document.createElement('div');
    description.classList.add('recetteCard_description');
    description.innerHTML=`<h3>recette</h3> <p>${this.description}</p>`;
    const ingredient = document.createElement('div');
    ingredient.classList.add('recetteCard_ingredients');
    ingredient.innerHTML=`<h3>Ingrédients</h3> <ul> ${this.ingredients.reduce((acc,ele)=>{acc = `${acc} <li>${ele.ingredient} <br><span>${((ele)=>ele.quantity ?? ``)(ele)}${((ele)=>ele.unit ?? ``)(ele)}</span></li>`; return acc;},``)} </ul>`;


    cardDomNode.appendChild(image);
    cardDomNode.appendChild(title);
    cardDomNode.appendChild(description);
    cardDomNode.appendChild(ingredient);

    return cardDomNode;
  }
}

