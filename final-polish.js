/* =====================================================
   FINAL POLISH
   PRELOADER + MOBILE OPTIMIZATION
===================================================== */

(() => {


    /* =====================================================
       TOUCH DEVICE DETECTION
    ===================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        isTouchDevice
    ) {

        document.documentElement
            .classList
            .add(
                "is-touch"
            );

    }


    /* =====================================================
       VIEWPORT HEIGHT
    ===================================================== */

    function updateRealViewportHeight() {

        document.documentElement
            .style
            .setProperty(
                "--real-vh",
                `${window.innerHeight}px`
            );

    }


    updateRealViewportHeight();


    window.addEventListener(
        "resize",
        updateRealViewportHeight
    );


    /* =====================================================
       IMAGE OPTIMIZATION
    ===================================================== */

    const existingImages =
        document.querySelectorAll(
            "img"
        );


    existingImages.forEach(
        (
            image,
            index
        ) => {

            image.decoding =
                "async";


            if (
                index > 1
            ) {

                image.loading =
                    "lazy";

            }

        }
    );


    /* =====================================================
       MUSIC PRELOAD
    ===================================================== */

    const polishMusic =
        document.getElementById(
            "birthdayMusic"
        );


    if (
        polishMusic
    ) {

        polishMusic.preload =
            "auto";


        try {

            polishMusic.load();

        }

        catch (
        error
        ) {

            console.log(
                "Audio will load after interaction."
            );

        }

    }


    /* =====================================================
       CREATE PRELOADER
    ===================================================== */

    const preloader =
        document.createElement(
            "div"
        );


    preloader.id =
        "sitePreloader";


    preloader.innerHTML = `
    
        <span
            class="preloader-star
            preloader-star-one"
        >
            ✦
        </span>
    
    
        <span
            class="preloader-star
            preloader-star-two"
        >
            ✦
        </span>
    
    
        <div class="preloader-inner">
    
            <span class="preloader-index">
                00 / 07
            </span>
    
    
            <h1 class="preloader-title">
    
                loading something
    
                <span>
                    special.
                </span>
    
            </h1>
    
    
            <p
                class="preloader-status"
                id="preloaderStatus"
            >
                GATHERING MEMORIES
            </p>
    
    
            <div
                class="preloader-progress-wrap"
            >
    
                <div
                    class="preloader-track"
                >
    
                    <div
                        class="preloader-bar"
                        id="preloaderBar"
                    ></div>
    
                </div>
    
    
                <span
                    class="preloader-percent"
                    id="preloaderPercent"
                >
                    00%
                </span>
    
            </div>
    
        </div>
    
    
        <span class="preloader-bottom">
            JUST A SECOND
        </span>
    
    `;


    /* =====================================================
       ADD TO PAGE
    ===================================================== */

    document.body
        .classList
        .add(
            "preloading"
        );


    document.body
        .insertBefore(
            preloader,
            document.body.firstChild
        );


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preloaderBar =
        document.getElementById(
            "preloaderBar"
        );


    const preloaderPercent =
        document.getElementById(
            "preloaderPercent"
        );


    const preloaderStatus =
        document.getElementById(
            "preloaderStatus"
        );


    /* =====================================================
       ASSETS TO PRELOAD
    ===================================================== */

    const assetsToPreload = [

        "assets/photos/photo-1.jpg",

        "assets/photos/photo-2.jpg",

        "assets/photos/photo-3.jpg",

        "assets/photos/photo-4.jpg",

        "assets/photos/photo-5.jpg",

        "assets/photos/photo-6.jpg",

        "assets/photos/photo-aib.jpg"

    ];


    /* =====================================================
       STATE
    ===================================================== */

    let loadedAssets =
        0;


    let targetProgress =
        0;


    let displayedProgress =
        0;


    let preloaderFinished =
        false;


    const preloadStartTime =
        performance.now();


    const minimumLoadTime =
        1300;


    const maximumLoadTime =
        5000;


    /* =====================================================
       STATUS MESSAGE
    ===================================================== */

    function updateStatus(
        progress
    ) {

        if (
            progress < 30
        ) {

            preloaderStatus.textContent =
                "GATHERING MEMORIES";

        }

        else if (
            progress < 65
        ) {

            preloaderStatus.textContent =
                "PREPARING THE CHAOS";

        }

        else if (
            progress < 90
        ) {

            preloaderStatus.textContent =
                "ALMOST THERE";

        }

        else {

            preloaderStatus.textContent =
                "READY FOR YOU";

        }

    }


    /* =====================================================
       DISPLAY PROGRESS
    ===================================================== */

    function animateProgress() {

        const difference =
            targetProgress
            - displayedProgress;


        displayedProgress +=
            difference
            * 0.1;


        if (
            Math.abs(
                difference
            )
            < 0.2
        ) {

            displayedProgress =
                targetProgress;

        }


        const rounded =
            Math.round(
                displayedProgress
            );


        preloaderBar.style.width =
            `${rounded}%`;


        preloaderPercent.textContent =
            `${String(
                rounded
            ).padStart(
                2,
                "0"
            )}%`;


        updateStatus(
            rounded
        );


        if (
            !preloaderFinished
            ||
            displayedProgress
            < 99.8
        ) {

            requestAnimationFrame(
                animateProgress
            );

        }

    }


    requestAnimationFrame(
        animateProgress
    );


    /* =====================================================
       ASSET LOADED
    ===================================================== */

    function assetFinished() {

        loadedAssets++;


        targetProgress =
            Math.round(
                (
                    loadedAssets
                    /
                    assetsToPreload.length
                )
                * 100
            );


        if (
            loadedAssets
            >=
            assetsToPreload.length
        ) {

            finishPreloaderWhenReady();

        }

    }


    /* =====================================================
       PRELOAD IMAGE
    ===================================================== */

    function preloadImage(
        source
    ) {

        const image =
            new Image();


        image.onload =
            assetFinished;


        image.onerror =
            assetFinished;


        image.src =
            source;

    }


    /* =====================================================
       START PRELOADING
    ===================================================== */

    assetsToPreload.forEach(
        preloadImage
    );


    /* =====================================================
       FINISH WHEN MINIMUM TIME PASSED
    ===================================================== */

    function finishPreloaderWhenReady() {

        if (
            preloaderFinished
        ) {
            return;
        }


        const elapsed =
            performance.now()
            - preloadStartTime;


        const remaining =
            Math.max(
                0,
                minimumLoadTime
                - elapsed
            );


        setTimeout(
            finishPreloader,
            remaining
        );

    }


    /* =====================================================
       FINISH
    ===================================================== */

    function finishPreloader() {

        if (
            preloaderFinished
        ) {
            return;
        }


        preloaderFinished =
            true;


        targetProgress =
            100;


        preloaderBar.style.width =
            "100%";


        preloaderPercent.textContent =
            "100%";


        preloaderStatus.textContent =
            "READY FOR YOU";


        setTimeout(
            () => {

                preloader
                    .classList
                    .add(
                        "is-done"
                    );


                document.body
                    .classList
                    .remove(
                        "preloading"
                    );

            },
            350
        );


        setTimeout(
            () => {

                preloader.remove();

            },
            1300
        );

    }


    /* =====================================================
       FAIL SAFE
    ===================================================== */

    setTimeout(
        () => {

            if (
                !preloaderFinished
            ) {

                finishPreloader();

            }

        },
        maximumLoadTime
    );


    /* =====================================================
       IOS DOUBLE TAP ZOOM PREVENTION
       ONLY FOR INTERACTIVE ELEMENTS
    ===================================================== */

    let lastTouchEnd =
        0;


    document.addEventListener(
        "touchend",
        (
            event
        ) => {

            const target =
                event.target.closest(
                    "button, .candle, .polaroid"
                );


            if (
                !target
            ) {
                return;
            }


            const now =
                Date.now();


            if (
                now
                - lastTouchEnd
                <= 300
            ) {

                event.preventDefault();

            }


            lastTouchEnd =
                now;

        },
        {
            passive: false
        }
    );


    /* =====================================================
       PAGE RESTORE FIX
    ===================================================== */

    window.addEventListener(
        "pageshow",
        (
            event
        ) => {

            if (
                event.persisted
            ) {

                document.body
                    .classList
                    .remove(
                        "preloading"
                    );

            }

        }
    );


})();