const btn = document.getElementById("btnInsertUpdate");
const clearBtn = document.getElementById("btnClear");
const clearAllBtn = document.getElementById("btnClearItems");
const btn = document.getElementById("btnlastname");
const btn = document.getElementById("btnfirstname");
const table = document.getElementById("tblRecords");
const status = document.getElementById("status");

let records = [];
let editIndex = -1;

// Insert / Update
btn.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input");

    // Check inputs
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Please complete all inputs!");
            return;
        }
    }

    const record = {
        fname: inputs[0].value,
        mname: inputs[1].value,
        lname: inputs[2].value,
        age: parseInt(inputs[3].value)
    };

    // Insert
    if (editIndex === -1) {
        records.push(record);
    } 
    // Update
    else {
        records[editIndex] = record;
        editIndex = -1;
        btn.innerHTML = "Insert";
    }

    clearInputs();
    displayRecords();
});

// Clear inputs
clearBtn.addEventListener("click", function () {
    clearInputs();
    editIndex = -1;
    btn.innerHTML = "Insert";
});

// Clear all records
clearAllBtn.addEventListener("click", function () {
    records = [];
    clearInputs();
    editIndex = -1;
    btn.innerHTML = "Insert";
    displayRecords();
});

// Display records
function displayRecords() {
    table.innerHTML = "";

    if (records.length === 0) {
        status.style.display = "inline";
        status.innerHTML = "No Records...";
        return;
    }

    status.style.display = "none";

    // Header
    const header = table.insertRow();

    ["First Name", "Middle Name", "Last Name", "Age", "Action"]
        .forEach(text => {
            const th = document.createElement("th");
            th.innerHTML = text;
            header.appendChild(th);
        });

    // Records
    records.forEach((record, index) => {
        const row = table.insertRow();

        row.insertCell().innerHTML = record.fname;
        row.insertCell().innerHTML = record.mname;
        row.insertCell().innerHTML = record.lname;
        row.insertCell().innerHTML = record.age;

        const action = row.insertCell();

        const edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.onclick = () => editRecord(index);

        const del = document.createElement("button");
        del.innerHTML = "Delete";
        del.onclick = () => deleteRecord(index);

        action.appendChild(edit);
        action.appendChild(del);
    });
}

// Edit record
function editRecord(index) {
    const inputs = document.querySelectorAll("input");
    const record = records[index];

    inputs[0].value = record.fname;
    inputs[1].value = record.mname;
    inputs[2].value = record.lname;
    inputs[3].value = record.age;

    editIndex = index;
    btn.innerHTML = "Update";
}

// Delete record
function deleteRecord(index) {
    records.splice(index, 1);
    displayRecords();
}

// Clear inputs
function clearInputs() {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
}

// Initial display
displayRecords();