window.onload = function() {
	// Get the HTML Canvas
  const canvas = document.getElementById("image_canvas");
  // Get the canvas context
  const ctx = canvas.getContext('2d');
  
  const coordinates = document.getElementById('coordinates');
  const color = document.getElementById('color');
  
  // Set this variable to any image source
  const IMAGE_SRC = 'http://localhost:8080/makroregionyRaw.png';

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
    ];
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
    ];

	// Create a new image and add it to your canvas
  const img = new Image();
  img.height = 1000;
  img.width =1000;
    // Wait for the image to load before drawing to the canvas
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0);
    }, false);
  img.src = IMAGE_SRC;
  // This is important to avoid cross origin errors
  img.setAttribute('crossOrigin', '');
  
  // Add a function to the mousemove event to get pixel data
  // NOTE: You should probably debounce this
  canvas.onmousemove = function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    let colorData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    let rgba = `rgba(${colorData[0]}, ${colorData[1]}, ${colorData[2]}, ${colorData[3]})`;
    
    coordinates.innerHTML = `X: ${mouseX}, Y: ${mouseY}`;
    color.innerHTML = rgba;
		color.style.color = rgba;
  }  
}