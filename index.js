
let addBtn = document.getElementById("btn");

let taskList = [];

/* function that stores the tasks in an array */
const storeInput = (input_task, input_description) => {
    let taskDetails = {
        task: input_task,
        description: input_description,
        completed: false,
    };
    taskList.push(taskDetails);
}

/* function that shows the tasks in the table */
const showTasks = (list) => {
    
    let tBody = document.getElementById("tbody")
    tBody.innerHTML = "";

    list.forEach((task, index) => {
        index++;
        let row = document.createElement("tr");
        if (task.completed) {
            row.classList.add("completed");
        }
        let countCell = document.createElement("th");
        countCell.setAttribute("scope", "row");
        countCell.textContent = index++;

        let taskCell = document.createElement("td");
        taskCell.textContent = task.task;

        let descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        let statusCell = document.createElement("td");
        let statusBtn = document.createElement("button");
        statusBtn.textContent = "Done";
        statusBtn.classList.add("btn1");
        statusBtn.setAttribute("id", "statusBtn");

        let deleteCell = document.createElement("td")
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("btn2")

        let editCell = document.createElement("td")
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("btn2")

        /* make the delete button work */
        delBtn.addEventListener("click", deleteTask);

        /* make the status button work */
        statusBtn.addEventListener("click", completeTask);

        /* make the edit button work */
        editBtn.addEventListener("click", editTask);

        editCell.appendChild(editBtn)
        statusCell.appendChild(statusBtn);
        deleteCell.appendChild(delBtn)
        row.appendChild(countCell)
        row.appendChild(taskCell)
        row.appendChild(descriptionCell)
        row.appendChild(statusCell)
        row.appendChild(deleteCell)
        row.appendChild(editCell)
        tBody.appendChild(row)
    })

}

/* function that deletes the task when deleteBtn is clicked */
const deleteTask = (e) => {
    let task_container = e.target.parentElement.parentElement;
    taskTxt = task_container.children[1].textContent;
    taskDesc = task_container.children[2].textContent;

    taskList = taskList.filter((task) => (task.task !== taskTxt || task.description !== taskDesc))

    showTasks(taskList)


}

/* function that adds a task to the table when addBtn is clicked */
addBtn.addEventListener("click", (e) => {
    let input_task = document.getElementById("input");
    let input_description = document.getElementById("description");
    if (input_task.value.trim() === "" || input_description.value.trim() === "") {
        return;
    }
    storeInput(input_task.value, input_description.value);
    input_task.value = "";
    input_description.value = "";


    showTasks(taskList);


})

/* function that marks the task as completed when the statusBtn is clicked */

const completeTask = (e) => {
    let statusBtn = e.target.parentElement.parentElement;
    statusBtn.classList.toggle("completed");
    taskList.forEach((task) => {
        if (task.task === statusBtn.children[1].textContent && task.description === statusBtn.children[2].textContent) {
            task.completed = !task.completed;
        }
    })
}

/* function that edits the task when the editBtn is clicked */
const editTask = (e) => {
    let editContainer = e.target.parentElement.parentElement;
    let taskTxt = editContainer.children[1].textContent;
    let taskDesc = editContainer.children[2].textContent;
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    input1.value = taskTxt;
    input2.value = taskDesc;
    editContainer.children[1].textContent = "";
    editContainer.children[2].textContent = "";
    editContainer.children[1].appendChild(input1);
    editContainer.children[2].appendChild(input2);

    input1.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            taskList.forEach(task => {
                if (task.task === taskTxt && task.description === taskDesc){
                    task.task = e.target.value
                    task.description = input2.value
                }
                showTasks(taskList)
            })
        }
    })
    input2.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            taskList.forEach(task => {
                if (task.task === taskTxt && task.description === taskDesc){
                    task.description = e.target.value
                    task.task = input1.value
                }
                showTasks(taskList)
            })
        }

    })

}









