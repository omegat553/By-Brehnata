/* =========================
   ELEMENTS
========================= */

const starsContainer =
    document.getElementById("stars");

const mouseGlow =
    document.getElementById("mouseGlow");

const opening =
    document.getElementById("opening");

const openingContent =
    document.getElementById("openingContent");

const openButton =
    document.getElementById("openButton");

const birthday =
    document.getElementById("birthday");

const burstContainer =
    document.getElementById("burstContainer");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const musicControl =
    document.getElementById("musicControl");

const musicStatus =
    document.getElementById("musicStatus");

const scrollHint =
    document.getElementById("scrollHint");

const memoryIntro =
    document.getElementById("memoryIntro");

const polaroids =
    document.querySelectorAll(".polaroid");

const photoImages =
    document.querySelectorAll(
        ".photo-frame img"
    );

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxCaption =
    document.getElementById(
        "lightboxCaption"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


/* CHAOS */

const chaosSection =
    document.getElementById(
        "chaosSection"
    );

const dontClickButton =
    document.getElementById(
        "dontClickButton"
    );

const chaosParticles =
    document.getElementById(
        "chaosParticles"
    );

const aibPhoto =
    document.getElementById(
        "aibPhoto"
    );


/* =========================
   CREATE STARS
========================= */

const totalStars = 100;


for (
    let i = 0;
    i < totalStars;
    i++
) {

    const star =
        document.createElement(
            "span"
        );


    star.classList.add(
        "star"
    );


    star.style.left =
        `${Math.random() * 100}%`;

    star.style.top =
        `${Math.random() * 100}%`;


    const size =
        Math.random()
        * 2.2
        + 0.5;


    star.style.width =
        `${size}px`;

    star.style.height =
        `${size}px`;


    const twinkleSpeed =
        Math.random()
        * 3
        + 2;

    const floatingSpeed =
        Math.random()
        * 14
        + 12;


    star.style.animationDuration =
        `${twinkleSpeed}s,
         ${floatingSpeed}s`;


    star.style.animationDelay =
        `${Math.random() * 5}s,
         ${Math.random() * -15}s`;


    starsContainer.appendChild(
        star
    );

}


/* =========================
   MOUSE
========================= */

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let glowX =
    mouseX;

let glowY =
    mouseY;

let parallaxX = 0;

let parallaxY = 0;

let surpriseOpened =
    false;

let musicMuted =
    false;

let chaosOpened =
    false;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        const centerX =
            window.innerWidth
            / 2;

        const centerY =
            window.innerHeight
            / 2;


        parallaxX =
            (mouseX - centerX)
            / centerX;

        parallaxY =
            (mouseY - centerY)
            / centerY;


        if (
            !surpriseOpened
        ) {

            createCursorParticle(
                mouseX,
                mouseY
            );

        }

    }
);


/* =========================
   SMOOTH ANIMATION
========================= */

function animate() {

    glowX +=
        (mouseX - glowX)
        * 0.08;

    glowY +=
        (mouseY - glowY)
        * 0.08;


    mouseGlow.style.left =
        `${glowX}px`;

    mouseGlow.style.top =
        `${glowY}px`;


    if (
        !surpriseOpened
    ) {

        openingContent.style.transform =
            `
            translate(
                ${parallaxX * 7}px,
                ${parallaxY * 5}px
            )
            `;

    }


    starsContainer.style.transform =
        `
        translate(
            ${parallaxX * -5}px,
            ${parallaxY * -4}px
        )
        scale(1.02)
        `;


    requestAnimationFrame(
        animate
    );

}


animate();


/* =========================
   CURSOR PARTICLES
========================= */

let lastParticleTime = 0;


function createCursorParticle(
    x,
    y
) {

    const now =
        Date.now();


    if (
        now
        - lastParticleTime
        < 45
    ) {
        return;
    }


    lastParticleTime =
        now;


    const particle =
        document.createElement(
            "span"
        );


    particle.classList.add(
        "cursor-particle"
    );


    particle.style.left =
        `${x}px`;

    particle.style.top =
        `${y}px`;


    const particleX =
        (Math.random() - 0.5)
        * 30;

    const particleY =
        (Math.random() - 0.5)
        * 30;


    particle.style.setProperty(
        "--particle-x",
        `${particleX}px`
    );

    particle.style.setProperty(
        "--particle-y",
        `${particleY}px`
    );


    document.body.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        800
    );

}


