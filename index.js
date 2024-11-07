import { todo } from "./todo.js";

const getTodo = async ()=>{
  const url = `https://jsonplaceholder.typicode.com/todos`;
  
  const r = await fetch (url,{headers:{ Accept:'aplication/json'}})
  
  if (!(r.ok)) {
    alert ( "erreure dans la recherche de liste ");  
    return ;
  }
  const zqsd =await r.json();
  return (zqsd);
}

const initTodo = async ()=>{
  const todolist = await getTodo();
  let liste =[];
  for (const element of todolist) {
    const x = new todo(element.title);
    liste = [...liste , x];
  }
  return liste;
}

let liste = await initTodo(); 
console.log(liste);

let ul = document.querySelector('.list-group');
ul.innerHTML = '';
for (const element of liste) {
  ul.appendChild(element.getTask());
}
const chekit = document.querySelectorAll('.btn-outline-primary');

//all custom event 
const ondelet = new CustomEvent('delete',()=>{
  bubbles: true
  // console.log('mon evenments de supression LUL');
});

// Remplacer la partie finale du code par ceci :
const renderTodoList = (items) => {
  const ul = document.querySelector('.list-group');
  ul.innerHTML = '';
  for (const element of items) {
    
    ul.appendChild(element.getTask());
    // Attacher l'event listener après avoir ajouté l'élément au DOM
    
    const checkbox = document.querySelector(`#todo-${element.getId}`);
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        console.log(`checked listener for ${element.getId}`);
        element.setcheked();
      });
    }
  }
};

const deletItems =(items)=>{
  const ul = document.querySelectorAll('.list-group-item');
  for (const element of ul) {
    
    // element.dispatchEvent(ondelet); pour executer une evenments 
    const del =element.querySelector('i');
    del.addEventListener('delete',()=>{
      alert(`spression d'une elements`);
    });
    del.addEventListener('click',()=>{
      const input = element.querySelector('input');
      const idit = input.getAttribute('id');
      
      const id = parseInt(idit.split('-')[1]);
      console.log(`delet items ${id}`);
      del.dispatchEvent(ondelet);
      const index = liste.findIndex(item => item.getId === id);
      if (index !== -1) {
        liste.splice(index, 1);
      }
      const sIndex = items.findIndex(item => item.getId === id);
      if (index !== -1) {
        items.splice(sIndex, 1);
      }

      renderTodoList(items);
      deletItems(items);

    });
  }
};

chekit[0].addEventListener('click', () => {
  console.log('click 1');
  if (!chekit[0].classList.contains('active')) {
    chekit[0].classList.add('active');
    chekit[1].classList.remove('active');
    chekit[2].classList.remove('active');
    renderTodoList(liste);
    deletItems(liste);

  }
});

chekit[1].addEventListener('click', () => {
  console.log('click 2');
  if (!chekit[1].classList.contains('active')) {
    chekit[1].classList.add('active');
    chekit[0].classList.remove('active');
    chekit[2].classList.remove('active');
    const activeItems = liste.filter(element => !element.getcheked);
    renderTodoList(activeItems);
    deletItems(activeItems);
  }
});

chekit[2].addEventListener('click', () => {
  console.log('click 3');
  if (!chekit[2].classList.contains('active')) {
    chekit[2].classList.add('active');
    chekit[1].classList.remove('active');
    chekit[0].classList.remove('active');
    const completedItems = liste.filter(element => element.getcheked);
    renderTodoList(completedItems);
    deletItems(completedItems);

  }
});

renderTodoList(liste);
deletItems(liste);

const mainB =document.querySelector('form > button');
mainB.addEventListener('click',(event)=>{
  event.preventDefault()

  const myinput=document.querySelector(`form > input`);
  const x = myinput.value ;
  console.log(`je suis ici '${x.length}'`);
  if(x.length > 0){
    liste = [...liste,new todo(x)];
    const thisclik =document.querySelector(`.btn-group`);
    const ici = thisclik.querySelector(`.active`);
    const clickEve = new Event('click');
    
  }
});