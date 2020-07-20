let canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("js_fill");
const savebtn = document.getElementById("js_save");

canvas.width = 400;
canvas.height = 400;

// 초기 선 상태 등록
let painting = false;
let filling = false;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";
ctx.fillStyle = "black";

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  //   console.log(x, y);
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 색 변환
function changeColorHandler(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function modeHandler() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = "paint";
  } else {
    filling = true;
    mode.innerHTML = "fill";
  }
}

function fillingHandler() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// 파일 저장
function saveHandler() {
  const link = document.createElement("a");
  const img = canvas.toDataURL();
  link.href = img;
  link.download = "paintJS";
  link.click();
}

// 브러쉬 두께 조절
function changeBrushHandler(event) {
  ctx.lineWidth = jsRange.value;
}

function contextmenuHandler(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillingHandler);
  canvas.addEventListener("contextmenu", contextmenuHandler);
}

if (jsRange) {
  jsRange.addEventListener("mouseup", changeBrushHandler);
}

if (mode) {
  mode.addEventListener("click", modeHandler);
}

if (savebtn) {
  savebtn.addEventListener("click", saveHandler);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColorHandler)
  );
}
