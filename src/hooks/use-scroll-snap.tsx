import { useEffect, useRef, useState } from 'react';

export const useScrollSnap = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const sectionsRef = useRef<HTMLElement[]>([]);

    const registerSection = (element: HTMLElement | null) => {
        if (element && !sectionsRef.current.includes(element)) {
            sectionsRef.current.push(element);
        }
    };

    const scrollToSection = (index: number) => {
        if (index < 0 || index >= sectionsRef.current.length) return;

        const section = sectionsRef.current[index];
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            // Find which section is currently most visible
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            let bestSection = 0;
            let bestVisibility = 0;

            sectionsRef.current.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;

                // Calculate how much of the section is visible
                const visibleTop = Math.max(scrollY, sectionTop);
                const visibleBottom = Math.min(scrollY + windowHeight, sectionBottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const visibility = visibleHeight / windowHeight;

                if (visibility > bestVisibility) {
                    bestVisibility = visibility;
                    bestSection = index;
                }
            });

            setCurrentSection(bestSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        registerSection,
        currentSection,
        totalSections: sectionsRef.current.length,
        scrollToSection,
    };
};
