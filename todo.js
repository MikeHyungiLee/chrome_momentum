const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];


// Delete li (HTML) PART
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    //replace toDos
    toDos = cleanToDos;
    saveToDos();
}



//Local storage에 To-Do List 저장하기
function saveToDos() {
    //JavaScript에서 LocalStorage로 데이터를 저장할때, 모든 데이터를 String으로 저장하기 때문에
    //우리는 Object를 String화 시켜서 저장을 해야 Local Storage에서 저장된 데이터의 내용을 볼 수 있다.
    //JSON(JavaScript Object Notation)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    //JavaScript에서는 Local Storage에 있는 모든 데이터를 String으로 저장하려고 한다.
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();