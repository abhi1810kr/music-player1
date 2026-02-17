let progress = document.getElementById("progressBar");
let song = document.getElementById("song");
let playPuase = document.getElementById("play-pause");
let action = document.getElementById("action");
let next = document.getElementById("nextBtn");
let previous = document.getElementById("backBtn");

let music = 1;

progress.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
  song.play();
});

const playNext = function(){
   if (music > 2) music = 0;
  song.src = `musics/music-${++music}.mp3`;
  playToPause();
  song.play();
};

const playPrevious = function(){
    music--;
  if (music < 1) music = 3;
  song.src = `musics/music-${music}.mp3`;
  playToPause();
  song.play();
}

const playToPause = function () {
  action.classList.remove("fa-play");
  action.classList.add("fa-pause");
};

const pauseToPlay = function () {
  action.classList.remove("fa-pause");
  action.classList.add("fa-play");
};

playPuase.addEventListener("click", () => {
  if (action.classList.contains("fa-play")) {
    playToPause();
    song.play();
  } else {
   pauseToPlay();
    song.pause();
  }
});

song.onplaying = function () {
  setInterval(() => {
    progress.max = song.duration;
    progress.value = song.currentTime;
    if(progress.value == Math.floor(progress.max)){
      pauseToPlay();
      playNext();
    }
  }, 1);
};

progress.addEventListener("change", () => {
  song.play();
  song.currentTime = progress.value;
  playToPause();
  
});

next.addEventListener("click", playNext);

previous.addEventListener("click", playPrevious);


