class SearchPrincipaleGestion {
  constructor(domNode, data) {
    this.data = data;
    this.searchBar = domNode;
    this.inputSearch = domNode.querySelector('#inputSearchPrincipale');
    this.xClose = domNode.querySelector('.searchBar_xClose-principale');
    this.inputSearch.addEventListener('focus', this.onFocusInput);
    this.inputSearch.addEventListener('input', (event) => this.onInput(event));
    this.xClose.addEventListener('click', this.onClickXClose);
  }
  onFocusInput = () => {
    this.xClose.style.display = "block";
  };

  onClickXClose = () => {
    this.inputSearch.value = '';
    this.search(this.inputSearch);
    this.inputSearch.focus();
  };

  outFocusSearchBar = () => {
    console.log(document.activeElement);
    if (document.activeElement === this.inputSearch) {
      this.xClose.style.display = "block";
    }
  };

  onInput = (event) => {
    this.search(event.target);
  };
  search = (element) => {

    const infosPrincipale = element.value;
    const infosDetails = getSearchAvanceInfos();
    let newData;
    if (infosPrincipale.length >= 3) {
      newData = searchEngine(infosPrincipale, infosDetails, this.data);
      const recipesForFiltre = searchEngine(infosPrincipale, { Ingrédients: [], Appareils: [], Ustensiles: [] }, this.data);
      localStorage.setItem('resultSearchPrincipale', JSON.stringify(recipesForFiltre));
    } else {
      newData = searchEngine('', infosDetails, this.data);
      localStorage.setItem('resultSearchPrincipale', JSON.stringify(this.data));
    }
    updateResults(newData);
  };
}
