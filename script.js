let limit = 0, expenses = [], spent = 0;
function get(id) {
    return document.getElementById(id);
} 
const auth = get('authContainer'),
      app = get('mainApp'),
      user = get('userName'),
      limitInput = get('budgetLimit'),
      limitText = get('dailyLimit'),
      spentText = get('totalSpent'),
      safeText = get('safeToSpend'),
      level = get('budgetLevel'),
      percent = get('tankPercentage'),
      list = get('transactionsList'),
      empty = get('noTransactions');
get('simpleLogin').onsubmit = function(e) {
    e.preventDefault();
    let name = get('username').value.trim();
    if (name == "") return;
    sessionStorage.setItem('user', name);
    user.textContent = "Welcome, " + name;
    auth.classList.add('hidden');
    app.classList.remove('hidden');
    get('username').value = "";
};
get('logoutBtn').onclick = function() {
    sessionStorage.clear();
    location.reload();
};
get('setBudgetBtn').onclick = function() {
    let val = +limitInput.value;
    if (val <= 0) return alert("Enter valid amount");
    limit = val;
    update();
};
get('expenseForm').onsubmit = function(e) {
    e.preventDefault();
    let name = get('expenseName').value;
    let amt = +get('expenseAmount').value;
    if (!name || amt <= 0) return alert("Invalid input");
    expenses.unshift({ name, amt, time: new Date() });
    spent += amt;
    update();
    get('expenseName').value = "";
    get('expenseAmount').value = "";
};
function update() {
    let safe = limit - spent;
    if (safe < 0) safe = 0;
    limitText.textContent = "₹" + limit;
    spentText.textContent = "₹" + spent;
    safeText.textContent = "₹" + safe;
    let p = 100;
    if (limit > 0) {
        p = 100 - (spent / limit) * 100;
    }
    level.style.height = p + "%";
    percent.textContent = p + "%";
    list.innerHTML = "";
    if (expenses.length === 0) {
        empty.style.display = "block";
        return;
    }
    empty.style.display = "none";
    for (let i = 0; i < expenses.length; i++) {
        let x = expenses[i];
        list.innerHTML += `<div class="transaction-item">
            <div><div>${x.name}</div>
            <div class="time">${x.time.toLocaleTimeString()}</div></div>
            <div class="amount">-₹${x.amt}</div>
        </div>`;
    };
}
onload = function() {
    let savedUser = sessionStorage.getItem('user');
    if (savedUser) {
        user.textContent = "Welcome, " + savedUser;
        auth.classList.add('hidden');
        app.classList.remove('hidden');
    }
};
