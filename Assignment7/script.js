var output = document.querySelector('.output');

let title = document.querySelector('input')
let category = document.querySelector('select')
let submitButton = document.querySelector('.createTask')



submitButton.addEventListener('click', () => {
    var listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item")
    listItem.innerHTML += `<div class="task-head">
                <h1>${title.value}</h1>
                <h3>Task Status:${category.value}</h3>
                </div>
                <div>
                    <button class="btn edit">Edit</button>
                    <button class="btn del">Delete</button>
                    <button class="btn com">Complete</button>
                </div>`;
    output.append(listItem);
    title.value = "";
    category.selectedIndex = 0;
})

output.addEventListener("click",(e)=>{
if (e.target.classList.contains("del")) {
        let task = e.target.closest(".list-item");
        output.removeChild(task);
    }
})

output.addEventListener("click",(e)=>{
if (e.target.classList.contains("edit")) {
        let task = e.target.closest(".list-item");
       let taskTitle = task.querySelector("h1").textContent;
       let taskStatus = task.querySelector("h3").textContent.replace("Task Status:","").trim()
       title.value = taskTitle
       category.value = taskStatus
       task.remove();
    }
})

output.addEventListener("click",(e)=>{
    if (e.target.classList.contains("com")) {
        let task = e.target.closest(".list-item");
        task.classList.add('complete')
    }
})
//input.value                  vs                  input.getAttribute("value")
//->It aways take live ,dynamic                  ->It aways take value lies in value properties
//change value



let main = document.querySelector('main')
let btnTheme = document.querySelector('.theme')
