const ctx = document.getElementById("canvas").getContext("2d"),
  start = Math.PI * 1.5,
  cw = ctx.canvas.width,
  ch = ctx.canvas.height;
let progress, delta = 0, x = 1;

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function roundTimer() {
  delta = (song.currentTime / song.duration);
  progress = (2 * Math.PI * delta);
  let min = Math.floor(song.currentTime / 60);
  let sec = Math.floor(song.currentTime % 60);
  if (sec < 10) { sec = "0" + sec; }
  min = (min < 10) ? "0" + min : min;

  ctx.clearRect(0, 0, cw, ch);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(255, 255, 255, " + x + ")";
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 249, start, progress + start, false)
  ctx.stroke();
  requestAnimFrame(roundTimer);

  ctx.font = "3rem Roboto"
  ctx.fillStyle = "rgba(255, 255, 255, " + x + ")";
  ctx.fillText(min + ":" + sec, 199, 220);

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.arc(cw / 2, ch / 2, 249, 0, 2 * Math.PI, false)
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 175, 0, 2 * Math.PI);
  ctx.stroke();
}

function lineTimer() {
  delta = (song.currentTime / song.duration);
  progress = ((cw - 20) * delta);
  ctx.clearRect(0, 0, cw, ch);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 4);
  ctx.lineTo(cw - 10, 4);
  ctx.stroke();

  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(10, 4);
  ctx.lineTo(10 + progress, 4);
  ctx.stroke();
  requestAnimFrame(lineTimer);
}