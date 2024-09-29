function RandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.onload = function() {
	// Get the HTML Canvas
  const canvas = document.getElementById("image_canvas");
  // Get the canvas context
  const ctx = canvas.getContext('2d');
  
  const coordinates = document.getElementById('coordinates');
  const color = document.getElementById('color');

  const name = document.getElementById('name');
  const points = document.getElementById('points');

  const chosen = document.getElementById('chosen');
  
  // Set this variable to any image source
  const IMAGE_SRC = 'makroregionyRaw.png';

  const colorArray = ["89;78;237", 
    "56;45;207", 
    "16;5;162",
    "255;57;249",
    "174;63;171",
    "186;86;183",
    "216;81;212",
    "255;89;250",
    "246;136;243",
    "213;118;210",
    "120;3;116",
    "180;52;176",
    "207;18;201",
    "255;185;249",
    "240;18;233",
    "93;37;81",
    "138;96;129",
    "129;71;18",
    "162;87;18",
    "189;91;3",
    "255;36;208",
    "228;17;0",
    "255;122;112",
    "246;79;65",
    "165;75;68",
    "189;76;81",
    "246;185;84",
    "255;0;11",
    "225;115;115",
    "192;60;60",
    "186;161;128",
    "210;146;63",
    "138;106;65",
    "213;106;8",
    "189;112;42",
    "255;176;104",
    "219;144;76",
    "255;217;81",
    "219;183;52",
    "192;155;18",
    "228;204;118",
    "57;53;0",
    "72;70;35",
    "132;132;132",
    "69;69;69",
    "165;165;165",
    "198;198;198",
    "0;216;65",
    "123;162;102",
    "66;135;29",
    "56;159;0",
    "141;237;89",
    "107;156;81",
    "62;108;37",
    "77;99;65",
    "165;189;152",
    "92;165;52",
    "55;138;141",
    "10;181;186"];
  const nameArray = ["Pobrzeże Szczecińskie", 
    "Pobrzeże Koszalińskie",
    "Pobrzeże Grańskie",
    "Pojezierze Wschodnio-pomorskie",
    "Pojezierze Zachodniopomorskie",
    "Pojezierze Połódniowopomorskie",
    "Dolina Dolnej Wisły",
    "Pojezierze Iławskie",
    "Pojezierze Chełmińsko-Dobrzyńskie",
    "Pradolina Toruńsko-Eberswaldzka",
    "Pojezierze Wielkopolskie",
    "Pojezierze Lubuskie",
    "Pradolina Warciańsko-Odrzańska",
    "Pojezierze Leszczyńskie",
    "Wzniesienie Zielonogórskie",
    "Obniżenie Dolnołużyckie",
    "Wzniesienia Łużyckie",
    "Obniżenie Milicko-Głogowskie",
    "Nizina Południowowielkopolska",
    "Wał Trzebnicki",
    "Nizina Śląsko-Łużycka",
    "Pogórze Zachodniosudeckie",
    "Sudety Zachodnie",
    "Sudety Środkowe",
    "Przedgórze Sudeckie",
    "Sudety Wschodnie",
    "Nizina Śląska",
    "Wyżyna Woźnicko-Wieluńska",
    "Wyżyna Śląska",
    "Wyżyna Krakowsko-Częstochowska",
    "Niecka Nidziańska",
    "Wyżyna Przedborska",
    "Wyżyna Kielecka",
    "Wzniesienia Południowomazowieckie",
    "Nizina Srodkowomazowiecka",
    "Nizina Północkomazowiecka",
    "Nizina Południowopodlaska",
    "Nizina Staropruska",
    "Pojezierze Mazurskie",
    "Pojezierze Litewskie",
    "Nizina Północnopodlaska",
    "Polesie Zachodnie",
    "Polesie Wołyńskie",
    "Wyżyna Wołyńska",
    "Kotlina Pobuża",
    "Roztocze",
    "Wyżyna Lubelska",
    "Kotlina Sandomierska",
    "Brama Krakowska",
    "Kotlina Oświęcimska",
    "Kotlina Ostrawska",
    "Pogórze Zachodniobeskidzkie",
    "Beskidy Zachodnie",
    "Obniżenie Orawsko-Podhalańskie",
    "Łańcuch Tatrzański",
    "Beskidy Środkowe",
    "Pogórze Środkowobeskidzkie",
    "Płaskowyż Sańsko-Dniestrzański",
    "Beskidy Lesiste"];

	// Create a new image and add it to your canvas
  const img = new Image();
  img.height = 1000;
  img.width =1000;
    // Wait for the image to load before drawing to the canvas
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0);
    }, false);

  // This is important to avoid cross origin errors
  img.crossOrigin = "";
  img.src = IMAGE_SRC;
  
  var randomId = RandomInt(nameArray.length);
  name.innerHTML = nameArray[randomId];
  var pointCounter = 0;
  points.innerHTML = pointCounter;
  
  // Add a function to the mousemove event to get pixel data
  // NOTE: You should probably debounce this
  canvas.onmousedown = function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    let colorData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    let rgb = `${colorData[0]};${colorData[1]};${colorData[2]}`;
    chosen.innerHTML =  nameArray[colorArray.indexOf(rgb)];
    
    coordinates.innerHTML = `X: ${mouseX}, Y: ${mouseY}`;
    color.innerHTML = rgb;

    if(colorArray[randomId] == rgb){
      randomId = RandomInt(nameArray.length);
      name.innerHTML = nameArray[randomId];
      pointCounter+=1;
      points.innerHTML = pointCounter;
    }
  }  
}