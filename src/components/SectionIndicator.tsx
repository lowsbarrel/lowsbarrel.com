import React from 'react';

interface SectionIndicatorProps {
    currentSection: number;
    totalSections: number;
    onSectionClick: (index: number) => void;
    sectionNames?: string[];
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
    currentSection,
    totalSections,
    onSectionClick,
    sectionNames = []
}) => {
    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3 hidden lg:block">
            {Array.from({ length: totalSections }, (_, index) => (
                <div
                    key={index}
                    className="group flex items-center cursor-pointer"
                    onClick={() => onSectionClick(index)}
                >
                    {/* Section name tooltip */}
                    {sectionNames[index] && (
                        <div className="hidden group-hover:block absolute right-8 bg-background border border-border rounded-md px-3 py-1 text-sm font-medium shadow-lg whitespace-nowrap">
                            {sectionNames[index]}
                        </div>
                    )}

                    {/* Indicator dot */}
                    <div
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${currentSection === index
                                ? 'bg-primary border-primary scale-125'
                                : 'bg-transparent border-muted-foreground hover:border-primary hover:scale-110'
                            }`}
                    />
                </div>
            ))}
        </div>
    );
};

export default SectionIndicator;
