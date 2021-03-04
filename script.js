
const list = document.getElementById('myUl');

function initListItem(listItem) {
    // Create a 'close' item and append it to a list item
    const span = document.createElement('SPAN');
    span.className = 'close';
    span.onclick = function () {
        const listItem = this.parentElement;
        listItem.parentElement.removeChild(listItem);
        saveListToLocalStorage();
    }

    const txt = document.createTextNode('\u00D7');
    span.appendChild(txt);

    listItem.appendChild(span);

    listItem.onclick = function () {
        this.classList.toggle('checked');
    }
}

const listItems = document.getElementsByTagName('LI');
for (let i = 0; i < listItems.length; i++) {
    initListItem(listItems[i]);
}

// Creating a new list item when clicking on 'Add' button
function addItem() {
    const inputValue = document.getElementById('myInput').value;
    if (inputValue === '') {
        alert('What would you like ToDo?');
        return;
    }

    const item = {
        value: inputValue
    };

    addItemToList(item);

    saveListToLocalStorage();

    document.getElementById('myInput').value = '';
}

function clearAll() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild)
    }
    saveListToLocalStorage();
}

function saveListToLocalStorage() {
    let itemsArray = [];
    for (let i = 0; i < listItems.length; i++) {
        const item = {
            value: listItems[i].firstChild.textContent
        };

        itemsArray.push(item);
    }

    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function loadListFromLocalStorage() {
    if (localStorage.getItem('items')) {
        const itemsArray = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < itemsArray.length; i++) {
            addItemToList(itemsArray[i]);
        }
    }
}

loadListFromLocalStorage();

function addItemToList(item) {
    const listItem = document.createElement('li');
    const listItemText = document.createTextNode(item.value);
    listItem.appendChild(listItemText);
    initListItem(listItem);

    list.appendChild(listItem);
}

