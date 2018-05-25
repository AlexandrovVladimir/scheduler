const items = document.querySelectorAll('.scheduler__item'); //наш список дел
const tds = document.querySelectorAll('.table td'); //таблица справа
const leftSide = document.querySelector('.scheduler__left'); //область слева
let dragSrcEl = null;

const dragIcon = document.createElement('img');
dragIcon.src = 'img/like.png';
dragIcon.width = 100;

let idItem = 0;
[].forEach.call(items, function(item){
    idItem++;
    item.setAttribute('draggable', 'true');
    item.setAttribute('id', 'item' + idItem);

    item.addEventListener('dragstart', dragStart, false);
    item.addEventListener('dragenter', dragEnter, false);
    item.addEventListener('dragover', dragOver, false);
    item.addEventListener('dragleave', dragLeave, false);
    item.addEventListener('drop', dragDrop, false);
    item.addEventListener('dragend', dragEnd, false);
});

function dragStart(e) {
    if (!e.stopPropagation()) {
        e.stopPropagation();
    }


    this.classList.add('start');

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML); //наш item

    e.dataTransfer.setDragImage(dragIcon, -10, -10);

    return true;
}

function dragEnter(e) {
    e.preventDefault();

    this.classList.add('over');

    return true;
}

function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function dragLeave(e) {
    e.preventDefault();
    this.classList.remove('over');
}

function dragDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    e.preventDefault();

    // See the section on the DataTransfer object.
    // e.target.append(document.getElementById(e.dataTransfer.getData("text/html")));
    if (dragSrcEl !== this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    [].forEach.call(items, function (item) {
        item.classList.remove('over');
    });

    return false;
}

function dragEnd(e) {
    if (!e.stopPropagation()) {
        e.stopPropagation();
    }

    e.preventDefault();

    this.classList.remove('start');
}

[].forEach.call(tds, function(td){
    td.parentNode.addEventListener('dragstart', dragStartTable, false);
    td.addEventListener('dragstart', dragStartTable, false);
    td.addEventListener('dragenter', dragEnterTable, false);
    td.addEventListener('dragover', dragOverTable, false);
    td.addEventListener('dragleave', dragLeaveTable, false);
    td.addEventListener('drop', dragDropTable, false);
    td.addEventListener('dragend', dragEndTable, false);
});

function dragStartTable(e) {
    if (!e.stopPropagation()) {
        e.stopPropagation();
    }

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML); //наш item

    e.dataTransfer.setDragImage(dragIcon, -10, -10);

    return true;
}


function dragEnterTable(e) {
    e.preventDefault();

    this.classList.add('over');

    return true;
}

function dragLeaveTable(e) {
    e.preventDefault();

    this.classList.remove('over');
}

function dragDropTable(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    e.preventDefault();

    // See the section on the DataTransfer object.
    // e.target.append(document.getElementById(e.dataTransfer.getData("text/html")));
    if (dragSrcEl !== this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    e.target.style.padding = '0';
    this.classList.remove('over');
    this.classList.remove('start');


    return false;
}

function dragOverTable(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function dragEndTable(e) {
    if (!e.stopPropagation()) {
        e.stopPropagation();
    }

    e.preventDefault();

    this.classList.remove('start');
}