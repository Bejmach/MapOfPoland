function RandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Region {
    constructor(name, rgb) {
        this.name = name;
        this.rgb = rgb;
    }
}

const regions = [
    new Region("Białowieski Park Narodowy", "34;139;34"),
    new Region("Biebrzański Park Narodowy", "70;130;180"),
    new Region("Bieszczadzki Park Narodowy", "139;69;19"),
    new Region("Park Narodowy Bory Tucholskie", "46;139;87"),
    new Region("Park Narodowy Gór Stołowych", "255;165;0"),
    new Region("Park Narodowy Ujście Warty", "154;205;50"),
    new Region("Gorczański Park Narodowy", "128;128;0"),
    new Region("Kampinoski Park Narodowy", "210;105;30"),
    new Region("Karkonoski Park Narodowy", "75;0;130"),
    new Region("Magurski Park Narodowy", "107;142;35"),
    new Region("Narwiański Park Narodowy", "176;224;230"),
    new Region("Ojcowski Park Narodowy", "255;69;0"),
    new Region("Pieniński Park Narodowy", "32;178;170"),
    new Region("Poleski Park Narodowy", "0;255;127"),
    new Region("Roztoczański Park Narodowy", "220;20;60"),
    new Region("Słowiński Park Narodowy", "135;206;250"),
    new Region("Świętokrzyski Park Narodowy", "50;205;50"),
    new Region("Tatrzański Park Narodowy", "139;0;139"),
    new Region("Wielkopolski Park Narodowy", "0;128;128"),
    new Region("Wigierski Park Narodowy", "255;215;0"),
    new Region("Woliński Park Narodowy", "65;105;225"),
    new Region("Babiogórski Park Narodowy", "255;0;0"),
    new Region("Drawieński Park Narodowy", "255;140;0")
];

function getLocalStgOr(key, default_value) {
    x = localStorage.getItem(key);
    if (x === null) return default_value;
    else return Number(x);
}

function saveXPAndLvl(xp, lvl) {
    localStorage.setItem("xp", xp);
    localStorage.setItem("lvl", lvl);
}

window.onload = function () {
    let experience = getLocalStgOr("xp", 0);
    let lvl = getLocalStgOr("lvl", 1);
    let curFibonachi = 2 + lvl;
    let expCap = fibonachiNumber(curFibonachi);

    const lvlBar = document.querySelector("#myBar");
    const lvlText = document.querySelector("#overlayText");

    function fibonachiNumber(point) {
        if (point == 0) {
            return 0;
        }
        else if (point == 2 || point == 1) {
            return 1;
        }
        else {
            let loop = 1;
            let a = 1;
            let b = 1;
            while (loop < point) {
                if (loop % 2 != 0) {
                    a = a + b;
                }
                else {
                    b = a + b;
                }
                loop += 1;
            }
            if (a > b) {
                return a;
            }
            return b;
        }
    }

    function moveBar(curAmmount, maxAmmount) {
        var width = Math.ceil(curAmmount / maxAmmount * 100);
        lvlBar.style.width = width + "%";
    }

    moveBar(experience, expCap);
    lvlText.innerText = experience + "/" + expCap + " XP, level " + lvl;
    function expUp() {
        experience += 1;
        updateXP();
    }
    function updateXP() {
        if (experience >= expCap) {
            lvl += 1;
            curFibonachi += 1;
            expCap = fibonachiNumber(curFibonachi);
            experience = 0;
            if (expCap <= 0) {
                console.log("Wow. Int overload... that was so unexpected... If your testing this library, then I understand how you got here, else... go touch some grass, pls");
            }
        }

        saveXPAndLvl(experience, lvl);

        moveBar(experience, expCap);
        lvlText.innerText = experience + "/" + expCap + " XP, level " + lvl;
    }

    // Get the HTML Canvas
    const canvas = document.querySelector("#image_canvas");
    // Get the canvas context
    const ctx = canvas.getContext('2d');

    const name = document.querySelector('#name');
    const points = document.querySelector('#points');

    const chosen = document.querySelector('#chosen');

    // Set this variable to any image source
    const IMAGE_SRC = 'parkiNarodoweRaw.png';

    // Create a new image and add it to your canvas
    const img = new Image();
    img.height = 700;
    img.width = 800;
    // Wait for the image to load before drawing to the canvas
    img.addEventListener('load', function () {
        ctx.drawImage(img, 0, 0);
    }, false);

    img.crossOrigin = '';
    img.src = IMAGE_SRC;

    // This is important to avoid cross origin errors

    let pointCounter = 0;

    let randomRegion = regions[RandomInt(regions.length)];

    name.innerText = randomRegion.name;
    points.innerText = pointCounter;

    canvas.onmousedown = function (e) {
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        let colorData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        let rgb = `${colorData[0]};${colorData[1]};${colorData[2]}`;
        console.log(rgb);

        const chosenRegion = regions.find(r => r.rgb === rgb);
        if (!chosenRegion) return;

        chosen.innerText = "> " + chosenRegion.name;

        if (randomRegion.rgb === rgb) {
            randomRegion = regions[RandomInt(regions.length)];
            name.innerText = randomRegion.name;
            pointCounter += 1;
            points.innerText = pointCounter;
            expUp();
        }
    };
};

const canvasContainer = document.querySelector("#canvas_container");

document.querySelector("#hardcore_checkbox").addEventListener("change", e => {
    if (e.currentTarget.checked) {
        canvasContainer.classList.add("hardcore");
    } else {
        canvasContainer.classList.remove("hardcore");
    }
});