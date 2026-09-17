/* =====================================================
   SCENE 06
   MAKE A WISH
===================================================== */


/* =========================
   ELEMENTS FROM OLD SCENES
========================= */

const wishLetterSection =
    document.getElementById(
        "letterSection"
    );

const wishMusic =
    document.getElementById(
        "birthdayMusic"
    );

const wishMusicControl =
    document.getElementById(
        "musicControl"
    );


/* =========================
   CREATE SECTION
========================= */

const wishSection =
    document.createElement(
        "section"
    );


wishSection.className =
    "wish-section";

wishSection.id =
    "wishSection";


wishSection.innerHTML = `

    <div class="wish-section-number">
        06
    </div>


    <div class="wish-star wish-star-one">
        ✦
    </div>

    <div class="wish-star wish-star-two">
        ✦
    </div>

    <div class="wish-star wish-star-three">
        ✦
    </div>


    <div
        class="wish-particles"
        id="wishParticles"
    ></div>


    <div class="wish-content">

        <p class="wish-eyebrow">
            ONE LITTLE THING
        </p>


        <h2 class="wish-title">

            make

            <span>
                a wish.
            </span>

        </h2>


        <p class="wish-description">

            no rush.

            think of something
            you really want this year.

        </p>


        <div class="cake-area">

            <div class="cake-shadow"></div>

            <div class="cake-plate"></div>


            <div class="cake">

                <span class="cake-dot cake-dot-one"></span>
                <span class="cake-dot cake-dot-two"></span>
                <span class="cake-dot cake-dot-three"></span>
                <span class="cake-dot cake-dot-four"></span>

            </div>


            <div
                class="candle"
                id="wishCandle"
                role="button"
                tabindex="0"
                aria-label="Blow out the candle"
            >

                <span class="candle-wick"></span>

                <span class="flame"></span>

                <span class="flame-glow"></span>

                <span class="smoke"></span>

            </div>

        </div>


        <button
            class="make-wish-button"
            id="makeWishButton"
            type="button"
        >

            <span>
                MAKE A WISH
            </span>

            <span class="wish-button-icon">
                ✦
            </span>

        </button>


        <p
            class="wish-instruction"
            id="wishInstruction"
        >
            take your time...
        </p>


        <div
            class="wish-result"
            id="wishResult"
        >

            <p class="wish-result-main">
                wish made.
            </p>

            <p class="wish-result-small">
                I HOPE IT COMES TRUE
            </p>

        </div>


        <div
            class="wish-next"
            id="wishNext"
        >

            <p>
                there's only one chapter left.
            </p>

            <span>
                ↓
            </span>

        </div>

    </div>

`;


/* =========================
   INSERT SECTION
========================= */

if (
    wishLetterSection
) {

    wishLetterSection.insertAdjacentElement(
        "afterend",
        wishSection
    );

}


/* =========================
   GET NEW ELEMENTS
========================= */

const makeWishButton =
    document.getElementById(
        "makeWishButton"
    );

const wishCandle =
    document.getElementById(
        "wishCandle"
    );

const wishInstruction =
    document.getElementById(
        "wishInstruction"
    );

const wishResult =
    document.getElementById(
        "wishResult"
    );

const wishNext =
    document.getElementById(
        "wishNext"
    );

const wishParticles =
    document.getElementById(
        "wishParticles"
    );


/* =========================
   STATE
========================= */

let wishStarted =
    false;

let wishCompleted =
    false;


/* =========================
   MUSIC VOLUME
========================= */

function wishAnimateVolume(
    target,
    duration = 800
) {

    if (
        !wishMusic
        ||
        wishMusic.muted
    ) {
        return;
    }


    const startVolume =
        wishMusic.volume;

    const startTime =
        performance.now();


    function update(
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


        const eased =
            1
            - Math.pow(
                1 - progress,
                3
            );


        const volume =
            startVolume
            + (
                target
                - startVolume
            )
            * eased;


        wishMusic.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    volume
                )
            );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================
   SCENE OBSERVER
========================= */

let wishVisible =
    false;


const wishObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                        &&
                        entry.intersectionRatio
                        >= 0.2
                    ) {

                        if (
                            !wishVisible
                        ) {

                            wishVisible =
                                true;


                            wishSection
                                .classList
                                .add(
                                    "active"
                                );


                            if (
                                wishMusicControl
                            ) {

                                wishMusicControl
                                    .classList
                                    .remove(
                                        "on-light"
                                    );

                                wishMusicControl
                                    .classList
                                    .add(
                                        "on-wish"
                                    );

                            }


                            wishAnimateVolume(
                                0.38,
                                900
                            );

                        }

                    }

                    else if (
                        wishVisible
                        &&
                        entry.intersectionRatio
                        < 0.05
                    ) {

                        wishVisible =
                            false;


                        if (
                            wishMusicControl
                        ) {

                            wishMusicControl
                                .classList
                                .remove(
                                    "on-wish"
                                );

                        }


                        wishAnimateVolume(
                            0.55,
                            900
                        );

                    }

                }
            );

        },
        {
            threshold: [
                0,
                0.05,
                0.2,
                0.5
            ]
        }
    );


wishObserver.observe(
    wishSection
);


/* =========================
   MAKE A WISH BUTTON
========================= */

makeWishButton.addEventListener(
    "click",
    () => {

        if (
            wishStarted
        ) {
            return;
        }


        wishStarted =
            true;


        makeWishButton
            .classList
            .add(
                "hide"
            );


        wishInstruction
            .classList
            .add(
                "show"
            );


        wishInstruction.textContent =
            "close your eyes, make your wish... then tap the candle.";


        wishAnimateVolume(
            0.22,
            900
        );


        wishCandle.focus();

    }
);


/* =========================
   BLOW CANDLE
========================= */

function blowCandle() {

    if (
        !wishStarted
        ||
        wishCompleted
    ) {
        return;
    }


    wishCompleted =
        true;


    wishCandle
        .classList
        .add(
            "off"
        );


    wishInstruction.textContent =
        "okay... it's official.";


    createWishParticles();


    setTimeout(
        () => {

            wishResult
                .classList
                .add(
                    "show"
                );

        },
        500
    );


    setTimeout(
        () => {

            wishNext
                .classList
                .add(
                    "show"
                );

        },
        1600
    );


    setTimeout(
        () => {

            wishAnimateVolume(
                0.5,
                1200
            );

        },
        700
    );

}


/* =========================
   CLICK CANDLE
========================= */

wishCandle.addEventListener(
    "click",
    blowCandle
);


/* =========================
   KEYBOARD CANDLE
========================= */

wishCandle.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
            ||
            event.key === " "
        ) {

            event.preventDefault();

            blowCandle();

        }

    }
);


/* =========================
   PARTICLE BURST
========================= */

function createWishParticles() {

    const total =
        70;


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
            "wish-particle"
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            Math.random()
            * 350
            + 80;


        const x =
            Math.cos(angle)
            * distance;

        const y =
            Math.sin(angle)
            * distance;


        particle.style.setProperty(
            "--wish-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--wish-y",
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


        particle.style.animationDelay =
            `${Math.random() * 0.2}s`;


        wishParticles.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            2300
        );

    }

}