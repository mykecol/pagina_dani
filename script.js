/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const botonAbrir = document.getElementById("btnAbrir");
const escena = document.querySelector(".scene");
const menu = document.getElementById("menuSection");

/* =========================================================
   SEGUIMIENTO DE EVENTOS
========================================================= */

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbyTbaZXYBntb-3tEiDGljzjblk7WLmrffX5ENiqRaPgleI5DYIOtupQRFEjtqzQdptB-A/exec";


function registrarEvento(evento, pagina, detalles = "") {

    fetch(URL_APPS_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            evento: evento,
            usuario: "Dani",
            pagina: pagina,
            detalles: detalles
        })
    });

}

registrarEvento(
    "pagina_vista",
    "principal",
    "Dani abrió la página"
);


/* =========================================================
   ABRIR CARTA PRINCIPAL
========================================================= */

botonAbrir.addEventListener("click", function () {

    botonAbrir.innerHTML = "Abriendo... 💕";
    botonAbrir.disabled = true;

    setTimeout(function () {
        escena.classList.add("hide");
    }, 300);

    setTimeout(function () {
        menu.classList.add("active");
    }, 800);

});


/* =========================================================
   ====================== CARTAS ==========================
========================================================= */

const btnCartas = document.getElementById("btnCartas");
const letterSection = document.getElementById("letterSection");
const backFromLetter = document.getElementById("backFromLetter");

const pages = document.querySelectorAll(".letter-page");
const dots = document.querySelectorAll(".dot");

const nextPage = document.getElementById("nextPage");
const prevPage = document.getElementById("prevPage");

let currentPage = 0;
let changingPage = false;

const FLIP_DURATION = 900;


/* ---------------------------------------------------------
   ABRIR CARTAS
--------------------------------------------------------- */

btnCartas.addEventListener("click", function () {

    registrarEvento(
        "carta_abierta",
        "cartas",
        "Dani abrió las cartas"
    );

    menu.classList.remove("active");

    setTimeout(function () {

        letterSection.classList.add("active");

        updateDots();
        updateButtons();

    }, 300);

});


/* ---------------------------------------------------------
   ANIMACIÓN DE PÁGINA
--------------------------------------------------------- */

function flipPage(index, toFlipped) {

    const page = pages[index];

    if (!page) return;

    page.classList.add("turning");

    if (toFlipped) {

        page.classList.add("flipped");

        setTimeout(function () {

            page.classList.add("behind");
            page.classList.remove("turning");

        }, FLIP_DURATION);

    } else {

        page.classList.remove("behind");
        page.classList.remove("flipped");

        setTimeout(function () {

            page.classList.remove("turning");

        }, FLIP_DURATION);

    }

}


/* ---------------------------------------------------------
   CAMBIAR DE PÁGINA
--------------------------------------------------------- */

function goToPage(target) {

    if (changingPage) return;

    if (target < 0 || target >= pages.length) return;

    if (target === currentPage) return;

    changingPage = true;

    if (target > currentPage) {

        for (let i = currentPage; i < target; i++) {
            flipPage(i, true);
        }

    } else {

        for (let i = currentPage - 1; i >= target; i--) {
            flipPage(i, false);
        }

    }

    currentPage = target;

    updateDots();
    updateButtons();

    setTimeout(function () {

        changingPage = false;

    }, FLIP_DURATION + 50);

}


/* ---------------------------------------------------------
   ACTUALIZAR PUNTOS
--------------------------------------------------------- */

function updateDots() {

    dots.forEach(function (dot, index) {

        dot.classList.toggle(
            "active",
            index === currentPage
        );

    });

}


/* ---------------------------------------------------------
   ACTUALIZAR BOTONES
--------------------------------------------------------- */

function updateButtons() {

    if (prevPage) {
        prevPage.disabled = currentPage === 0;
    }

    if (nextPage) {
        nextPage.disabled =
            currentPage === pages.length - 1;
    }

}


/* ---------------------------------------------------------
   BOTÓN SIGUIENTE
--------------------------------------------------------- */

nextPage.addEventListener("click", function () {

    goToPage(currentPage + 1);

});


/* ---------------------------------------------------------
   BOTÓN ANTERIOR
--------------------------------------------------------- */

