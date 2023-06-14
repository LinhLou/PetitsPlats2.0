class FiltreGestion {
  constructor(domNode){
    this.FiltreSection = domNode;
    this.filtreCategory = domNode.querySelectorAll('.filtre_category');
    this.searchFiltre = [...this.filtreCategory].reduce((acc,ele)=>{acc = [...acc,ele.querySelector('input')];
    return acc},[]);
    this.xCloseSearchBar = [...this.filtreCategory].reduce((acc,ele)=>{acc = [...acc,ele.querySelector('.searchBar_xClose')];
    return acc},[]);
    this.optionsLi = [...domNode.querySelectorAll('.filtre_category_option')];

  
    this.FiltreSection.addEventListener(('click'),(event)=>this.onClickToggleFiltre(event));

    this.searchFiltre.forEach(ele=>{ele.addEventListener('input',(event)=>{this.onInputSearch(event)})});

    this.searchFiltre.forEach(ele=>{ele.addEventListener('focus',(event)=>{this.onFocusSearch(event)})});

    this.xCloseSearchBar.forEach(ele=>{ele.addEventListener('click',(event)=>{this.onClickXCloseSearchBar(event)})});

    this.FiltreSection.addEventListener(('click'),(event)=>this.onClickControlOption(event));
  }

  onClickToggleFiltre = (event) =>{
    const ele = event.target;
    if(ele.classList.contains('filtre_category_name')||ele.className.includes('fa-chevron-')){
      const filtreCategory = ele.closest('.filtre_category');
      if(filtreCategory.getAttribute('data-visible')=="false"||!filtreCategory.hasAttribute('data-visible')){
        this.openFiltre(filtreCategory);
      }else{
        this.closeFiltre(filtreCategory);
      }
    }
  }

  onClickXCloseSearchBar = (event)=>{
    const inputEle = event.target.closest('.searchBar_xClose').previousElementSibling;
    const optionsUL = event.target.closest('.searchBar_xClose').nextElementSibling;
    inputEle.value ='';
    inputEle.focus();
    this.optionsLi.forEach(ele=>this.optionVisible(ele)); // display the beginning list execpted the option is selected
    console.log(this.optionsLi);
  }

  onFocusSearch = (event)=>{
    const target = event.target;
    const xCloseEle = target.nextSibling;
    xCloseEle.style.display = "block";
  }

  onInputSearch = (event)=>{
    const target = event.target;
    const optionsUL = target.closest('.filtre_category_sticky').nextSibling;
    const optionLi = optionsUL.querySelectorAll('.filtre_category_option--visible');
    [...optionLi].forEach(ele=>{
      this.filteredOptions(ele,target.value);
    })
  }

  onClickControlOption = (event)=>{
    const ele = event.target;
    if(ele.classList.contains('filtre_category_option')){
      this.optionSelected(ele);
      this.optionHide(ele);
      this.closeFiltre(ele.parentNode.parentNode);
      this.optionsLi = this.optionsLi.filter(e=>e!==ele);
      console.log(this.optionsLi);
    }
  }

  openFiltre = (ele)=>{
    const arrow = ele.querySelector('.filtre_category_name .fa-solid');
    const searchBar = ele.querySelector('.filtre_category_search');
    const options = ele.querySelector('.filtre_category_options');
    const tags = ele.querySelector('.filtre_category_tags');
    arrow.classList.add('fa-chevron-up');
    arrow.classList.remove('fa-chevron-down');
    searchBar.style.display = "block";
    options.style.display = "block";
    tags.style.display = "none";
    ele.classList.add('filtre_category--open');
    ele.setAttribute('data-visible',true);
  }

  filteredOptions = (ele,inputForoFiltre)=>{
    if(!ele.textContent.toUpperCase().includes(inputForoFiltre.toUpperCase())){
      this.optionHide(ele);
    }else{
      this.optionVisible(ele);
    }
  }

  closeFiltre = (ele)=>{
    const arrow = ele.querySelector('.filtre_category_name .fa-solid');
    const searchBar = ele.querySelector('.filtre_category_search');
    const options = ele.querySelector('.filtre_category_options');
    const tags = ele.querySelector('.filtre_category_tags');
    arrow.classList.add('fa-chevron-down');
    arrow.classList.remove('fa-chevron-up');
    searchBar.style.display = "none";
    options.style.display = "none";
    tags.style.display = "block";
    ele.classList.remove('filtre_category--open');
    ele.setAttribute('data-visible',false);
  }

  optionSelected = (ele)=>{
    const optionsUL = ele.parentNode;
    const tagUL = optionsUL.nextSibling;
    const tagLi = document.createElement('li');
    tagLi.innerHTML = `<li class="filtre_category_tag">${ele.textContent}<span><i class="fa-solid fa-xmark"></i> </span></li>`;
    tagUL.appendChild(tagLi);
  }
  optionVisible = (ele)=>{
    ele.classList.add('filtre_category_option--visible');
    ele.classList.remove('filtre_category_option--invisible');
  }
  optionHide = (ele)=>{
    ele.classList.add('filtre_category_option--invisible');
    ele.classList.remove('filtre_category_option--visible');
  }


}

const filtreNode = document.querySelector('.filtre_section');
const FiltreObj = new FiltreGestion(filtreNode);