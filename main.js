$(document).ready(function () {

});
let images = [                           //images in table
    {
        src: 'https://kde.link/test/1.png',
        id: 0
    },
    {
        src: 'https://kde.link/test/2.png',
        id: 1
    },
    {
        src: 'https://kde.link/test/9.png',
        id: 2
    },
    {
        src: 'https://kde.link/test/7.png',
        id: 3
    },
    {
        src: 'https://kde.link/test/6.png',
        id: 4
    },
    {
        src: 'https://kde.link/test/3.png',
        id: 5
    },
    {
        src: 'https://kde.link/test/4.png',
        id: 6
    },
    {
        src: 'https://kde.link/test/0.png',
        id: 7
    },
    {
        src: 'https://kde.link/test/5.png',
        id: 8
    },
    {
        src: 'https://kde.link/test/8.png',
        id: 9
    }

];


let size;
let currentOpenImages = [];
let field = document.querySelector('.tableWithImages');
let countOpened = 0;
let startButton = document.querySelector('#startGame');
let restartButton = document.querySelector('#restartGame');
let finishButton = document.querySelector('#finish');
let widthOfField = null;
let heightOfField = null;
let modalWindow = document.querySelector('.modalIsWin');
let sideBar = document.querySelector('.sideBar');
$.getJSON("https://kde.link/test/get_field_size.php", function (item) {      //get size of field from json
    widthOfField = item.width;
    heightOfField = item.height;
    size = heightOfField * widthOfField;

});


console.log(widthOfField);


function createRandomImage(array) {             //random order in array
    return array.sort(function () {
        return 0.5 - Math.random();
    });
}

function createArray(size) {                         //create array with img
    let arr = [];
    let count = 0;

    for (let i = 0; i < size / 2; i++) {
        arr[i] = images[count];
        count++;
        if (count >= images.length) {
            count = 0;
        }
    }
    let result = arr.concat(arr);

    return result;

}

function makeTable(array) {
    var m = document.createElement('div');
    m.className = 'tableImages';
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('div');
        row.className = 'item';
        var img = document.createElement('img');
        img.setAttribute('src', array[i].src);
        img.setAttribute('id', array[i].id);
        row.appendChild(img);
        m.appendChild(row)
    }
    return m
}

function getStart() {                                        //start function
    let data = createArray(size);
    let random = createRandomImage(data);
    let table = makeTable(data);
    field.style.width = widthOfField * 105 + 'px';
    field.style.height = heightOfField * 105 + 'px';
    field.appendChild(table);
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    console.log(field.style.width);
    console.log(size);
}

function getRestart() {
    location.reload();
}

function initClick(e) {                                                // onclick function
    let card = e.target.closest('div');
    if (!card) return;
    let img = card.firstElementChild;
    if (img === currentOpenImages[0] || img === currentOpenImages[1]) return;
    if (currentOpenImages.length === 0) {
        img.classList.add('open');
        currentOpenImages.push(img);
    }
    else if (currentOpenImages.length === 1) {
        if (currentOpenImages[0].id === img.id) {

            currentOpenImages[0].parentNode.classList.add('hide');


            img.classList.add('open');
            img.parentNode.classList.add('hide');
            countOpened++;
            checkCards();
            currentOpenImages.length = 0;
            //getPoints();

        } else {
            img.classList.add('open');
            currentOpenImages.push(img);
        }

    }
    else {
        if (currentOpenImages.length === 2) {
            currentOpenImages[0].classList.remove('open');
            currentOpenImages[1].classList.remove('open');
            currentOpenImages.length = 0;
            currentOpenImages.push(img);
            img.classList.add('open');
        }
    }
    console.log(currentOpenImages[0].parentNode);
}
field.addEventListener('click', initClick);
startButton.addEventListener('click', getStart);
restartButton.addEventListener('click', getRestart);
finishButton.addEventListener('click', finishGame)
function showModal () {
   modalWindow.style.display = 'block';
   sideBar.style.display = 'none';
    let oldTable = document.querySelector('.tableImages');
    countOpened = 0;
    oldTable.remove();
}
function finishGame () {

    location.reload();
}
function checkCards() {                                      //check is win
    if (countOpened === size / 2) {
        showModal();

    }
}



