console.log("Welcome to Spotify");

//Initiallize the variables
let SongIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('SongItem'));

let songs = [
    { songName: "Humdard by Arijit Singh", filePath: "song/1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "FILHALL Akhsay kumar", filePath: "song/2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Bhula Dunga Darshan ravel", filePath: "song/3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Dil Ko Karaar Aayar - SONG ", filePath: "song/4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Kesariya Brahmāstra - NEW SONG ", filePath: "song/5.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "Humnava Mere jubin nautiyal ", filePath: "song/6.mp3", coverPath: "covers/cover6.jpg" },
    { songName: "Tu Hai Ki Nahi - ROY -SONGS", filePath: "song/7.mp3", coverPath: "covers/cover7.jpg" },
    { songName: "Raataan Lambiyan - SHERSHAH ", filePath: "song/8.mp3", coverPath: "covers/cover8.jpg" },
    { songName: "Kabhii Tumhhe - SHERSHAH", filePath: "song/9.mp3", coverPath: "covers/cover9.jpg" },
    { songName: "Bollywood  Akhil - MP3 SONG  ", filePath: "song/10.mp3", coverPath: "covers/cover10.jpg" },
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

//Handle paly/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songPlayItem')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songPlayItem')).
    forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            SongIndex = parseInt( e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `song/${SongIndex+1}.mp3`;
            masterSongName.innerText = songs[SongIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            
        })
    })

    document.getElementById('next').addEventListener('click',()=>{
        if(SongIndex>=9){
            SongIndex=0;
        }
        else{
            SongIndex += 1;
        }
        masterPlay.classList.add('fa-circle-pause'); audioElement.src = `song/${SongIndex+1}.mp3`;
        masterSongName.innerText = songs[SongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
        if(SongIndex<=0){
            SongIndex=0;
        }
        else{
            SongIndex -= 1;
        }
        masterPlay.classList.add('fa-circle-pause'); audioElement.src = `song/${SongIndex+1}.mp3`;
        masterSongName.innerText = songs[SongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})