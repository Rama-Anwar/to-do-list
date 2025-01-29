
let addBtn = document.getElementById("btn");

let taskList = [];

/* function that stores the tasks in an array */
const storeInput = (input) => {
    let taskDetails = {
        task: input
    };
    taskList.push(taskDetails);
}

/* function that shows the tasks in the table */
const showTasks = (list) => {
    
    let tBody = document.getElementById("tbody")
    tBody.innerHTML = "";

    list.forEach((task, index) => {
        index++
        let row = document.createElement("tr");
        let countCell = document.createElement("th");
        countCell.setAttribute("scope", "row");
        countCell.textContent = index++;

        let taskCell = document.createElement("td");
        taskCell.textContent = task.task;
        let deleteCell = document.createElement("td")
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("btn2")

        /* make the delete button work */
        delBtn.addEventListener("click", deleteTask);

        deleteCell.appendChild(delBtn)
        row.appendChild(countCell)
        row.appendChild(taskCell)
        row.appendChild(deleteCell)
        tBody.appendChild(row)
    })

}

/* function that deletes the task when deleteBtn is clicked */
const deleteTask = (e) => {
    let task_container = e.target.closest("tr")
    taskTxt = task_container.children[1].textContent

    taskList = taskList.filter((task) => task.task !== taskTxt)

    showTasks(taskList)


}

/* function that adds a task to the table when addBtn is clicked */
addBtn.addEventListener("click", (e) => {
    let input = document.getElementById("input");
    if (input.value.trim() === ""){
        return;
    }
    storeInput(input.value);
    input.value = "";

    showTasks(taskList);


})










