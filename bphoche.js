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

if (grid && searchInput) {

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
/* <img src="${#membre.photo}" loading="lazy" alt="${membre.nom}"> */
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
}
// ====================
// CLASSEMENT
// ====================

const podium = document.getElementById("podium");
const rankingList = document.getElementById("ranking-list");

if (podium && rankingList) {

    fetch("#")
        .then(response => {

            console.log("Réponse JSON :", response);

            if (!response.ok) {
                throw new Error("Impossible de charger classement.json");
            }

            return response.json();

        })

        .then(data => {

            console.log("Données reçues :", data);

            afficherChad(data);

        })

        .catch(error => {

            console.error("ERREUR :", error);

        });


    function afficherChad(chads) {

        podium.innerHTML = "";
        rankingList.innerHTML = "";

        console.log("Nombre de membres :", chads.length);


        // =========================
        // PODIUM
        // =========================

        const premiers = chads.slice(0, 3);

        const ordrePodium = [
            premiers[1], // #2
            premiers[0], // #1
            premiers[2]  // #3
        ];


        ordrePodium.forEach(membre => {

            if (!membre) return;

            const card = document.createElement("div");

            card.className = `podium-member position-${membre.position}`;

            card.innerHTML = `
                <div class="podium-photo">
                    <img src="${membre.photo}" alt="${membre.nom}">
                </div>

                <div class="podium-position">
                    #${membre.position}
                </div>

                <h2>${membre.nom}</h2>

                <p>${membre.rank}</p>
            `;

            podium.appendChild(card);

        });


        // =========================
        // CLASSEMENT #4 → #10
        // =========================

        chads.slice(3, 10).forEach(membre => {

            const ligne = document.createElement("div");

            ligne.className = "ranking-member";

            ligne.innerHTML = `
                <div class="ranking-position">
                    ${membre.position}
                </div>

                <img src="${membre.photo}" alt="${membre.nom}">

                <div class="ranking-name">
                    <h3>${membre.nom}</h3>
                    <p>${membre.rank}</p>
                </div>

                <div class="ranking-like">
                    ❤️
                </div>
            `;

            rankingList.appendChild(ligne);

        });

    }

}
