let progress = document.getElementsByClassName("progress")[0];
let song = document.getElementsByClassName("song")[0];
let playIcon = document.getElementsByClassName("playIcon")[0];
let next = document.getElementsByClassName("forward")[0];
let prev = document.getElementsByClassName("backward")[0];
let cover = document.getElementsByClassName("cover")[0];
let songSource = document.getElementsByClassName("songSource")[0];
let title = document.getElementsByClassName("title")[0];
let artist = document.getElementsByClassName("artist")[0];
let currentTime = document.getElementsByClassName("currentTime")[0];
let songLength = document.getElementsByClassName("songLength")[0];

let data;
let isplay = false;
let songNum = 0;

$.getJSON("../resPlayer/data.json", function(json) {
    data = json;
    after();
});

function after(){

    next.onclick = function(){
        if(songNum < 4){
            songNum++;
        }else{
            songNum = 0;
        }
        updateSong(songNum);
    }

    prev.onclick = function(){
        if(songNum != 0){
            songNum--;
        }else{
            songNum = 4;
        }
        updateSong(songNum);
    }

    let updateSong = function(songNum){
        cover.src = "../resPlayer/" + data[songNum].cover;
        songSource.src = "../resPlayer/" + data[songNum].mp3;
        title.innerHTML = data[songNum].title;
        artist.innerHTML = data[songNum].artist;

        song.currentTime = 0;
        song.load();
        
        song.play();
        playIcon.classList.remove("play");
        playIcon.classList.add("pause");
        playIcon.src = "../resPlayer/pause.png";
        isplay = true;
    }

    song.onloadedmetadata = function(){
        progress.max = song.duration;
        progress.value = song.currentTime;

        let songWhl = Math.floor(song.duration);
        let minutes = Math.floor(songWhl/60);
        let seconds = songWhl - minutes * 60;

        if(seconds < 10){
            seconds = "0" + seconds;
        }
        
        songLength.innerHTML = minutes + ":" + seconds;
    }
    
    playIcon.onclick = function(){
        if(playIcon.classList.contains("pause")){
            song.pause();
            playIcon.classList.remove("pause");
            playIcon.classList.add("play");
            playIcon.src = "../resPlayer/play.png";
            isplay = false;
        }else{
            song.play();
            playIcon.classList.remove("play");
            playIcon.classList.add("pause");
            playIcon.src = "../resPlayer/pause.png";
            isplay = true;
        }
    }
    
    setInterval(() => {
        if(isplay){
            progress.value = song.currentTime;

            let songWhl = Math.floor(song.currentTime);
            let minutes = Math.floor(songWhl/60);
            let seconds = songWhl - minutes * 60;

            if(seconds < 10){
                seconds = "0" + seconds;
            }
            
            currentTime.innerHTML = minutes + ":" + seconds;
        }
    }, 500);
    
    progress.onchange = function(){
        song.currentTime = progress.value;
    }
}
