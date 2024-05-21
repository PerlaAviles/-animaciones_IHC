// Función del sistema solar
function initSolarSystem() {
  // Declaración de variables para almacenar las imágenes del sol, la luna y la tierra
  let sun = new Image();
  let moon = new Image();
  let earth = new Image();

  // Obtiene el contexto de dibujo del canvas con id "canvasSolarSystem"
  const canvas = document.getElementById("canvasSolarSystem");
  const ctx = canvas.getContext("2d");

  // Contador de imágenes cargadas
  let imagesLoaded = 0;

  // Función para verificar si todas las imágenes están cargadas
  function checkImagesLoaded() {
      imagesLoaded++;
      if (imagesLoaded === 3) {
          console.log("Todas las imágenes han sido cargadas.");
          window.requestAnimationFrame(drawSolarSystem);
      }
  }

  // Asignación de la fuente y evento de carga de las imágenes
  sun.src = "canvas_sun.png";
  sun.onload = checkImagesLoaded;
  sun.onerror = function () {
      console.error("Error al cargar la imagen del sol.");
  };

  moon.src = "canvas_moon.png";
  moon.onload = checkImagesLoaded;
  moon.onerror = function () {
      console.error("Error al cargar la imagen de la luna.");
  };

  earth.src = "canvas_earth.png";
  earth.onload = checkImagesLoaded;
  earth.onerror = function () {
      console.error("Error al cargar la imagen de la tierra.");
  };

  // Función que dibuja los elementos en el canvas
  function drawSolarSystem() {
      // Establece la operación de composición para dibujar detrás de las imágenes ya dibujadas
      ctx.globalCompositeOperation = "destination-over";
      // Limpia el canvas para el siguiente cuadro de la animación
      ctx.clearRect(0, 0, 300, 300);

      // Establece el estilo de relleno y trazo
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.strokeStyle = "rgba(0,153,255,0.4)";
      // Guarda el estado del contexto
      ctx.save();
      // Traslada el origen del sistema de coordenadas al centro del canvas
      ctx.translate(150, 150);

      // Calcula el tiempo actual
      let time = new Date();
      // Rota el contexto para la posición de la tierra
      ctx.rotate(
          ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      // Traslada el contexto a la posición de la tierra en su órbita
      ctx.translate(105, 0);
      // Dibuja una sombra para la tierra
      ctx.fillRect(0, -12, 50, 24);
      // Dibuja la imagen de la tierra
      ctx.drawImage(earth, -12, -12);

      // Guarda el estado del contexto antes de dibujar la luna
      ctx.save();
      // Rota el contexto para la posición de la luna
      ctx.rotate(
          ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      // Traslada el contexto a la posición de la luna en su órbita alrededor de la tierra
      ctx.translate(0, 28.5);
      // Dibuja la imagen de la luna
      ctx.drawImage(moon, -3.5, -3.5);
      // Restaura el estado del contexto después de dibujar la luna
      ctx.restore();

      // Restaura el estado del contexto después de dibujar la tierra y su órbita
      ctx.restore();

      // Dibuja la órbita terrestre
      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
      ctx.stroke();

      // Dibuja la imagen del sol en el centro del canvas
      ctx.drawImage(sun, 0, 0, 300, 300);

      // Llama a drawSolarSystem de nuevo para crear una animación continua
      window.requestAnimationFrame(drawSolarSystem);
  }
}

// Función del reloj
function clock() {
  const now = new Date();
  const canvas = document.getElementById("canvasClock");
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
          ctx.beginPath();
          ctx.moveTo(117, 0);
          ctx.lineTo(120, 0);
          ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctx.fillStyle = "black";

  // Write Hours
  ctx.save();
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min);
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Write Minutes
  ctx.save();
 
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgb(0 0 0 / 0%)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

// Llamada a la función para iniciar el sistema solar al cargar la página
initSolarSystem();
// Llamada a la función para iniciar el reloj al cargar la página
window.requestAnimationFrame(clock);

// Código para el canvas de la imagen en movimiento
const img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.
img.src = "capitan_meadows_yosemite_national_park.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30; // lower is faster
const scale = 1.05;
const y = -4.5; // vertical offset

// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > canvasXSize) {
      // Image larger than canvas
      x = canvasXSize - imgW;
  }

  // Check if image dimension is larger than canvas
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  // Get canvas context
  ctx = document.getElementById("canvas").getContext("2d");

  // Set refresh rate
  return setInterval(draw, speed);
};

function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

  // If image is <= canvas size
  if (imgW <= canvasXSize) {
      // Reset, start from beginning
      if (x > canvasXSize) {
          x = -imgW + x;
      }

      // Draw additional image1
      if (x > 0) {
          ctx.drawImage(img, -imgW + x, y, imgW, imgH);
      }

      // Draw additional image2
      if (x - imgW > 0) {
          ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
      }
  } else {
      // Image is > canvas size
      // Reset, start from beginning
      if (x > canvasXSize) {
          x = canvasXSize - imgW;
      }

      // Draw additional image
      if (x > canvasXSize - imgW) {
          ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
      }
  }

  // Draw image
  ctx.drawImage(img, x, y, imgW, imgH);

  // Amount to move
  x += dx;
}
