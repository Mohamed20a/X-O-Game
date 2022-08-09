console.log("WELCOME TO X-O GAME")
let backgroundmusic = new Audio("mp3/bg-music.mp3");
let turn_music = new Audio("mp3/fx.mp3");
let turn = "X";
let isgameover = false;
let gameovermusic = new Audio("mp3/game-over.mp3")
let reset = document.querySelector("#reset")
let sound = document.getElementById("sound")

// Fucntion to change turn 
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}


// Fucntion to check the winner
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext")
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true;
            turn = "";
            document.querySelector(".imgBox").getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameovermusic.play();
        }
    })
}

// Logic to run the game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            turn_music.play();
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }

    })
})

// Reset Fucntion

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll(".boxtext")
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"
    isgameover = false;
    document.querySelector(".line").style.width = "0vw"
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgBox").getElementsByTagName('img')[0].style.width = "0px";

})

// Sound Playing Function

if (!isgameover) {
    backgroundmusic.muted = false
    backgroundmusic.play()
    sound.addEventListener('click', () => {

            if (sound.className.match("fa-volume-up")) {
                sound.classList.remove("fa-volume-up")
                sound.classList.add("fa-volume-mute")
                backgroundmusic.pause();
            } else {
                sound.classList.remove("fa-volume-mute")
                sound.classList.add("fa-volume-up")
                backgroundmusic.play();
            }
        }

    )
}