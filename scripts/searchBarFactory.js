class SearchBarFactory{
  createSearchBar = ()=>{
    // create elements
   const searchBarEle = document.createElement('div');
    searchBarEle.classList.add('searchBar');
   const inputEle = document.createElement('input');
    inputEle.classList.add('searchBar_input');
   const xCloseEle = document.createElement('span');
    xCloseEle.classList.add('searchBar_xClose');
    xCloseEle.innerHTML=`<i class="fa-solid fa-xmark"></i>`;
    const divIcon = document.createElement('span');
    divIcon.classList.add('searchBar_searchIcon');
    const searchIconEle = document.createElement('img');
    searchIconEle.setAttribute('src','assets/icons/Loupe_search_icon.png');
    searchIconEle.setAttribute('alt','icon recherche');
    divIcon.appendChild(searchIconEle);
  // display
   searchBarEle.appendChild(inputEle);
   searchBarEle.appendChild(xCloseEle);
   searchBarEle.appendChild(divIcon);
   return searchBarEle;
  }
}