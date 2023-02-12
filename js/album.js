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
        <li class="list-group-item d-flex align-items-center">
            <img src="assets/play-button.png" alt="" height="30px" class="me-3">
            <div>
                <div>${track.title}</div>
                <div>${track.author}</div>
            </div>
            <div class="ms-auto">${track.time}</div>
        </li>
    `
}