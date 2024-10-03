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
    new Region("Dąbie", "86;122;183"),
    new Region("Jamno", "52;108;204"),
    new Region("Bukowo", "26;91;204"),
    new Region("Wicko", "84;126;201"),
    new Region("Gardno", "110;147;210"),
    new Region("Łebsko", "81;112;165"),
    new Region("Żywieckie", "0;65;177"),
    new Region("Rożnowskie", "81;130;216"),
    new Region("Gopło", "95;116;153"),
    new Region("Włocławskie", "73;125;216"),
    new Region("Charzykowskie", "44;109;222"),
    new Region("Wdzydze", "0;32;87"),
    new Region("Jeziorak", "40;60;96"),
    new Region("Śniardwy", "50;78;126"),
    new Region("Mamry", "110;138;186"),
    new Region("Hańcza", "102;116;141"),
    new Region("Wigry", "162;184;222"),
    new Region("Nyskie", "83;146;255"),
    new Region("Otmuchowskie", "47;123;255"),
    new Region("Czorsztyńskie", "0;79;216"),
    new Region("Solińskie", "122;171;255"),
    new Region("Jeziorsko", "0;93;255")
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
            if(a > b){
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
    const IMAGE_SRC = 'jezioraRaw.png';

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
        if (chosenRegion === undefined) return;

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
