let houres = document.querySelector('.houres')
let minutes  = document.querySelector('.mint')
let seconds = document.querySelector('.sec')

let start = document.querySelector('.start')
let pause = document.querySelector('.pause')
let reset = document.querySelector('.reset')
let result = document.querySelector('.result')

let hour = 0;
let minute= 0;
let second = 0;



let x;
let clicked = true;
let paused = false;
    
function increasSeconde() {
    
    second++;
        seconds.textContent = (second < 10) ? `0${second}` : second;

        
        if (seconds.textContent == 60) {
            seconds.innerHTML = "00";
            minute++;
            minutes.innerHTML = (minute < 10) ? `0${minute}` : minute;
            second = 0;

            if (minutes.textContent == 60) {
                minutes.innerHTML = "00";
                minute = 0;
                hour = hour + 1;
                houres.innerHTML = hour;

            }
        }

    }





let arr;
let saveTime = JSON.parse(localStorage.getItem("timeing"))
if (Array.isArray(saveTime)) {
    arr = saveTime
} else {
    arr=[]
}




function deleteBtn(e) {
    const deletButton = e.target;
    const idDelete = deletButton.id;
    arr = arr.filter((ar) => {
    if (ar.id === idDelete) {
        return false
    } else {
        return true
        }
    })
    render()
    saveData()
}

render() 

function render() {
    result.innerHTML = '';
    arr.forEach((a)=> {
        let elm = document.createElement("div");
        let btn = document.createElement("button");
         elm.className= "new-time"
        btn.id = a.id;
        btn.innerText = "Delete"
      

        btn.onclick = deleteBtn
        elm.innerText = a.time;
        elm.appendChild(btn);
        result.appendChild(elm);
    })
}

// Creat A new Time
function createTime(a) {
    const id = '' + new Date().getTime();
    let timePush = `${houres.textContent}  ${minutes.textContent}  ${seconds.textContent}`;
        arr.push({
            time: timePush,
            id : id
        })
    
    render() 
    saveData()
}

function saveData() {
    localStorage.setItem("timeing", JSON.stringify(arr))
}




// start function
start.addEventListener('click', () => {
    if (clicked) {
        x = setInterval(increasSeconde, 1000)
        clicked = false;
        paused = true;
    }

})

// pause function
pause.addEventListener("click", (a) => {
    if (paused) {
        clearInterval(x);
        // reset the Dom
        result.innerHTML = '';

        // create a new time
        createTime(a);
        paused = false
        clicked = true;
    }
})

    // stop timeng function
reset.addEventListener("click", () => {
    clearInterval(x);
    localStorage.removeItem("timeing");
    arr=[]
    houres.textContent  = '00';
    minutes.textContent = '00'; 
    seconds.textContent = '00';
    result.innerHTML = '';
    
    hour = 0;
    minute= 0;
    second = 0;
    
    clicked = true
    paused = false

})
