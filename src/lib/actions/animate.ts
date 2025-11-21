import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimateOptions {
    type?: 'fade' | 'slide' | 'scale' | 'reveal';
    delay?: number;
    duration?: number;
    stagger?: number;
    y?: number;
    x?: number;
    start?: string;
    scale?: number;
}

export function animate(node: HTMLElement, options: AnimateOptions = {}) {
    const {
        type = 'fade',
        delay = 0,
        duration = 0.6,
        stagger = 0,
        y = 20,
        x = 0,
        start = 'top 85%',
        scale = 0.95
    } = options;

    let animation: gsap.core.Tween | gsap.core.Timeline;

    const setupAnimation = () => {
        const targets = stagger > 0 ? Array.from(node.children) : node;

        // Initial state
        const initialVars: gsap.TweenVars = {
            opacity: 0
        };

        if (type === 'slide') {
            initialVars.y = y;
            initialVars.x = x;
        } else if (type === 'scale') {
            initialVars.scale = scale;
            initialVars.y = y;
        } else if (type === 'reveal') {
            initialVars.clipPath = 'inset(0 100% 0 0)';
        }

        // Set initial state immediately
        gsap.set(targets, initialVars);

        // Target state
        const targetVars: gsap.TweenVars = {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
            stagger: stagger,
            scrollTrigger: {
                trigger: node,
                start,
                toggleActions: 'play none none none', // Play once and stay
                // markers: true // Uncomment for debugging
            }
        };

        if (type === 'slide') {
            targetVars.y = 0;
            targetVars.x = 0;
        } else if (type === 'scale') {
            targetVars.scale = 1;
            targetVars.y = 0;
        } else if (type === 'reveal') {
            targetVars.clipPath = 'inset(0 0% 0 0)';
            targetVars.ease = 'power3.inOut';
        }

        animation = gsap.to(targets, targetVars);
    };

    // Wait for mount/layout
    // Using requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
        setTimeout(setupAnimation, 100);
    });

    return {
        update(newOptions: AnimateOptions) {
            // Handle updates if needed
        },
        destroy() {
            if (animation) animation.kill();
        }
    };
}
