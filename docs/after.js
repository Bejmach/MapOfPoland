//init files, react lover suggestion
window.onload = function () {
    let experience = getLocalStgOr("xp", 0);
    let lvl = getLocalStgOr("lvl", 1);
    let curFibonachi = 2 + lvl;
    let expCap = fibonacci(curFibonachi);

    const lvlBar = document.querySelector("#myBar");
    const lvlText = document.querySelector("#overlayText");
    
    //mooved here because it needs variables provided on window load, and is needed to the rest of the code
    function moveBar(curAmmount, maxAmmount) {
        //because the change of fibonachi, the exp cap is defined as bigint, so converting to number was needed;
        var width = Math.ceil(curAmmount / Number(maxAmmount) * 100);
        lvlBar.style.width = width + "%";
    }

    function expUp() {
        experience += 1;
        updateXP();
    }
    function updateXP() {
        if (experience >= expCap) {
            lvl += 1;
            curFibonachi += 1;
            expCap = fibonacci(curFibonachi);
            experience = 0;
            if (expCap <= 0) {
                console.log("Wow. Int overload... that was so unexpected... If your testing this library, then I understand how you got here, else... go touch some grass, pls");
            }
        }

        saveXPAndLvl(experience, lvl);

        moveBar(experience, expCap);
        lvlText.innerText = experience + "/" + expCap + " XP, level " + lvl;
    }

    moveBar(experience, expCap);
    lvlText.innerText = experience + "/" + expCap + " XP, level " + lvl;

    const canvas = document.querySelector("#image_canvas");
    // Get the canvas context
    const ctx = canvas.getContext('2d');

    const name = document.querySelector('#name');
    const points = document.querySelector('#points');

    const chosen = document.querySelector('#chosen');

    const img = new Image();
    img.height = 700;
    img.width = 800;
    // Wait for the image to load before drawing to the canvas
    img.addEventListener('load', function () {
        ctx.drawImage(img, 0, 0);
    }, false);

    //This is important to avoid cross origin errors(now it is before the variable. Thank you for so usefull suggestion React lover)
    img.crossOrigin = '';
    img.src = IMAGE_SRC;

    let pointCounter = 0;

    let randomRegion = regions[RandomInt(regions.length)];

    name.innerText = randomRegion.name;
    points.innerText = pointCounter;

    canvas.onmousedown = function (e) {
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        let colorData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        let rgb = `${colorData[0]};${colorData[1]};${colorData[2]}`;
        //stays for debugging
        //console.log(rgb);

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
    }//new line here, react lover suggestion
    else {
        canvasContainer.classList.remove("hardcore");
    }
});