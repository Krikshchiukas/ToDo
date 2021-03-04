const list = document.getElementById('myUl');

const listItems = list.getElementsByTagName('LI');
for (let i = 0; i < listItems.length; i++) {
    initListItem(listItems[i]);
}

function initListItem(listItem) {
    listItem.appendChild(createCloseButton());

    listItem.onclick = function () {
        this.classList.toggle('checked');
        saveListToLocalStorage();
    }
}

function createCloseButton() {
    const closeButton = document.createElement('SPAN');
    closeButton.className = 'close';

    closeButton.onclick = function () {
        const listItem = this.parentElement;
        removeElementFromParent(listItem);
        saveListToLocalStorage();
    }

    const closeButtonIcon = document.createTextNode('\u00D7');
    closeButton.appendChild(closeButtonIcon);

    return closeButton;
}

function removeElementFromParent(child) {
    child.parentElement.removeChild(child);
}

function addNewListItem() {
    const newListItemValue = document.getElementById('myInput').value;
    if (!newListItemValue) {
        alert('What would you like ToDo?');
        return;
    }

    addListItem({
        value: newListItemValue,
        checked: false
    });

    saveListToLocalStorage();

    document.getElementById('myInput').value = '';
}

function clearAllListItems() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild)
    }

    saveListToLocalStorage();
}

function saveListToLocalStorage() {
    let itemsArray = [];

    for (let i = 0; i < listItems.length; i++) {
        itemsArray.push({
            value: listItems[i].firstChild.textContent,
            checked: listItems[i].classList.contains('checked')
        });
    }

    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function loadListFromLocalStorage() {
    if (localStorage.getItem('items')) {
        const itemsArray = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < itemsArray.length; i++) {
            addListItem(itemsArray[i]);
        }
    }
}

function addListItem(item) {
    const listItem = document.createElement('LI');
    const listItemText = document.createTextNode(item.value);
    listItem.appendChild(listItemText);
    initListItem(listItem);

    if (item.checked) {
        listItem.classList.add('checked');
    }

    list.appendChild(listItem);
}

loadListFromLocalStorage();
