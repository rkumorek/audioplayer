// Check for webp support
async function supportsWebp() {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

//---------------------------------------------------------
let song, tracksIndex, ext;
const dir = "assets/audio/";
const playlist = ["Alan Walker + Linkin Park - One More Light Faded (MASHUP)",
  "Zaz - Si jamais joublie", "Johnny Cash - Heart Of Gold",
  "Merle Haggard - Are the Good Times Really Over",
  "The Boys Of Summer - Don Henley"]
playlistIndex = 0;

// Audio Object
song = new Audio();
ext = ".mp3";
// Animate progress circle when song is playing
song.onplaying = function () {
  requestAnimFrame(roundTimer);
}
// Play next song if current one is finished
song.addEventListener('ended', function () {
  if (playlistIndex == playlist.length - 1) {
    playlistIndex = 0;
  } else {
    playlistIndex++;
  }
  loadSong();
})


// Play song on page load
function loadSong() {
  song.src = dir + playlist[playlistIndex] + ext;
  //song.autoplay = true;
  //Author and title
  let track = playlist[playlistIndex].split(/\s-\s(.*)/g);
  let author = track[0];
  let title = track[1];
  document.getElementById("title").innerHTML = title;
  document.getElementById("author").innerHTML = "by " + author;
  roundTimer();

  // Background images 
  const picture = document.querySelector("body");
  (async () => {
    if(await supportsWebp()) {
      picture.setAttribute("style", "background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./assets/images/" + playlistIndex + ".webp); background-size: cover; background-position: center center;")
    }
    else {
      picture.setAttribute("style", "background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./assets/images/" + playlistIndex + ".jpg); background-size: cover; background-position: center center;")
    }
  })();
};
window.onload = loadSong();

// Controls with svg object
const nextSVG = document.querySelector("svg.next"),
  prevSVG = document.querySelector("svg.prev"),
  playlistSVG = document.querySelector("svg.showPlaylist");
  playpauseSVG = document.querySelector("svg.play"),
  closeSVG = document.querySelector("svg.close"),

  playpauseSVG.onclick = function () {
    if (song.paused) {
      song.play();
    } else {
      song.pause();
    }
  }

nextSVG.onclick = function () {
  if (playlistIndex == playlist.length - 1) {
    playlistIndex = 0;
  } else {
    playlistIndex++;
  }
  loadSong();
}

prevSVG.onclick = function () {
  playlistIndex--;
  if (playlistIndex < 0) {
    playlistIndex = playlist.length - 1;
  } else {
    playlistIndex;
  }
  loadSong();
}

const outer = document.querySelector('.outer');
const back = document.querySelector('.playlist');
function hasClass(elem, klass) {
  return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

playlistSVG.onclick = function () {
  if (hasClass(outer, 'show')) {
    outer.classList.remove("show");
    outer.classList.add("hide");
    lineTimer();
  }
  back.classList.remove("hidden");
}

closeSVG.onclick = function () {
  if (hasClass(outer, 'hide')) {
    outer.classList.remove("hide");
    outer.classList.add("show");
    roundTimer();
  }
  back.classList.add("hidden");
}

// Playlist
let y = document.getElementById("tracks");
for (i = 1; i <= playlist.length; i++) {
  let p = "<p>" + i + ". " + playlist[i - 1] + "</br></p>"
  y.insertAdjacentHTML('beforeend', p);
}