/* =========================
   BUTTON MAGNETIC
========================= */

openButton.addEventListener(
    "mousemove",
    (event) => {

        if (
            surpriseOpened
        ) {
            return;
        }


        const rect =
            openButton
                .getBoundingClientRect();


        const x =
            event.clientX
            - rect.left
            - rect.width / 2;

        const y =
            event.clientY
            - rect.top
            - rect.height / 2;


        openButton.style.transform =
            `
            translate(
                ${x * 0.05}px,
                ${y * 0.08 - 5}px
            )
            `;

    }
);


openButton.addEventListener(
    "mouseleave",
    () => {

        if (
            surpriseOpened
        ) {
            return;
        }


        openButton.style.transform =
            "";

    }
);


/* =========================
   MUSIC
========================= */

function playBirthdayMusic() {

    birthdayMusic.volume =
        0;

    birthdayMusic.muted =
        false;


    birthdayMusic
        .play()
        .then(
            () => {

                let volume = 0;


                const fadeIn =
                    setInterval(
                        () => {

                            volume +=
                                0.02;


                            if (
                                volume
                                >= 0.55
                            ) {

                                volume =
                                    0.55;

                                clearInterval(
                                    fadeIn
                                );

                            }


                            birthdayMusic.volume =
                                volume;

                        },
                        80
                    );

            }
        )
        .catch(
            (error) => {

                console.error(
                    "Music error:",
                    error
                );

            }
        );

}


/* =========================
   MUSIC CONTROL
========================= */

musicControl.addEventListener(
    "click",
    () => {

        musicMuted =
            !musicMuted;


        birthdayMusic.muted =
            musicMuted;


        if (
            musicMuted
        ) {

            musicControl
                .classList
                .add(
                    "muted"
                );

            musicStatus.textContent =
                "MUTED";

        }

        else {

            musicControl
                .classList
                .remove(
                    "muted"
                );

            musicStatus.textContent =
                "MUSIC";

        }

    }
);


/* =========================
   OPEN SURPRISE
========================= */

openButton.addEventListener(
    "click",
    () => {

        if (
            surpriseOpened
        ) {
            return;
        }


        surpriseOpened =
            true;


        playBirthdayMusic();


        opening.classList.add(
            "leaving"
        );


        mouseGlow.style.opacity =
            "0";


        setTimeout(
            () => {

                birthday
                    .classList
                    .add(
                        "show"
                    );


                musicControl
                    .classList
                    .add(
                        "show"
                    );


                createBirthdayBurst();

            },
            700
        );


        setTimeout(
            () => {

                opening.style.display =
                    "none";

            },
            1400
        );


        setTimeout(
            () => {

                document.body
                    .classList
                    .add(
                        "unlocked"
                    );


                scrollHint
                    .classList
                    .add(
                        "show"
                    );

            },
            2900
        );

    }
);


/* =========================
   SCROLL BUTTON
========================= */

scrollHint.addEventListener(
    "click",
    () => {

        memoryIntro
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================
   BIRTHDAY BURST
========================= */

function createBirthdayBurst() {

    const totalParticles =
        60;


    for (
        let i = 0;
        i < totalParticles;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "burst-particle"
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            Math.random()
            * 320
            + 100;


        const x =
            Math.cos(angle)
            * distance;

        const y =
            Math.sin(angle)
            * distance;


        particle.style.setProperty(
            "--burst-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--burst-y",
            `${y}px`
        );


        const size =
            Math.random()
            * 4
            + 2;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        burstContainer.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            2200
        );

    }

}


/* =========================
   PHOTO FALLBACK
========================= */

function markPhotoMissing(
    image
) {

    const frame =
        image.closest(
            ".photo-frame"
        );


    if (
        frame
    ) {

        frame.classList.add(
            "missing"
        );

    }

}


photoImages.forEach(
    (image) => {

        image.addEventListener(
            "error",
            () => {

                markPhotoMissing(
                    image
                );

            }
        );

    }
);


/* =========================
   SCROLL REVEAL
========================= */

const scrollRevealElements =
    document.querySelectorAll(
        ".scroll-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry
                            .isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }
            );

        },
        {
            threshold: 0.2
        }
    );


scrollRevealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================
   POLAROID REVEAL
========================= */

const polaroidObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry
                            .isIntersecting
                    ) {

                        const card =
                            entry.target;


                        const index =
                            Array
                                .from(
                                    polaroids
                                )
                                .indexOf(
                                    card
                                );


                        setTimeout(
                            () => {

                                card.classList.add(
                                    "visible"
                                );

                            },
                            index * 120
                        );


                        polaroidObserver
                            .unobserve(
                                card
                            );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


polaroids.forEach(
    (polaroid) => {

        polaroidObserver
            .observe(
                polaroid
            );

    }
);


/* =========================
   LIGHTBOX
========================= */

polaroids.forEach(
    (polaroid) => {

        polaroid.addEventListener(
            "click",
            () => {

                const image =
                    polaroid
                        .querySelector(
                            "img"
                        );


                const frame =
                    polaroid
                        .querySelector(
                            ".photo-frame"
                        );


                if (
                    frame.classList
                        .contains(
                            "missing"
                        )
                ) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightboxCaption
                    .textContent =
                    polaroid
                        .dataset
                        .caption;


                lightbox
                    .classList
                    .add(
                        "open"
                    );


                document.body
                    .classList
                    .add(
                        "modal-open"
                    );

            }
        );

    }
);


function closeLightbox() {

    lightbox
        .classList
        .remove(
            "open"
        );


    document.body
        .classList
        .remove(
            "modal-open"
        );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target
            === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key
            === "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================
   CHAOS BUTTON
========================= */

dontClickButton.addEventListener(
    "click",
    () => {

        if (
            chaosOpened
        ) {
            return;
        }


        chaosOpened =
            true;


        chaosSection
            .classList
            .add(
                "chaos-active"
            );


        chaosSection
            .classList
            .add(
                "screen-shake"
            );


        createChaosParticles();


        /* Music becomes quieter */

        if (
            !musicMuted
        ) {

            smoothVolume(
                birthdayMusic.volume,
                0.22,
                400
            );

        }


        setTimeout(
            () => {

                chaosSection
                    .classList
                    .remove(
                        "screen-shake"
                    );

            },
            450
        );


        /* Return music volume */

        setTimeout(
            () => {

                if (
                    !musicMuted
                ) {

                    smoothVolume(
                        birthdayMusic.volume,
                        0.55,
                        900
                    );

                }

            },
            2600
        );

    }
);


/* =========================
   CHAOS PARTICLES
========================= */

function createChaosParticles() {

    const symbols = [
        "!",
        "?!",
        "✦",
        "LOL",
        "💀",
        "???"
    ];


    const total =
        35;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "chaos-particle"
        );


        particle.textContent =
            symbols[
            Math.floor(
                Math.random()
                * symbols.length
            )
            ];


        const x =
            (Math.random() - 0.5)
            * window.innerWidth
            * 0.9;

        const y =
            (Math.random() - 0.5)
            * 700;


        const rotation =
            (Math.random() - 0.5)
            * 500;


        particle.style.setProperty(
            "--chaos-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--chaos-y",
            `${y}px`
        );

        particle.style.setProperty(
            "--chaos-rotate",
            `${rotation}deg`
        );


        particle.style.animationDelay =
            `${Math.random() * 0.25}s`;


        chaosParticles
            .appendChild(
                particle
            );


        setTimeout(
            () => {

                particle.remove();

            },
            1900
        );

    }

}


/* =========================
   SMOOTH MUSIC VOLUME
========================= */

function smoothVolume(
    from,
    to,
    duration
) {

    const startTime =
        performance.now();


    function updateVolume(
        currentTime
    ) {

        const progress =
            Math.min(
                (
                    currentTime
                    - startTime
                )
                / duration,
                1
            );


        const value =
            from
            + (
                to
                - from
            )
            * progress;


        birthdayMusic.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    value
                )
            );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateVolume
            );

        }

    }


    requestAnimationFrame(
        updateVolume
    );

}


/* =========================
   AIB PHOTO ERROR
========================= */

aibPhoto.addEventListener(
    "error",
    () => {

        aibPhoto.alt =
            "Put photo-aib.jpg inside assets/photos";

    }
);