const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("click", startMusic, { once: true });

function startMusic() {
        music.play().catch(() => {});  
}

musicButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (music.paused) {
        music.play();
        musicButton.textContent = "🔊";
    } else {
        music.pause();
        musicButton.textContent = "🔇";
    }
});
menuButton.addEventListener("click",() => {
    sidebar.classList.toggle("open");
});

const language = document.getElementById("language");

language.addEventListener("change", function() {

    let page = window.location.pathname.split("/").pop();

    if (page === "") {
        page = "index.html";
    }

    if (language.value === "en") {
        window.location.href = "en/" + page;
    }

    if (language.value === "fr") {
        window.location.href = "../" + page;
    }

});