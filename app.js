let canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control__color");
const range = document.getElementById("jsRange");

canvas.width = 400;
canvas.height = 400;

// 초기 선 상태 등록
let painting = false;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";

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
  ctx.strokeStyle = event.target.style.backgroundColor;
  //   console.log(event.target.style.backgroundColor);
}

// 브러쉬 두께 조절
function changeBrushHandler(event) {
  //   console.log(jsRange.value);
  ctx.lineWidth = jsRange.value;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColorHandler)
);

jsRange.addEventListener("mouseup", changeBrushHandler);
