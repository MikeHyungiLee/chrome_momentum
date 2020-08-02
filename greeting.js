// querySelector는 찾은 요소의 첫 번째 항목을 가져온다.
// querySelectorAll은 모든 요소들을 가져온다.
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// 입력한 이름을 저장하는 function
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}


//기본적으로 form 태그에서는 글자를 입력하고 enter를 입력하면 default로 설정되어있는 event속성이 같이 실행이 된다.
//event의 prevent Default를 하기 위해 다음의 function을 추가해준다.
//event가 default로 되면 거품처럼 document로 올라가서 사라지게 되기 때문에 이를 방지해야한다.
function handleSubmit(event) {
    //데이터를 입력하고 enter를 쳐도 입력한 글자는 사라지지 않고 남아 있는다.greetings
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}


function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // she is not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

// Local storage      
// localStorage.setItem("currentUser", "MikeLee");

function init() {
    loadName();
}

init();