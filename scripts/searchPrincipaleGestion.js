class SearchPrincipaleGestion {
  constructor(domNode){
    this.searchBar = domNode;
    this.inputSearch= domNode.querySelector('input');
    this.xClose = domNode.querySelector('.searchBar_xClose-principale');
    this.inputSearch.addEventListener('focus',this.onFocusInput);
    this.xClose.addEventListener('click',this.onClickXClose);
    // this.searchBar.addEventListener('focusout',this.outFocusSearchBar);
  }
  onFocusInput = ()=>{
    this.xClose.style.display="block";
  }

  onClickXClose = ()=>{
    this.inputSearch.value = '';
    search();
    this.inputSearch.focus();
  }
  
  outFocusSearchBar = ()=>{
    console.log(document.activeElement);
    if(document.activeElement===this.inputSearch){
      this.xClose.style.display = "block";
    }
  }
}

const node = document.querySelector('.searchBar-principale');
const nodeObj = new SearchPrincipaleGestion(node);