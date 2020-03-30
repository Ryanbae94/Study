const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";



let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;//지워야 할 li
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function filterFn(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //자바는 로컬스토리지에 string으로 저장하기 때문에 json을 통해 obj를 string화 해서 저장해줌
}

function paintToDo(text){ 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);//클릭 시 delete
    span.innerText = text;
    li.appendChild(delBtn); //자식 element로 추가
    li.appendChild(span); 
    li.id = newId; //li를 지웠을 때 어떤 li를 지울지 알기 위해 id 할당
    toDoList.appendChild(li);
    const toDoObj = { 
        text: text,
        id: newId
    };
    toDos.push(toDoObj);// toDos array안에 toDoObj를 넣어줌
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); // paintToDo 실행
    toDoInput.value = ""; //제출 후 폼을 초기화
}

function loadToDos(){// Todos를 가져와서 obj를 자바스크립트로 변환하고 각각에 대해 paintToDo 실행
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);//loadedToDos를 해석해서 표현
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();