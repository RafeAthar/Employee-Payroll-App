
////////////////// Class Definition

class EmployeePayrollData{
    
    //getters and setters
    get id(){ return this._id;}
    set id(id){ this._id = id;}

    get name(){ return this._name;}
    set name(name){ 
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if(nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect!!'
    }

    get profilePic(){ return this._profilePic;}
    set profilePic(profilePic){ this._profilePic = profilePic;}

    get gender(){ return this._gender;}
    set gender(gender){ this._gender = gender;}

    get department(){ return this._department;}
    set department(department){ this._department = department;}

    get salary(){ return this._salary;}
    set salary(salary){ this._salary = salary;}

    get note(){ return this._note;}
    set note(note){ this._note = note;}

    get startDate(){ return this._startDate;}
    set startDate(startDate){ this._startDate = startDate;}

    // Method
    toString(){
        return "id=" + this.id + ", name=" + this.name + ", gender=" + this.gender + 
        ", profilePic=" + this.profilePic + ", department=" + this.department + 
        ", salary=" + this.salary + ", startDate=" + this.startDate + ", note=" + this.note;
    }
}


///////////////// Event Listener

window.addEventListener('DOMContentLoaded', (event) => {
    
    //alert('content loadddded');
    
    const empJson = localStorage.getItem('editEmp');
    if(empJson){
        isUpdate = empJson ? true : false;
        if(!isUpdate) return;
        empObj = Json.parse(empJson);
        setForm();
    } else{
        const name = document.querySelector('#name');;
        const textError = document.querySelector('.text-error');
        name.addEventListener('input', function() {
            if(name.ariaValueMax.length==0){
                textError.textContent = "";
                return;
            }
        try{
            (new EmployeePayrollData()).name = name.value ;
            textError.textContent="";
        } catch(e){
            textError.textContent=e;
        }
        });
    }

});


////////////////// Create Employee Payroll Object On Save

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){ return;}
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    let empEdited = localStorage.getItem("editEmp");
    if (empEdited) {
        empEdited = JSON.parse(empEdited);
        let empPayrollData = employeePayrollList.filter(empData => empData._id != empEdited._id);
        employeePayrollList = empPayrollData;
    }

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.id = createNewEmployeeId();
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    employeePayrollData.startDate = getInputValueById('#startDate');
    // console.log(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item  => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? "1" : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}


////////////////// Set Form

const setForm = () => {
    setValue('#name', empObj._name);
    setSelectedValues('[name=profile]', empObj._profilePic);
    setSelectedValues('[name=gender]', empObj._gender);
    setSelectedValues('[name=department]', empObj._department);
    setValue('#salary', empObj._salary);
    // setTextValue('.salary-output', empObj._salary)
    setValue('#notes', empObj._notes);
    setValue('#startDate', empObj._startDate);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    });
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