prevPage.addEventListener("click", function () {

    goToPage(currentPage - 1);

});


/* ---------------------------------------------------------
   PUNTOS
--------------------------------------------------------- */

dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        goToPage(index);

    });

});


/* ---------------------------------------------------------
   VOLVER DE CARTAS
--------------------------------------------------------- */

backFromLetter.addEventListener("click", function () {

    letterSection.classList.remove("active");

    setTimeout(function () {

        menu.classList.add("active");

    }, 400);

});


updateDots();
updateButtons();


/* =========================================================
   ====================== FOTOS ============================
========================================================= */

const btnFotos = document.getElementById("btnFotos");
const fotosSection = document.getElementById("fotosSection");
const backFromFotos = document.getElementById("backFromFotos");

const photoItems = document.querySelectorAll(".photo-item");

const photoLightbox = document.getElementById("photoLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");


/* ---------------------------------------------------------
   ABRIR FOTOS
--------------------------------------------------------- */

btnFotos.addEventListener("click", function () {

    registrarEvento(
        "fotos_abiertas",
        "fotos",
        "Dani abrió las fotos"
    );

    menu.classList.remove("active");

    setTimeout(function () {

        fotosSection.classList.add("active");

    }, 300);

});


/* ---------------------------------------------------------
   VOLVER DE FOTOS
--------------------------------------------------------- */

backFromFotos.addEventListener("click", function () {

    fotosSection.classList.remove("active");

    setTimeout(function () {

        menu.classList.add("active");

    }, 400);

});


/* ---------------------------------------------------------
   ABRIR FOTO
--------------------------------------------------------- */

photoItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        if (!image) return;

        lightboxImg.src = image.src;

        lightboxCaption.textContent =
            item.dataset.caption || "";

        photoLightbox.classList.add("active");

    });

});


/* ---------------------------------------------------------
   CERRAR FOTO
--------------------------------------------------------- */

lightboxClose.addEventListener("click", function () {

    photoLightbox.classList.remove("active");

});


/* Cerrar tocando fuera de la imagen */

photoLightbox.addEventListener("click", function (event) {

    if (event.target === photoLightbox) {

        photoLightbox.classList.remove("active");

    }

});


/* =========================================================
   ==================== INVITACIÓN =========================
========================================================= */

const btnInvitacion =
    document.getElementById("btnInvitacion");

const invitationSection =
    document.getElementById("invitationSection");

const backFromInvitation =
    document.getElementById("backFromInvitation");

const invitationGame =
    document.getElementById("invitationGame");

const finalInvitation =
    document.getElementById("finalInvitation");

const invitationSuccess =
    document.getElementById("invitationSuccess");

const invitationNo =
    document.getElementById("invitationNo");

const startGame =
    document.getElementById("startGame");

const answerYes =
    document.getElementById("answerYes");

const answerNo =
    document.getElementById("answerNo");

const tryAgain =
    document.getElementById("tryAgain");

const gameScreens =
    document.querySelectorAll(".game-screen");

const gameOptions =
    document.querySelectorAll(".game-option");

let currentGameScreen = 0;
let gameLocked = false;


/* =========================================================
   MOSTRAR PANTALLA DEL JUEGO
========================================================= */

function showGameScreen(index) {

    gameScreens.forEach(function (screen, i) {

        screen.classList.toggle(
            "active",
            i === index
        );

    });

    currentGameScreen = index;

}


/* =========================================================
   REINICIAR INVITACIÓN
========================================================= */

function resetInvitation() {

    currentGameScreen = 0;
    gameLocked = false;

    invitationGame.classList.remove("game-finished");

    invitationGame.style.display = "flex";

    finalInvitation.classList.remove("active");
    invitationSuccess.classList.remove("active");
    invitationNo.classList.remove("active");

    showGameScreen(0);


    gameOptions.forEach(function (option) {

        option.classList.remove(
            "correct-answer",
            "wrong-answer"
        );

    });


    document
        .querySelectorAll(".game-feedback")
        .forEach(function (feedback) {

            feedback.textContent = "";

        });

}


/* =========================================================
   ABRIR INVITACIÓN
========================================================= */

