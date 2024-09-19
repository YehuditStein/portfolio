import Action from "./classes/Action.js";
import ActionManager from "./classes/ActionManager.js";

let actionM = new ActionManager();

// פונקציה ליצירת מזהה ייחודי לכל פעולה
function generateUniqueId() {
    return Math.floor(Math.random() * 100000);
}

// פונקציה לשמירת המערך בלוקאל סטורג'
function saveToLocalStorage() {
    localStorage.setItem("actions", JSON.stringify(actionM.actions));
}

// פונקציה לטעינת המערך מהלוקאל סטורג'
function loadFromLocalStorage() {
    let storedActions = localStorage.getItem("actions");
    if (storedActions) {
        actionM.actions = JSON.parse(storedActions).map(action => 
            new Action(action.type, action.description, action.amount, action.id)
        );
    }
}

// הצגת הפעולות בטבלה
function showAction() {
    document.getElementById("thead").innerHTML = "";
    for (let action of actionM.actions) {
        document.getElementById("thead").innerHTML += `<tr>
                            <td class="col-5">${action.description}</td>
                            <td class="col-5">${action.amount}</td>
                            <td class="col-1"><button onclick="updateActive(${action.id})">
                                <i class="fa-regular fa-pen-to-square text-success"></i></button></td>
                            <td class="col-1"><button onclick="deleteActive(${action.id})"><i class="fa-solid fa-trash-can text-danger"></i></button></td>
                        </tr>`;
    }
    document.getElementById("balance").innerText = actionM.balance;
}

// הוספת פעולה חדשה
window.addActive = function addActive() {
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value;
    if (description === "" || amount === "") {
        alert("missing values");
    } else {
        let action = new Action(type, description, amount, generateUniqueId()); // יצירת מזהה ייחודי
        actionM.addAction(action);
        saveToLocalStorage(); // שמירה בלוקאל סטורג'
        showAction();
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
    }
};

// עדכון פעולה קיימת
window.updateActive = function updateActive(id) {
    let newAmount = prompt("input new amount");
    actionM.updateAction(id, newAmount);
    saveToLocalStorage(); // שמירה בלוקאל סטורג'
    showAction();
};

// מחיקת פעולה
window.deleteActive = function deleteActive(id) {
    let ifDelete = confirm("Are you sure?");
    if (ifDelete) {
        actionM.deleteAction(id);
        saveToLocalStorage(); // שמירה בלוקאל סטורג'
    }
    showAction();
};

// טען את הנתונים מהלוקאל סטורג' כשהדף נטען
loadFromLocalStorage();
showAction();
