const currencies = [
    {
        code: "INR",
        name: "Indian Rupee",
        symbol: "₹",
        rateToINR: 1
    },
    {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        rateToINR: 85.75
    },
    {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        rateToINR: 100.20
    },
    {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        rateToINR: 117.50
    },
    {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        rateToINR: 0.58
    },
    {
        code: "AED",
        name: "UAE Dirham",
        symbol: "د.إ",
        rateToINR: 23.35
    }
];


let users = JSON.parse(localStorage.getItem('users')) || []
let transitions = JSON.parse(localStorage.getItem('transitions')) || []

// This is For Register
let regLink = document.querySelector('#reg')
let register = document.querySelector('.register')
let registerSpan = register.querySelectorAll('span')
let registerInputs = register.querySelectorAll('input')
let registerButton = register.querySelector('button');

// This is for login
let logLink = document.querySelector('#log')
let login = document.querySelector('.login')
let loginButton = login.querySelector('button');
let loginSpan = login.querySelectorAll('span')
let loginInputs = login.querySelectorAll('input')
let logOut = document.querySelector('.log-out');

// This is for Crud 
let addItem = document.getElementById('addItem');
let addForm = document.querySelector('#addItemForm');
let closeBtn = addForm.querySelector('.close');
let dashboard = document.querySelector('.hero')
let addTransactionBtn = addForm.querySelector('#addTransactionBtn')
let formSpans = addForm.querySelectorAll('span')
let table = document.querySelector('.table')
let tableBody = table.querySelector('tbody')
let search = table.querySelector('#search');
let globalCategory = table.querySelector('#globalCategory');
let editId;
let totalExpense = document.querySelector('#totalExpence');
let totalIncome = document.querySelector('#totalIncome');
let totalTransition = document.querySelector('#totalTrancision');
let curr = document.querySelector('#currentBalance')
let reset = document.querySelector('.reset');
let name = document.querySelector('.user-name')
let main = document.querySelector('main')
const btn = document.getElementById("themeBtn");

let dashboardSideBarLink = document.querySelector('#dashboardSideBarLink')
let settingsSideBarLink = document.querySelector('#settings')
let fullName = document.querySelector('#fullName')
let currency = document.querySelector('#curr');
let saveChange = document.querySelector('#saveChange')
let user = users.find((elem) => elem.isLogin === true)
let curr1;
if(user){
  curr1 = currencies.find(c=>c.code===user.curr);
}


regLink.addEventListener('click', () => {
    register.style.display = 'flex'
    login.style.display = 'none'
})
logLink.addEventListener('click', () => {
    login.style.display = 'flex'
    register.style.display = 'none'
})

function activeDashBoard(){
    settingsSideBarLink.querySelector('div').classList.remove('active')
    dashboardSideBarLink.querySelector('div').classList.toggle('active')
    main.querySelector('.main-content').style.display = 'block'
    main.querySelector('#setting-page').style.display = 'none'
}
// SideBar links
dashboardSideBarLink.addEventListener('click', activeDashBoard)
settingsSideBarLink.addEventListener('click', () => {
    dashboardSideBarLink.querySelector('div').classList.remove('active')
    settingsSideBarLink.querySelector('div').classList.toggle('active')
    main.querySelector('.main-content').style.display = 'none'
    main.querySelector('#setting-page').style.display = 'block'
})
addFocusListener(login)

loginButton.addEventListener('click', loginUser)
function loginUser(e) {
    e.preventDefault()
    let username = loginInputs[0].value.trim()
    let password = loginInputs[1].value.trim()
    if (!username) {
        loginSpan[0].style.display = 'block'
        return
    }
    if (!password) {
        loginSpan[1].style.display = 'block'
        return
    }

    let user = users.find(elem => elem.name === username)
    if (!user) {
        Swal.fire({
            title: "User does not Exsits?",
            text: "please Register First?",
            icon: "question"
        })
        loginInputs[0].value = ''
        loginInputs[1].value = ''

        register.style.display = 'flex'
        login.style.display = 'none'
    } else {
        user.isLogin = true
        localStorage.setItem('users', JSON.stringify(users))
        login.style.display = 'none'
        dashboard.style.display = 'flex'

        loginInputs[0].value = ''
        loginInputs[1].value = ''
        if (user.isLogin) {
            getName()
        }
    }
}

// Name in navbar
function getName() {
    let user1 = users.find((elem) => elem.isLogin === true)
    name.textContent = user1.name
}

function changeInfo(e) {
    e.preventDefault()
    user.name = fullName.value
    user.curr = currency.value
    localStorage.setItem('users', JSON.stringify(users));

   document.querySelector('#fullName').value = ''
    document.querySelector('#curr').value = ''

    activeDashBoard();
    location.reload()

}

addFocusListener(register)

registerButton.addEventListener('click', registerUser)
function registerUser(e) {
    e.preventDefault()
    let username = registerInputs[0].value.trim()
    let password = registerInputs[1].value.trim()

    if (!username) {
        registerSpan[0].style.display = 'block'
        return
    }
    if (!password) {
        registerSpan[1].style.display = 'block'
        return
    }
    const exists = users.some(user =>
        user.name === username
    );

    if (exists) {
        Swal.fire({
            title: "Username already exists",
            icon: "error"
        });

        return;
    }

    let user = { name: username, password: password, isLogin: false, curr: 'INR' }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    Swal.fire({
        title: "User Created Successfully!",
        icon: "success",
        draggable: true
    });

    registerInputs[0].value = ''
    registerInputs[1].value = ''

    login.style.display = 'flex'
    register.style.display = 'none'

}

