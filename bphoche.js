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

// ====================
// MEMBRES
// ====================

// ====================
// MEMBRES
// ====================

const grid = document.querySelector(".members-grid");
const searchInput = document.getElementById("searchMember");

let membres = [];

fetch("members.json")
    .then(response => response.json())
    .then(data => {

        membres = data;

        afficherMembres(membres);

    });

function afficherMembres(liste) {

    grid.innerHTML = "";

    liste.forEach(membre => {

        const card = document.createElement("div");

        card.className = "member";
        card.id = membre.id;

        card.innerHTML = `
            <img src="${membre.photo}" alt="${membre.nom}">
            <h2>${membre.nom}</h2>
            <h3 class="rank">${membre.rank}</h3>
            <p class="classe">${membre.classe}</p>
            <p class="description">${membre.description}</p>
        `;

        grid.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {

    const recherche = searchInput.value.toLowerCase();

    const resultats = membres.filter(membre =>
        membre.nom.toLowerCase().includes(recherche) ||
        membre.classe.toLowerCase().includes(recherche) ||
        membre.rank.toLowerCase().includes(recherche)
    );

    afficherMembres(resultats);
});
