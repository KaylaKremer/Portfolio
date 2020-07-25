import { gsap } from 'gsap';

export default class CustomCursor {
    constructor(cursor, outerTriangle, innerTriangle) {
        this.cursor = { cursor };
        this.cursor.outerTriangle = outerTriangle;
        this.cursor.innerTriangle = innerTriangle;
        this.bounds = {
            outerTriangle: this.cursor.outerTriangle.getBoundingClientRect(),
            innerTriangle: this.cursor.innerTriangle.getBoundingClientRect()
        };
        this.initCursor();
        this.initHover();
    }

    getMousePosition = event => {
        const { body } = document;
        let e = event;
        let posX = 0;
        let posY = 0;
        if (!e) {
            e = window.event;
        }
        if (e.pageX || e.pageY) {
            posX = e.pageX;
            posY = e.pageY;
        } else if (e.clientX || e.clientY) {
            posX =
                e.clientX +
                body.scrollLeft +
                document.documentElement.scrollLeft;
            posY =
                e.clientY + body.scrollTop + document.documentElement.scrollTop;
        }
        return { x: posX, y: posY };
    };

    initCursor() {
        window.addEventListener('mousemove', e => {
            const mousePosition = this.getMousePosition(e);
            gsap.to(this.cursor.outerTriangle, {
                duration: 0.2,
                x: mousePosition.x - this.bounds.outerTriangle.width / 2 - 5,
                y: mousePosition.y - this.bounds.outerTriangle.width / 2 - 8
            });
            gsap.to(this.cursor.innerTriangle, {
                duration: 0.00001,
                x: mousePosition.x - this.bounds.innerTriangle.width,
                y: mousePosition.y - this.bounds.innerTriangle.height
            });
        });
    }

    initHover() {
        const handleMouseEnter = () => {
            gsap.to(this.cursor.outerTriangle, {
                scale: 2,
                ease: 'elastic.out(2.5, 0.1)',
                duration: 0.7
            });
            gsap.to(this.cursor.outerTriangle, {
                opacity: 0,
                delay: 0.1,
                ease: 'elastic.out(2.5, 0.1)',
                duration: 0.6
            });
            gsap.to(this.cursor.innerTriangle, {
                scale: 1.5,
                borderColor: 'transparent transparent #80b1ff transparent',
                delay: 0.1,
                duration: 0.1
            });
        };

        const handleMouseLeave = () => {
            gsap.to(this.cursor.outerTriangle, {
                scale: 1,
                opacity: 1,
                ease: 'power1.in',
                duration: 0.3
            });
            gsap.to(this.cursor.innerTriangle, {
                scale: 1,
                borderColor: 'transparent transparent #d680ff transparent',
                ease: 'power1.in',
                duration: 0.3
            });
        };

        const clickableItems = document.querySelectorAll(['.cursor', 'button']);
        clickableItems.forEach(item => {
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
        });
    }
}
