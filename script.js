let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [];
let totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

const itemSelect = document.getElementById('item-select');
const newItemInput = document.getElementById('new-item-input');
const addItemBtn = document.getElementById('add-item-btn');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

const updateTotalAmountDisplay = () => {
    totalAmountCell.textContent = totalAmount.toFixed(2);
};

const populateItemSelect = () => {
    itemSelect.innerHTML = '<option value="" disabled selected>Select an item</option>';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
    });
};

const addExpenseToTable = (expense, index) => {
    const newRow = expensesTableBody.insertRow();

    const itemCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    itemCell.textContent = expense.item;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function() {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        totalAmount -= expense.amount;
        updateTotalAmountDisplay();
        renderExpenses();
    });

    deleteCell.appendChild(deleteBtn);
};

const renderExpenses = () => {
    expensesTableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        addExpenseToTable(expense, index);
    });
};

addExpenseBtn.addEventListener('click', function() {
    const item = itemSelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (item === '' || item === null) {
        alert('Please select an item');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { item, amount, date };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    totalAmount += amount;
    updateTotalAmountDisplay();
    renderExpenses();

    amountInput.value = '';
    dateInput.value = '';
});

addItemBtn.addEventListener('click', function() {
    const newItem = newItemInput.value.trim();

    if (newItem === '') {
        alert('Please enter an item name');
        return;
    }

    if (items.includes(newItem)) {
        alert('Item already exists');
        return;
    }

    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    populateItemSelect();

    newItemInput.value = '';
});

updateTotalAmountDisplay();
populateItemSelect();
renderExpenses();
