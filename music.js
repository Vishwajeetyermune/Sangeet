
const music=document.querySelector('audio')
const play=document.getElementById('play')
const img=document.querySelector('img')
const artist=document.getElementById('artist');
const title=document.getElementById('title')
const prev=document.getElementById('prev');
const next=document.getElementById('next')        

let progress=document.getElementById('progress')
let set_duration=document.getElementById('duration')
let current_time=document.getElementById('current_time')

const progress_div=document.getElementById('progress_div')

//array of object that stores song name ,artist etc
const songs=[
    { name:"Chaand Baaliyan",
      artist:" Aditya A"
    },
    {
        name:"Tu Ada Hai",
        artist:"Anonyms"
    }
]


let isPlaying=false;

//function to play the music
const playMusic=()=>{
    music.play(); // play() is inbuilt method in js 
        isPlaying=true;
        play.classList.replace('fa-play','fa-pause')
        img.classList.add('anime')
}


//pause music function

 const pauseMusic=()=>{
    music.pause();
        isPlaying=false;
        play.classList.replace('fa-pause','fa-play')
        img.classList.remove('anime')
}

play.addEventListener("click",()=>{
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
})


const loadSong=(songs)=>{
    title.textContent=songs.name
    artist.textContent=songs.artist;
    music.src=`./music/${songs.name}.mp3`;
}

loadSong(songs[0]);

let songIndex=0;

const nextSong=()=>{
    
    songIndex=(songIndex+1)%songs.length; //after last song when clicked on next it reaches to first song
    loadSong(songs[songIndex])
    playMusic()
}

const prevSong=()=>{
   
          
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex])
    // console.log(songIndex)
    playMusic()
}


// progress bar 

music.addEventListener('timeupdate',(event)=>{
    // console.log(event)
    // object destructuring
    const {currentTime,duration}=event.srcElement;
    // console.log(currentTime)
    // console.log(duration);

    //to calculate the percentage width
    let progress_time=(currentTime/duration)*100;
     console.log(progress_time)
    progress.style.width=`${progress_time}%`


    //update music duration
    //minutes=duration/60 and sec=duration%60
    
    let min_duration=Math.floor(duration/60);
    let sec_duration=Math.floor(duration%60);

    let total_duration=`${min_duration}:${sec_duration}`;

    if(duration){
    set_duration.textContent=total_duration;
    }


    //for current time
    // we get currentTime and total duration by default form js
    // in seconds
    let min_currentTime=Math.floor(currentTime/60);
    let sec_currentTime=Math.floor(currentTime%60);

    if(sec_currentTime<10){
        sec_currentTime=`0${sec_currentTime}`
    }

    let total_currentTime=`${min_currentTime}:${sec_currentTime}`;

    current_time.textContent=total_currentTime;
});

//progress on click functinality
progress_div.addEventListener('click',(event)=>{
    console.log(event)
    const{currentTime,duration}=music;
 
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;

    music.currentTime=move_progress;

})



//if music ended then load the next song

music.addEventListener("ended",nextSong)


next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);

