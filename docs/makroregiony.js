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
    new Region("Pobrzeże Szczecińskie", "89;78;237"),
    new Region("Pobrzeże Koszalińskie", "56;45;207"),
    new Region("Pobrzeże Gdańskie", "16;5;162"),
    new Region("Pojezierze Wschodnio-pomorskie", "255;57;249"),
    new Region("Pojezierze Zachodniopomorskie", "174;63;171"),
    new Region("Pojezierze Południowopomorskie", "186;86;183"),
    new Region("Dolina Dolnej Wisły", "216;81;212"),
    new Region("Pojezierze Iławskie", "255;89;250"),
    new Region("Pojezierze Chełmińsko-Dobrzyńskie", "246;136;243"),
    new Region("Pradolina Toruńsko-Eberswaldzka", "213;118;210"),
    new Region("Pojezierze Wielkopolskie", "120;3;116"),
    new Region("Pojezierze Lubuskie", "180;52;176"),
    new Region("Pradolina Warciańsko-Odrzańska", "207;18;201"),
    new Region("Pojezierze Leszczyńskie", "255;185;249"),
    new Region("Wzniesienie Zielonogórskie", "240;18;233"),
    new Region("Obniżenie Dolnołużyckie", "93;37;81"),
    new Region("Wzniesienia Łużyckie", "138;96;129"),
    new Region("Obniżenie Milicko-Głogowskie", "129;71;18"),
    new Region("Nizina Południowowielkopolska", "162;87;18"),
    new Region("Wał Trzebnicki", "189;91;3"),
    new Region("Nizina Śląsko-Łużycka", "255;36;208"),
    new Region("Pogórze Zachodniosudeckie", "228;17;0"),
    new Region("Sudety Zachodnie", "255;122;112"),
    new Region("Sudety Środkowe", "246;79;65"),
    new Region("Przedgórze Sudeckie", "165;75;68"),
    new Region("Sudety Wschodnie", "189;76;81"),
    new Region("Nizina Śląska", "246;185;84"),
    new Region("Wyżyna Woźnicko-Wieluńska", "255;0;11"),
    new Region("Wyżyna Śląska", "225;115;115"),
    new Region("Wyżyna Krakowsko-Częstochowska", "192;60;60"),
    new Region("Niecka Nidziańska", "186;161;128"),
    new Region("Wyżyna Przedborska", "210;146;63"),
    new Region("Wyżyna Kielecka", "138;106;65"),
    new Region("Wzniesienia Południowomazowieckie", "213;106;8"),
    new Region("Nizina Środkowomazowiecka", "189;112;42"),
    new Region("Nizina Północnomazowiecka", "255;176;104"),
    new Region("Nizina Południowopodlaska", "219;144;76"),
    new Region("Nizina Staropruska", "255;217;81"),
    new Region("Pojezierze Mazurskie", "219;183;52"),
    new Region("Pojezierze Litewskie", "192;155;18"),
    new Region("Nizina Północnopodlaska", "228;204;118"),
    new Region("Polesie Zachodnie", "57;53;0"),
    new Region("Polesie Wołyńskie", "72;70;35"),
    new Region("Wyżyna Wołyńska", "132;132;132"),
    new Region("Kotlina Pobuża", "69;69;69"),
    new Region("Roztocze", "165;165;165"),
    new Region("Wyżyna Lubelska", "198;198;198"),
    new Region("Kotlina Sandomierska", "0;216;65"),
    new Region("Brama Krakowska", "123;162;102"),
    new Region("Kotlina Oświęcimska", "66;135;29"),
    new Region("Kotlina Ostrawska", "56;159;0"),
    new Region("Pogórze Zachodniobeskidzkie", "141;237;89"),
    new Region("Beskidy Zachodnie", "107;156;81"),
    new Region("Obniżenie Orawsko-Podhalańskie", "62;108;37"),
    new Region("Łańcuch Tatrzański", "77;99;65"),
    new Region("Beskidy Środkowe", "165;189;152"),
    new Region("Pogórze Środkowobeskidzkie", "92;165;52"),
    new Region("Płaskowyż Sańsko-Dniestrzański", "55;138;141"),
    new Region("Beskidy Lesiste", "10;181;186")
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
    const IMAGE_SRC = 'makroregionyRaw.png';

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