// LogOut Functionality
logOut.addEventListener('click', () => {
    login.style.display = 'flex'
    dashboard.style.display = 'none'

    let user = users.find((elem) => elem.isLogin === true)
    user.isLogin = false;

    localStorage.setItem('users', JSON.stringify(users))
})

//reset all
reset.addEventListener('click', () => {
    localStorage.removeItem('transitions')
    location.reload();
})

addTransactionBtn.addEventListener('click', addTransaction);

// Count Statistics like Incomes,Expenses
function countTotalincome() {
    let expenses = transitions.reduce((acc, elem) => {
        if (elem.type === 'expense') {
            acc += elem.amount / curr1.rateToINR
        }
        return acc
    }, 0)
    let incomes = transitions.reduce((acc, elem) => {
        if (elem.type === 'income') {
            acc += elem.amount / curr1.rateToINR
        }
        return acc
    }, 0)
    totalExpense.innerHTML = expenses.toFixed(2)
    totalIncome.innerHTML = incomes.toFixed(2)
    totalTransition.innerHTML = transitions.length
    curr.innerHTML = (incomes - expenses).toFixed(2)
    drawChart()
}
getName()
//Search & Filter
globalCategory.addEventListener('change', () => {
    let val = globalCategory.value.toLowerCase()
    if (val) {
        let sometransaction = transitions.filter((elem) => elem.type === val)
        displayAll(sometransaction);
    } else {
        displayAll()
    }
    let label;
    let data;
    let color;
    if (val == 'income') {
        label = ['Income']
        data = [Number(totalIncome.textContent)]
        color = ['green']
    } else if (val == 'expense') {
        label = ['Expense']
        data = [Number(totalExpense.textContent)]
        color = ['red']
    } else {
        label = ['Expense', 'Income']
        data = [Number(totalExpense.textContent), Number(totalIncome.textContent)]
        color = ['red', 'green']
    }
    drawChart(label, data, color)
})

//Saw Statistics in Chart
let myChart;
function drawChart(label = ['Expence', 'Income'], data = [Number(totalExpense.textContent), Number(totalIncome.textContent)], color = ['Red', 'Green']) {
    const ctx = document.getElementById("myChart");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: label,
            datasets: [{
                label: "Amount",
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    console.log(data)
    console.log(label)
}

function searchElem() {
    let val = search.value.trim().toLowerCase()
    if (val) {
        let sometransaction = transitions.filter((elem) => elem.category.includes(val))
        displayAll(sometransaction);
    } else {
        displayAll()
    }

}

//CRUD Operations
function displayAll(data = transitions) {
    console.log(curr1)
    tableBody.innerHTML = "";
    data.forEach((elem) => {
        tableBody.innerHTML += `<tr>
                        <td>${elem.date}</td>
                        <td>${elem.type}</td>
                        <td>${elem.category}</td>
                        <td>${curr1.symbol}  ${(elem.amount / curr1.rateToINR).toFixed(2)}</td>
                        <td><div class="action"><button class="btn edit" onclick='updateTransaction(${elem.id})'>Edit</button><button class="btn del" onclick='deleteTransaction(${elem.id})'>Delete</button></div></td></tr>
     `
    })
    countTotalincome()
}

function deleteTransaction(id) {
    let newTransitions = transitions.filter((elem) => elem.id !== id)
    localStorage.setItem('transitions', JSON.stringify(newTransitions));
    displayAll();
    location.reload();
}

function updateTransaction(id) {
    editId = id
    let obj = transitions.find((elem) => elem.id === editId)
    addForm.querySelector('#type').value = obj.type
    addForm.querySelector('#description').value = obj.description
    addForm.querySelector('#amount').value = obj.amount
    addForm.querySelector('#date').value = obj.date
    addForm.querySelector('#category').value = obj.category

    addForm.style.display = "flex";
}
function addTransaction(e) {
    e.preventDefault();

    formSpans.forEach(span => span.style.display = "none");
    let id = Date.now();
    let type = addForm.querySelector('#type').value
    let description = addForm.querySelector('#description').value
    let amount = parseFloat(addForm.querySelector('#amount').value)
    let date = addForm.querySelector('#date').value
    let category = addForm.querySelector('#category').value
    if (!type.trim()) {
        formSpans[0].style.display = 'block'
        return;
    }

    if (!description.trim()) {
        formSpans[1].style.display = 'block'
        return;
    }
    if (!date.trim()) {
        formSpans[3].style.display = 'block'
        return;
    }
    if (!category.trim()) {
        formSpans[4].style.display = 'block'
        return;
    }
    if (editId) {

        let obj = transitions.find(elem => elem.id === editId);

        obj.type = type;
        obj.description = description;
        obj.amount = parseFloat(amount);
        obj.date = date;
        obj.category = category;

        editId = null
    } else {
        let obj = {
            id,
            type,
            description,
            amount,
            date,
            category
        }
        transitions.push(obj);
    }
    localStorage.setItem('transitions', JSON.stringify(transitions));
    addForm.reset();
    addForm.style.display = 'none'
    displayAll()
}

searchElem()


// Open & Close Add/Edit Form
addItem.addEventListener('click', () => {
    addForm.style.display = 'flex'
})

closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addForm.style.display = 'none'
})

function addFocusListener(section) {
    const inputs = section.querySelectorAll('input');

    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.nextElementSibling.style.display = 'none'
        });
    });

}

//Change Mode
btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    addTransactionBtn.classList.toggle("light")
    btn.classList.toggle("light")

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️ Light Mode";
    } else {
        btn.textContent = "🌙 Dark Mode";
    }
});

//Change Settings
saveChange.addEventListener('click', changeInfo)