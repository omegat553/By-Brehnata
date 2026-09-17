/* =====================================================
   SCENE 05
   PERSONAL BIRTHDAY LETTER
===================================================== */


/* =========================
   GET EXISTING ELEMENTS
========================= */

const letterChaosSection =
    document.getElementById(
        "chaosSection"
    );

const letterMusic =
    document.getElementById(
        "birthdayMusic"
    );

const letterMusicControl =
    document.getElementById(
        "musicControl"
    );


/* =========================
   CREATE LETTER SECTION
========================= */

const letterSection =
    document.createElement(
        "section"
    );


letterSection.className =
    "letter-section";

letterSection.id =
    "letterSection";


letterSection.innerHTML = `

    <div class="letter-section-number">
        05
    </div>

    <div class="letter-top-line"></div>


    <div class="letter-star letter-star-one">
        ✦
    </div>

    <div class="letter-star letter-star-two">
        ✦
    </div>

    <div class="letter-star letter-star-three">
        ✦
    </div>


    <div class="letter-header">

        <p class="letter-eyebrow">
            FOR ONCE, I'M SERIOUS
        </p>

        <h2 class="letter-title">
            a letter
            <span>
                for you.
            </span>
        </h2>

        <p class="letter-header-note">
            no jokes this time.
            just a few things
            I probably don't say enough.
        </p>

    </div>


    <article class="letter-paper">

        <span class="letter-paper-number">
            PERSONAL NOTE / 05
        </span>


        <h3 class="letter-dear letter-line">
            Dear [NAMA DIA],
        </h3>


        <p class="letter-paragraph letter-line">

            Happy birthday.

            I know I joke around a lot,
            but today I actually want
            to say something properly.

        </p>


        <p class="letter-paragraph letter-line">

            Thank you for being part
            of so many random moments
            that somehow became memories
            I genuinely want to keep.

        </p>


        <p class="letter-paragraph letter-line">

            We've probably had
            stupid conversations,
            ridiculous jokes,
            awkward moments,
            and days where absolutely
            nothing important happened.

            Somehow those are still
            some of the best parts.

        </p>


        <p class="letter-paragraph letter-line">

            I hope this new year
            of your life brings you
            more things to laugh about,
            more places to go,
            more memories to make,
            and plenty of reasons
            to be proud of yourself.

        </p>


        <p class="letter-paragraph letter-line">

            Whatever happens next,
            I hope you keep being you.

            Maybe slightly less annoying.

            But honestly,
            I wouldn't count on it.

        </p>


        <div class="letter-divider letter-line"></div>


        <div class="letter-signature letter-line">

            <span class="signature-small">
                YOUR BEST FRIEND
            </span>

            <span class="signature-name">
                [NAMA KAMU] ♡
            </span>

        </div>


        <p class="letter-ps letter-line">

            P.S. yes, I actually made
            an entire website for this.
            don't get used to it.

        </p>

    </article>


    <p class="letter-side-text">
        SOMETHING WORTH KEEPING
    </p>


    <div class="letter-ending letter-line">

        <p class="letter-ending-text">
            okay, serious mode is over.
        </p>

        <p class="letter-ending-small">
            THERE'S STILL ONE MORE THING
        </p>

        <span class="letter-ending-arrow">
            ↓
        </span>

    </div>

`;


/* =========================
   INSERT AFTER CHAOS
========================= */

if (
    letterChaosSection
) {

    letterChaosSection.insertAdjacentElement(
        "afterend",
        letterSection
    );

}


/* =========================
   VOLUME ANIMATION
========================= */

function letterAnimateVolume(
    target,
    duration = 800
) {

    if (
        !letterMusic
        ||
        letterMusic.muted
    ) {
        return;
    }


    const startVolume =
        letterMusic.volume;

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


        const newVolume =
            startVolume
            + (
                target
                - startVolume
            )
            * eased;


        letterMusic.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    newVolume
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
   LETTER LINE REVEAL
========================= */

let letterStarted =
    false;


function revealLetterLines() {

    if (
        letterStarted
    ) {
        return;
    }


    letterStarted =
        true;


    const lines =
        letterSection.querySelectorAll(
            ".letter-line"
        );


    lines.forEach(
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
                500
                + index * 420
            );

        }
    );

}


/* =========================
   LETTER VISIBILITY
========================= */

let letterIsVisible =
    false;


const letterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                        &&
                        entry.intersectionRatio
                        >= 0.25
                    ) {

                        if (
                            !letterIsVisible
                        ) {

                            letterIsVisible =
                                true;


                            letterSection
                                .classList
                                .add(
                                    "active"
                                );


                            if (
                                letterMusicControl
                            ) {

                                letterMusicControl
                                    .classList
                                    .add(
                                        "on-light"
                                    );

                            }


                            letterAnimateVolume(
                                0.28,
                                1000
                            );


                            revealLetterLines();

                        }

                    }

                    else {

                        if (
                            letterIsVisible
                            &&
                            entry.intersectionRatio
                            < 0.08
                        ) {

                            letterIsVisible =
                                false;


                            if (
                                letterMusicControl
                            ) {

                                letterMusicControl
                                    .classList
                                    .remove(
                                        "on-light"
                                    );

                            }


                            letterAnimateVolume(
                                0.55,
                                900
                            );

                        }

                    }

                }
            );

        },
        {
            threshold: [
                0,
                0.08,
                0.25,
                0.5
            ]
        }
    );


letterObserver.observe(
    letterSection
);