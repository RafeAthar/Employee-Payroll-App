
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    console.log(empPayrollList);
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}

const createInnerHtml = () => {
    const headerHtml = " <th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"
        + "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
            <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}" width="30px" alt="img-cant-load"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>
                ${getDepHtml(empPayrollData._department)}
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="./assets/profile-images/delete.png" width="30px">
                
                <a href="updateEmp.html" target="_blank">
                <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="./assets/profile-images/edit.png" width="30px">
                </a>
            </td>
            </tr>
        `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
}

const getDepHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    console.log("empPayrollData: " + empPayrollData);
    if (!empPayrollData) return;

    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    console.log(empPayrollData);
    if (empPayrollData) {
        localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
        return;
    } else {
        return;
    }
    
}