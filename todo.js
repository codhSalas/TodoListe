export class todo {
  static #compteur = 0;
  constructor(mytodo ){
    this.mytodo = mytodo;
    this.cheked = false;
    this.id = todo.#compteur++;
  }
  
  getTask(){
    const currId =`todo-${this.id}`; 
    const cloneTemp = document.querySelector('#myLiTemplates').content.cloneNode(true);
    
    const  input = cloneTemp.querySelector('input');
    input.setAttribute(`id`,currId);
    input.checked = this.cheked
    
    const lab = cloneTemp.querySelector('label');
    lab.setAttribute(`for`,currId);
    lab.innerText = this.mytodo;

    return cloneTemp;
  }
  
  get getcheked(){
    return this.cheked;
  }
  setcheked(){
    this.cheked =!this.cheked;
  }
  get getId(){
    return this.id;
  }
}