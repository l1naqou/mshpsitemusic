let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

let album = albums[i];

container.innerHTML = `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${album.image}" class="img-fluid rounded-start" alt="rock">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.description}</p>
                <p class="card-text"><small class="text-muted">${album.year}</small></p>
            </div>
            </div>
        </div>
    </div>
`;

let tracks = album.tracks;

for(let i = 0; i < tracks.length; i++){
    let track = tracks[i];

    playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="assets/play-button.png" alt="" height="30px" class="play me-3">
            <img src="assets/playing.png" height="30px" class="playing me-3 d-none">
            <div>
                <div>${track.title}</div>
                <div class="text-secondary">${track.author}</div>
            </div>
            <div class="time ms-auto">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>
    `
}

function setupAudio() {
    // Найди коллекцию с треками

    let trackNodes = document.querySelectorAll(`.track`); 
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i]; 
        let timeNode = node.querySelector(`.time`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);

        function updateProgress(isPlaying) {
            // Нарисовать актуальное время
            timeNode.innerHTML = getTime(audio.currentTime);
            if (isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
        }
    

        let isPlaying = false;
        node.addEventListener(`click`, function () {
            let playButton = node.querySelector(`.play`);
            let playingButton = node.querySelector(`.playing`);
            // Если трек сейчас играет...
            if (isPlaying) {
                isPlaying = false;
                // Поставить на паузу
                playButton.classList.remove(`d-none`);
                playingButton.classList.add(`d-none`);

                audio.pause();

            // Если трек сейчас не играет...
            } else {
                isPlaying = true;
                // Включить проигрывание
                playButton.classList.add(`d-none`);
                playingButton.classList.remove(`d-none`);

                audio.play();
                updateProgress(isPlaying);
            }
        });
    }
}

function getTime(time){
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);

    if (minutes < 10){
        minutes = `0` + minutes;
    }
    if (seconds < 10){
        seconds = `0` + seconds;
    }
    
    return `${minutes}:${seconds}`
}

setupAudio();
