let controller;
let slideScene;
let pageScene;

function animatesSlides() {
    controller = new ScrollMagic.Controller();

    const sliders = document.querySelectorAll('.slide');

    const nav = document.querySelector('.nav-header');

    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        const slideTimeLine = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        })

        slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" })
        slideTimeLine.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
        slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, '-=0.75');
        slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, '-=0.25');

        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
            .setTween(slideTimeLine).addTo(controller);

        let pageTimeLine = gsap.timeline();

        let nextSlide = sliders.length - 1 === index ? 'end' : slides[index + 1];
        pageTimeLine.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTimeLine.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, '-=0.5');
        pageTimeLine.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0,
        }).setPin(slide, { pushFollowers: false }).setTween(pageTimeLine).addTo(controller)


    });
}

const burger = document.querySelector(".burger");
const navHeader = document.querySelector(".nav-header");

function navToggle(e) {
    if (!e.target.classList.contains('active')) {
        e.target.classList.add('active');
        gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: "black" });
        gsap.to('.line2', 0.5, { rotate: '-45', y: -3, background: "black" });
        gsap.to('#logo', 1, { color: 'black' });
        gsap.to('.navbar', 1, { clipPath: 'circle(2500px at 100% -10%)' });
    } else {
        e.target.classList.remove('active');
        gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: "white" });
        gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: "white" });
        gsap.to('#logo', 1, { color: 'white' });
        gsap.to('.navbar', 1, { clipPath: 'circle(50px at 100% -10%)' });
    }
}

burger.addEventListener("click", navToggle);

animatesSlides();