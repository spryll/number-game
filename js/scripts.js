var timeLimit, timerStart, currentDot, progress, placement, sequence, factor, successSound, failSound;
var timer = document.getElementById('timer');
var playingField = document.getElementById('playingField');
const maxTimeLimit = 20;
const second_interval = 1000;
const dotsPerLevel = 10;
var dots = [];
var stateDefault = { level: 1 };
var localStore = JSON.parse(localStorage.getItem('state'));

var state = ( localStore === null) ? stateDefault : localStore;
successSound = new sound("sound/Strong_Punch-Mike_Koenig-574430706.wav");
failSound = new sound("sound/Buzzer-SoundBible.com-188422102.wav");

function play() {
    $('#level').html(state.level);
    placement = config.levels[state.level - 1].placement;
    sequence = config.levels[state.level - 1].sequence;
    factor = config.levels[state.level - 1].factor;
    currentDot = 1;
    timeLimit = maxTimeLimit;
    progress = 100;
    createDots();
    timerStart = setInterval(time, second_interval);
}

function createDots() {
    var values = [];
    let i = 1;
    while (values.length < dotsPerLevel) {
        if (factor !== 1) {
            let num = parseInt(Math.random() * (dotsPerLevel * factor + 1));
            let exists = (values.includes(num));
            if (!exists) values.push(num);
        } else values.push(i++)
    }
    if (factor !==1) {
        values.sort(function (a, b) {
            return a - b;
        });
    }
    for (let i = dotsPerLevel; i > 0; i--) {
        var dot = document.createElement('div');
        dot.className="dot";
        dot.data = "data-" + i;
        dot.innerHTML = values.pop();
        dot.onclick = verify;
        dots.push(dot);
    }
    sequenceDots();
}

function sequenceDots() {
    switch (sequence) {
        case SeqEnum.REVERSE:
            dots.sort(function (a, b) {
                return a.innerHTML - b.innerHTML;
            });
        break;
        case SeqEnum.RANDOM:
            for (let i = dots.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [dots[i], dots[j]] = [dots[j], dots[i]];
            }
        break;
        default:
    }
    placeDots();
}

function placeDots() {
    if (placement === PlcEnum.STATIC) {
        let i = 0;
        while (dots.length)
            document.getElementById("space-" + staticPlacement[i++]).appendChild(dots.pop());
    } else {
        while (dots.length) {
            let j = Math.floor((Math.random() * 25) + 1);
            let node = document.getElementById("space-" + j);
            if (!node.hasChildNodes()) node.appendChild(dots.pop())
            else placeDots()
        }
    }
    fillFakeDots();
}

function time() {
    timeLimit--;
    if (timeLimit >= 0) {
        var rBar = document.getElementsByTagName("meter")[0];
        rBar.value = 100 - (maxTimeLimit - timeLimit) / maxTimeLimit * 100
        progress = progress - maxTimeLimit;
    } else {
        alert("You Lost!");
        clearInterval(timerStart);
    }
}

function removeDots() {
    for (let i = 1; i <= 25; i++) {
        let node = document.getElementById("space-" + i);
        if (node.hasChildNodes()) node.removeChild(node.childNodes[0]);
    }
}

function fillFakeDots() {
    for (let i = 1; i <= 25; i++) {
        let node = document.getElementById("space-" + i);
        if (!node.hasChildNodes()) {
            var fakeDot = document.createElement('div');
            fakeDot.className="fake-dot";
            node.appendChild(fakeDot)
        }
    }
}

function verify(element) {
    if (timeLimit > 0) {
        if (currentDot == element.currentTarget.data.split('-')[1]) {
            element.srcElement.className = "correct-dot";
            successSound.play();
            if(currentDot === dotsPerLevel && timeLimit !== 0 ) {
                setTimeout(function() { 
                    alert("Go to next level!");
                    play(); 
                }, 500);
                state.level++;
                localStorage.setItem('state', JSON.stringify(state));
                clearInterval(timerStart);
                removeDots();
                timeLimit = maxTimeLimit;
                progress = 100;
                time();
            }
            currentDot++;
        }  else {
            failSound.play();
            if (element.srcElement.className !== "correct-dot")
                element.srcElement.className = "incorrect-dot";
        }
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
} 