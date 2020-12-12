// Adjunk alapértékeket a változókhoz

let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');


let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;

// Létrehozunk egy "box" változót, beállítjuk 10-re az értékét (ez fogja tárolni 
// az alap méretét az almának és a kigyó "egységnyi" testének)
// Deklarálunk egy üres "snake" listát, amiben a testrészei lesznek
// Kell egy "timerId", ami az időzítőt fogja tárolni. Nem kell alapérték neki.
// Deklarálunk egy "apple" elemet, ami indulásként két koordinátát fog tárolni


let box = 10;
let snake = [];
let timerId;
let apple = [20, 40];
let appleCount = 0;


//Irányok kezeléséhez segítségnek megadunk egy 2D listát, amit később fel tudunk használni:
// Ha x tengely mentén jobbra megyünk egy egységnyit ("box"),
// függőlegesen meg nem mozdulunk , akkor a lista első eleme jelenti az aktuális irányt és így tovább

let directions = [
    [box, 0], // right
    [0, box], //down
    [(-1 * box), 0], // left
    [0, (-1 * box)] // up
];

// Kezdési irány

let actDirection = directions[0];

// --------------------------- Print Table -----------------------------------------


function startGame() {
    const snakeBody = {
        widthP: box,
        heightP: 10
    };
    snake.push(snakeBody);
    printTable();
    timerId = setInterval(moveSnake, 200);
};

startGame();



function printTable() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "red";
    ctx.fillRect(apple[0], apple[1], box, box);

    ctx.fillStyle = 'green';
    for (let pos in snake) {
        ctx.fillRect(snake[pos].widthP, snake[pos].heightP, 10, 10);
    }
}


// -------------------------- Move snake, move!! -------------------------------

// Kezdjünk el mozogni.
// Hozzunk létre egy moveSnake függvényt, ami mozgatni fogja a kígyót.
// Elsőnek állapítsuk meg, "hol a feje a kígyónak". => a snake lista utolsó eleme lesz.
// Ha majd eszik a kigyó mindig nőni fog a lista a "feje" felé. Mentsük ki egy lokális
// változóba pl: 'headOfSnake'
// Hozzunk létre még egy lokális változót: "newHeadPosition"
// Ki kell számolnunk és ebbe kell belementenünk a két új koordinátát a headOfSnake és 
// a korábban létrehozott actDirection megfelelő értékeivel. (két elemű lista)
// Miután kiszámoltuk, megvannak a koordináták, hozzunk létre egy:
// "newBodyPart" Objektumot, hasonlóan mint a startGame-ben, adjuk át a megfelelő position-ket
// a newHeadPosition-ből.
// Már csak hozzá kell adnunk a snake listához az új testrészt. Végül vegyük ki az első elemet 
// a "kígyó farok részét". => shift() metódus .
// Így gyakorlatilag eltoljuk egy irányba a kígyót
// Megváltoztak a kigyó testjének koordinátái, újra kell rajzolnunk a táblát.
// Hívjuk meg a függvény végén a már megírt printTable() metódust, hogy az
// újra rajzolja a táblát a kígyó új testrészével együtt
// Még most nem láthatunk változást, hiszen a moveSnake függvényt is meg kell hívni
// De előtte még....

function moveSnake() {
    let headOfSnake = snake[snake.length - 1];
    let newHeadPosition = ([headOfSnake.widthP + actDirection[0], headOfSnake.heightP + actDirection[1]]);
    let newBodyPart = {
        widthP: newHeadPosition[0],
        heightP: newHeadPosition[1]
    };

    snake.push(newBodyPart);
    snake.shift();
    printTable();
    hasCollision();
    checkEating()
}



// Hozzunk létre egy EventListener-t, ami a billentyűk leütését figyeli és ennek megfelelően
// változtatja az "actDirection" irányát. 

window.addEventListener('keydown', (event) => {
     if (event.code === "ArrowDown") {
         event.preventDefault();
         actDirection = directions[1];
     }
     if (event.code === "ArrowUp") {
         event.preventDefault();
         actDirection = directions[3];
     }
     if (event.code === "ArrowLeft") {
        event.preventDefault();
         actDirection = directions[2];
     }
     if (event.code === "ArrowRight") {
        event.preventDefault();
        actDirection = directions[0];
    }
 });




// ---------------------------------------- Az Evés ----------------------------------


// Mentsük ki egy lokális változóba a kigyó fejét (utolsó elem a listában)
// Nézzük meg, hogy mindkét koordináta megegyezik e a fej és alma esetén(egy helyen vannak)
// Ha igen, készítsünk egy "newBody" Objektet az alma koordinátáival
// Majd adjuk hozzá a kígyó testéhez, hogy nőni tudjon.
// helyezzük el az almát egy random helyen, vagyis generáljunk random koordinátát neki  
function checkEating() {
    let snakeHead = snake[snake.length - 1];
    if (snakeHead.widthP === apple[0] && snakeHead.heightP === apple[1]) {
        const newBodyPart = {
            widthP: apple[0],
            heightP: apple[1]
        };
        snake.push(newBodyPart);
        apple = [
            Math.floor((Math.random() * canvasWidth - 10) / 10) * 10,
            Math.floor((Math.random() * canvasHeight - 10) / 10) * 10]
        appleCount++;
    }
};




// ----------------------------------- Az Ütközés ---------------------------------

// Mentsük ki egy változóba a fej objektumát. Nézzük meg, hogy a fej koordinátái
// túlnyúlnak e a canvas méretén (canvasWidth, canvasHeight változó)
// vagy bármelyik testrészének koordinátájával megegyeznek. Akkor térjen vissza true értékkel
// különben false. 
// Megj: figyeljünk arra, hogy a fej önmagával történő vizsgálatát elkerüljük
function hasCollision() {
    let headOfSnake = snake[snake.length - 1];
    if (headOfSnake.widthP >= canvasWidth || headOfSnake.heightP >= canvasHeight || headOfSnake.widthP < 0 || headOfSnake.heightP < 0) {
        clearInterval(timerId);
        alert('Game Over! Score: ' + appleCount);
    }

    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].widthP === headOfSnake.widthP && snake[i].heightP === headOfSnake.heightP) {
            clearInterval(timerId);
            alert('Game Over! Score: ' + appleCount);
        }
    }

    return false;
};


