let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
/*------------songs track-------------------*/

const music_list = [
    {
        img:'Hass.png',
        name : '𝗛𝗮𝘀𝘀 𝗛𝗮𝘀𝘀',
        artist : '𝗗𝗶𝗹𝗷𝗶𝘁 𝗗𝗼𝘀𝗮𝗻𝗷𝗵, 𝗦𝗶𝗮, 𝗚𝗿𝗲𝗴 𝗞𝘂𝗿𝘀𝘁𝗶𝗻',
        music : 'hass.mp3',
    
    },
    {
        img: 'malang.png',
        name : '𝗠𝗮𝗹𝗮𝗻𝗴 𝘀𝗮𝗷𝗻𝗮',
        artist : '𝗦𝗮𝗰𝗵𝗲𝘁-𝗣𝗮𝗿𝗮𝗺𝗽𝗮𝗿𝗮',
        music : 'Malang.mp3'
    },
    {
        img : 'jawan1.png',
        name : '𝐉𝐚𝐰𝐚𝐧 𝐓𝐢𝐭𝐥𝐞 𝐭𝐫𝐚𝐜𝐤',
        artist : '𝐀𝐧𝐢𝐫𝐮𝐝𝐡 𝐑𝐚𝐯𝐢𝐜𝐡𝐚𝐧𝐝𝐫𝐚, 𝐑𝐚𝐣𝐚 𝐊𝐮𝐦𝐚𝐫𝐢',
        music : 'jawan.mp3'
    },
    {
        img : 'jawan2.jpg',
        name : '𝗖𝗵𝗮𝗹𝗲𝘆𝗮',
        artist : '𝐀𝐧𝐢𝐫𝐮𝐝𝐡 𝐑𝐚𝐯𝐢𝐜𝐡𝐚𝐧𝐝𝐫𝐚',
        music : 'chaleya.mp3'
    },
    {
        img : 'baby1.jpg',
        name : '𝗹𝗲𝘃𝗶𝘁𝗮𝘁𝗶𝗻𝗴',
        artist : '𝗗𝘂𝗮 𝗟𝗶𝗽𝗮',
        music : 'levitating.mp3'
    },
    {
        img : 'onthefloor.jpg',
        name : '𝗢𝗡 𝘁𝗵𝗲 𝗳𝗹𝗼𝗼𝗿',
        artist : '𝗝𝗲𝗻𝗻𝗶𝗳𝗲𝗿 𝗟𝗼𝗽𝗲𝘇,𝗟𝗼𝘃𝗲𝗿',
        music : 'On The Floor.mp3'
    },
    {
        img : 'lover.jpg',
        name : '𝗟𝗼𝘃𝗲𝗿',
        artist : '𝗧𝗮𝘆𝗹𝗼𝗿 𝗦𝘄𝗶𝗳𝘁',
        music : 'lover.mp3'


    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "You Are In Music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e','f','g','h','i','j','k+1','l+','m','n','p','q','7'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    //wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    //wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}