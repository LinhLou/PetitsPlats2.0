class FiltreGestion {
  constructor(domNode) {
    this.FiltreSection = domNode;
    this.filtreCategory = domNode.querySelectorAll('.filtre_category');
    this.inputSearch = [...this.filtreCategory].reduce((acc, ele) => {
      acc = [...acc, ele.querySelector('input')];
      return acc;
    }, []);

    this.xCloseSearch = [...this.filtreCategory].reduce((acc, ele) => {
      acc = [...acc, ele.querySelector('.searchBar_xClose')];
      return acc;
    }, []);

    this.tagSelectedUL = [...domNode.querySelectorAll('.filtre_category_tagsSelected')];

    // event to toggle filter
    this.FiltreSection.addEventListener(('click'), (event) => this.onClickToggleFiltre(event));

    // event to manager input
    this.inputSearch.forEach(ele => { ele.addEventListener('focus', (event) => { this.onFocusSearch(event); }); });

    this.inputSearch.forEach(ele => { ele.addEventListener('input', (event) => { this.onInputSearch(event); }); });

    this.xCloseSearch.forEach(ele => { ele.addEventListener('click', (event) => { this.onClickXCloseSearch(event); }); });

    // event to manager option
    this.FiltreSection.addEventListener(('click'), (event) => this.onClickOption(event));

    // event to manager selected options
    this.tagSelectedUL.forEach(ele => { ele.addEventListener('click', (event) => this.onClickTagSelected(event)); });
  }

  onClickToggleFiltre = (event) => {
    const target = event.target;
    if (target.classList.contains('filtre_category_name') || target.className.includes('fa-chevron-')) {
      const filtreCategory = target.closest('.filtre_category');

      if (!this.isOpen(filtreCategory)) {
        this.openFiltre(filtreCategory);
      } else {
        this.closeFiltre(filtreCategory);
      }
    }
  };

  onFocusSearch = (event) => {
    const xCloseEle = event.target.nextSibling;
    xCloseEle.style.display = "block";
  };

  onInputSearch = (event) => {
    const input = event.target;
    const filterCategory = input.closest('.filtre_category');
    const optionsUL = filterCategory.querySelector('.filtre_category_options');
    const optionLi = [...optionsUL.querySelectorAll('[data-selected = "false"]')];
    optionLi.forEach(ele => {
      this.filterOptions(ele, input.value);
    });
  };

  onClickXCloseSearch = (event) => {
    const xClose = event.target;
    const searchBar = xClose.closest('.searchBar');
    const filCategory = xClose.closest('.filtre_category');
    const inputEle = searchBar.querySelector('input');
    const optionsUL = filCategory.querySelector('.filtre_category_options');
    const optionsLi = [...optionsUL.querySelectorAll('[data-selected="false"]')];
    inputEle.value = '';
    inputEle.focus();
    optionsLi.forEach(ele => this.showOption(ele));
  };

  onClickOption = (event) => {
    const ele = event.target;
    if (ele.classList.contains('filtre_category_option')) {
      this.selectOption(ele);
      this.hideOption(ele);
      this.activeSelectedOption(ele);
      this.closeFiltre(ele.parentNode.parentNode);
      this.doFiltre();
    }
  };

  onClickTagSelected = (event) => {
    const target = event.target;
    if (target.classList.contains('fa-xmark')) {
      const selectedOption = target.closest('.filtre_category_tagSelected');
      const restoredOption = this.restoreOption(selectedOption);
      selectedOption.remove();
      this.unselectOption(restoredOption);
      this.showOption(restoredOption);
      this.doFiltre();
    }
  };
  doFiltre = () => {
    const data = JSON.parse(localStorage.getItem('resultSearchPrincipale'));
    const infosPrincipale = document.querySelector('#inputSearchPrincipale').value;
    const infosDetails = getSearchAvanceInfos();
    const newData = searchEngine(infosPrincipale, infosDetails, data);
    updateResults(newData);
  };


  openFiltre = (ele) => {
    ele.classList.add('filtre_category--open');
    const arrow = ele.querySelector('.filtre_category_name .fa-solid');
    const searchBar = ele.querySelector('.filtre_category_search');
    const optionsUL = ele.querySelector('.filtre_category_options');
    const tagsSelected = ele.querySelector('.filtre_category_tagsSelected');
    arrow.classList.add('fa-chevron-up');
    arrow.classList.remove('fa-chevron-down');
    searchBar.style.display = "block";
    optionsUL.style.display = "block";
    tagsSelected.style.display = "none";
    ele.setAttribute('data-etat', 'visible');
  };

  closeFiltre = (ele) => {
    ele.setAttribute('data-etat', 'invisible');
    ele.classList.remove('filtre_category--open');
    const arrow = ele.querySelector('.filtre_category_name .fa-solid');
    const searchBar = ele.querySelector('.filtre_category_search');
    const optionsUL = ele.querySelector('.filtre_category_options');
    const tagsSelected = ele.querySelector('.filtre_category_tagsSelected');
    arrow.classList.add('fa-chevron-down');
    arrow.classList.remove('fa-chevron-up');
    searchBar.style.display = "none";
    optionsUL.style.display = "none";
    tagsSelected.style.display = "block";
  };

  filterOptions = (ele, inputForFiltre) => {
    if (!ele.textContent.toUpperCase().includes(inputForFiltre.toUpperCase())) {
      this.hideOption(ele);
    } else {
      this.showOption(ele);
    }
  };

  selectOption = (ele) => {
    ele.setAttribute('data-selected', true);
  };

  unselectOption = (ele) => {
    ele.setAttribute('data-selected', false);
  };

  activeSelectedOption = (ele) => {
    const optionsUL = ele.parentNode;
    const tagsSelectedUL = optionsUL.nextSibling;
    const tagSelectedLi = document.createElement('li');
    tagSelectedLi.innerHTML = `<li class="filtre_category_tagSelected">${ele.textContent}<span><i class="fa-solid fa-xmark"></i></span></li>`;
    tagsSelectedUL.appendChild(tagSelectedLi);
  };

  restoreOption = (ele) => {
    const valueTag = ele.textContent;
    const optionUL = ele.closest('.filtre_category_tagsSelected').previousElementSibling;
    const optionLi = [...optionUL.querySelectorAll('li')];
    const optionLiRestore = optionLi.filter(e => {
      const valueOption = e.textContent;
      return valueTag.includes(valueOption);
    });
    return optionLiRestore[0];
  };

  isOpen = (ele) => {
    if (ele.getAttribute('data-etat') === "visible") {
      return true;
    } else {
      return false;
    }
  };


  showOption = (ele) => {
    ele.style.display = "flex";
  };

  hideOption = (ele) => {
    ele.style.display = "none";
  };

}

