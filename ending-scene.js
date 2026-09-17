/* =====================================================
   SCENE 07
   FINAL BIRTHDAY ENDING
===================================================== */


/* =========================
   OLD ELEMENTS
========================= */

const endingWishSection =
    document.getElementById(
        "wishSection"
    );

const endingMusic =
    document.getElementById(
        "birthdayMusic"
    );

const endingMusicControl =
    document.getElementById(
        "musicControl"
    );


/* =========================
   CREATE ENDING
========================= */

const endingSection =
    document.createElement(
        "section"
    );


endingSection.className =
    "ending-section";

endingSection.id =
    "endingSection";


endingSection.innerHTML = `

    <div class="ending-section-number">
        07
    </div>


    <div class="ending-top-line"></div>


    <div class="final-decoration final-decoration-one">
        ✦
    </div>

    <div class="final-decoration final-decoration-two">
        ✦
    </div>

    <div class="final-decoration final-decoration-three">
        ✦
    </div>

    <div class="final-decoration final-decoration-four">
        ✦
    </div>


    <div
        class="final-particles"
        id="finalParticles"
    ></div>


    <div class="ending-content">

        <p class="ending-eyebrow">
            ONE LAST THING
        </p>


        <p class="ending-intro">
            before this ridiculously
            over-engineered birthday website ends...
        </p>


        <div class="ending-lines">

            <p class="ending-line ending-line-main">
                another year older.
            </p>

            <p class="ending-line ending-line-soft">
                still chaotic.
            </p>

            <p class="ending-line ending-line-main">
                still annoying.
            </p>

            <p class="ending-line ending-line-soft">
                still somehow tolerable.
            </p>

            <p class="ending-line ending-line-main">
                but still,
            </p>

            <p class="ending-line ending-line-soft">
                one of my favorite people.
            </p>

        </div>


        <div class="ending-divider"></div>


        <h2
            class="final-birthday"
            id="finalBirthday"
        >
            HAPPY

            <span>
                BIRTHDAY.
            </span>
        </h2>


        <p
            class="final-name"
            id="finalName"
        >
            [NAMA DIA]

            <span class="final-heart">
                ♡
            </span>
        </p>


        <p
            class="final-message"
            id="finalMessage"
        >
            I hope this year gives you
            plenty of reasons to smile,
            a ridiculous amount of good memories,
            and everything you've been quietly wishing for.
        </p>


        <button
            class="replay-button"
            id="replayButton"
            type="button"
        >

            <span class="replay-text">
                REPLAY FROM THE BEGINNING
            </span>

            <span class="replay-icon">
                ↻
            </span>

        </button>


        <p
            class="made-by"
            id="madeBy"
        >
            MADE WITH WAY TOO MUCH EFFORT BY

            <span>
                [NAMA KAMU]
            </span>
        </p>

    </div>


    <p class="final-bottom">
        THE END... FOR NOW
    </p>

`;


/* =========================
   INSERT AFTER WISH
========================= */

if (
    endingWishSection
) {

    endingWishSection
        .insertAdjacentElement(
            "afterend",
            endingSection
        );

}


/* =========================
   GET NEW ELEMENTS
========================= */

const endingLines =
    endingSection.querySelectorAll(
        ".ending-line"
    );

const finalBirthday =
    document.getElementById(
        "finalBirthday"
    );

const finalName =
    document.getElementById(
        "finalName"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );

const replayButton =
    document.getElementById(
        "replayButton"
    );

const madeBy =
    document.getElementById(
        "madeBy"
    );

const finalParticles =
    document.getElementById(
        "finalParticles"
    );


/* =========================
   STATE
========================= */

let endingStarted =
    false;

let endingVisible =
    false;


/* =========================
   VOLUME
========================= */

function endingAnimateVolume(
    target,
    duration = 1000
) {

    if (
        !endingMusic
        ||
        endingMusic.muted
    ) {
        return;
    }


    const startVolume =
        endingMusic.volume;

    const startTime =
        performance.now();


    function update(
        now
    ) {

        const progress =
            Math.min(
                (
                    now
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


        endingMusic.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    startVolume
                    + (
                        target
                        - startVolume
                    )
                    * eased
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
   FINAL SEQUENCE
========================= */

function startEndingSequence() {

    if (
        endingStarted
    ) {
        return;
    }


    endingStarted =
        true;


    endingLines.forEach(
        (
            line,
            index
        ) => {

            setTimeout(
                () => {

                    line.classList.add(
                        "show"
                    );

                },
                450
                + index * 330
            );

        }
    );


    setTimeout(
        () => {

            finalBirthday
                .classList
                .add(
                    "show"
                );


            createFinalParticles();

        },
        2700
    );


    setTimeout(
        () => {

            finalName
                .classList
                .add(
                    "show"
                );

        },
        3400
    );


    setTimeout(
        () => {

            finalMessage
                .classList
                .add(
                    "show"
                );

        },
        3900
    );


    setTimeout(
        () => {

            replayButton
                .classList
                .add(
                    "show"
                );

        },
        4500
    );


    setTimeout(
        () => {

            madeBy
                .classList
                .add(
                    "show"
                );

        },
        5000
    );

}


/* =========================
   OBSERVER
========================= */

const endingObserver =
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
                            !endingVisible
                        ) {

                            endingVisible =
                                true;


                            endingSection
                                .classList
                                .add(
                                    "active"
                                );


                            if (
                                endingMusicControl
                            ) {

                                endingMusicControl
                                    .classList
                                    .remove(
                                        "on-wish"
                                    );

                                endingMusicControl
                                    .classList
                                    .remove(
                                        "on-light"
                                    );

                                endingMusicControl
                                    .classList
                                    .add(
                                        "final-light"
                                    );

                            }


                            endingAnimateVolume(
                                0.42,
                                1200
                            );


                            startEndingSequence();

                        }

                    }

                    else if (
                        endingVisible
                        &&
                        entry.intersectionRatio
                        < 0.05
                    ) {

                        endingVisible =
                            false;


                        if (
                            endingMusicControl
                        ) {

                            endingMusicControl
                                .classList
                                .remove(
                                    "final-light"
                                );

                        }

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


endingObserver.observe(
    endingSection
);


/* =========================
   PARTICLES
========================= */

function createFinalParticles() {

    const total =
        80;


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
            "final-particle"
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            Math.random()
            * 420
            + 100;


        const x =
            Math.cos(angle)
            * distance;

        const y =
            Math.sin(angle)
            * distance;


        const rotation =
            Math.random()
            * 360;


        const size =
            Math.random()
            * 4
            + 2;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particle.style.setProperty(
            "--final-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--final-y",
            `${y}px`
        );

        particle.style.setProperty(
            "--final-rotate",
            `${rotation}deg`
        );


        particle.style.animationDelay =
            `${Math.random() * 0.3}s`;


        finalParticles
            .appendChild(
                particle
            );


        setTimeout(
            () => {

                particle.remove();

            },
            2800
        );

    }

}


/* =========================
   REPLAY
========================= */

replayButton.addEventListener(
    "click",
    () => {

        endingAnimateVolume(
            0,
            500
        );


        endingSection.style.transition =
            "opacity 0.6s ease";

        endingSection.style.opacity =
            "0";


        setTimeout(
            () => {

                window.scrollTo(
                    0,
                    0
                );


                window.location.reload();

            },
            600
        );

    }
);