btnInvitacion.addEventListener("click", function () {

    registrarEvento(
        "invitacion_abierta",
        "invitacion",
        "Dani abrió la invitación"
    );

    menu.classList.remove("active");

    setTimeout(function () {

        invitationSection.classList.add("active");

        resetInvitation();

    }, 300);

});


/* =========================================================
   INICIAR JUEGO
========================================================= */

startGame.addEventListener("click", function () {

    showGameScreen(1);

});


/* =========================================================
   RESPUESTAS DEL JUEGO
========================================================= */

gameOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        if (gameLocked) return;

        const currentScreen =
            option.closest(".game-screen");

        if (!currentScreen) return;

        const feedback =
            currentScreen.querySelector(".game-feedback");

        const answer =
            option.dataset.answer;


        /* -------------------------------------------------
           RESPUESTA INCORRECTA
        ------------------------------------------------- */

        if (answer === "wrong") {

            option.classList.add("wrong-answer");

            if (feedback) {

                feedback.textContent =
                    "mmm... no exactamente 👀";

            }

            setTimeout(function () {

                option.classList.remove(
                    "wrong-answer"
                );

                if (feedback) {
                    feedback.textContent = "";
                }

            }, 600);

            return;
        }


        /* -------------------------------------------------
           RESPUESTA CORRECTA
        ------------------------------------------------- */

        gameLocked = true;

        option.classList.add("correct-answer");

        if (feedback) {

            feedback.textContent =
                "✨ ¡correcto!";

        }


        setTimeout(function () {

            option.classList.remove(
                "correct-answer"
            );

            if (feedback) {
                feedback.textContent = "";
            }


            /* ---------------------------------------------
               SI ES LA ÚLTIMA PISTA
            --------------------------------------------- */

            if (
                currentGameScreen ===
                gameScreens.length - 1
            ) {

                showFinalInvitation();

                return;

            }


            /* ---------------------------------------------
               SIGUIENTE PISTA
            --------------------------------------------- */

            gameLocked = false;

            showGameScreen(
                currentGameScreen + 1
            );

        }, 1000);

    });

});


/* =========================================================
   MOSTRAR INVITACIÓN FINAL
========================================================= */

function showFinalInvitation() {

    invitationGame.classList.add(
        "game-finished"
    );

    setTimeout(function () {

        invitationGame.style.display = "none";

        finalInvitation.classList.add("active");

        gameLocked = false;

    }, 500);

}


/* =========================================================
   RESPUESTA "SÍ"
========================================================= */

answerYes.addEventListener("click", function () {

    registrarEvento(
        "acepto",
        "invitacion",
        "Dani aceptó la invitación ❤️"
    );

    finalInvitation.classList.remove(
        "active"
    );

    setTimeout(function () {

        invitationSuccess.classList.add(
            "active"
        );

        createHeartExplosion();

    }, 350);

});


/* =========================================================
   RESPUESTA "NO"
========================================================= */

answerNo.addEventListener("click", function () {

    registrarEvento(
        "rechazo",
        "invitacion",
        "Dani pulsó No"
    );

    finalInvitation.classList.remove(
        "active"
    );

    setTimeout(function () {

        invitationNo.classList.add(
            "active"
        );

    }, 350);

});


/* =========================================================
   VOLVER A PENSAR
========================================================= */

tryAgain.addEventListener("click", function () {

    invitationNo.classList.remove(
        "active"
    );

    setTimeout(function () {

        finalInvitation.classList.add(
            "active"
        );

    }, 350);

});


/* =========================================================
   VOLVER DE INVITACIÓN
========================================================= */

backFromInvitation.addEventListener(
    "click",
    function () {

        invitationSection.classList.remove(
            "active"
        );

        setTimeout(function () {

            menu.classList.add("active");

            resetInvitation();

        }, 400);

    }
);


/* =========================================================
   CORAZONES AL DECIR "SÍ"
========================================================= */

function createHeartExplosion() {

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "✨"
    ];


    for (let i = 0; i < 18; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 0.8 + "s";

        heart.style.fontSize =
            (18 + Math.random() * 20) + "px";


        invitationSection.appendChild(
            heart
        );


        setTimeout(function () {

            heart.remove();

        }, 3200);

    }

}


/* =========================================================
   FIN
========================================================= */