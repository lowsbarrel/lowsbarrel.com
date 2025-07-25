import React, { useState, useEffect, forwardRef } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';

interface AppointmentOption {
    duration: string;
    time: string;
    description: string;
    calLink: string;
    namespace: string;
}

const appointmentOptions: AppointmentOption[] = [
    {
        duration: "15 Min Chat",
        time: "15 min",
        description: "Quick chat",
        calLink: "alessandro-zucchiatti/15-min-meeting",
        namespace: "15-min-meeting"
    },
    {
        duration: "30 Min Chat",
        time: "30 min",
        description: "Standard meeting",
        calLink: "alessandro-zucchiatti/30-min-meeting",
        namespace: "30-min-meeting"
    },
    {
        duration: "60 Min Chat",
        time: "60 min",
        description: "In-depth conversation",
        calLink: "alessandro-zucchiatti/60-min-meeting",
        namespace: "60-min-meeting"
    }
];

const BookAppointment = forwardRef<HTMLElement>((props, ref) => {
    const [selectedOption, setSelectedOption] = useState<AppointmentOption | null>(null);
    const [calApiInitialized, setCalApiInitialized] = useState(false);

    useEffect(() => {
        if (selectedOption && !calApiInitialized) {
            (async function () {
                try {
                    const cal = await getCalApi({ namespace: selectedOption.namespace });
                    cal("ui", {
                        hideEventTypeDetails: false,
                        layout: "month_view",
                        theme: "dark",
                        styles: {
                            branding: { brandColor: "#3b82f6" }
                        }
                    });
                    setCalApiInitialized(true);
                } catch (error) {
                    console.error('Failed to initialize Cal API:', error);
                }
            })();
        }
    }, [selectedOption, calApiInitialized]);

    const handleSelectOption = (option: AppointmentOption) => {
        setSelectedOption(option);
        setCalApiInitialized(false); // Reset API initialization for new selection
    };

    const handleGoBack = () => {
        setSelectedOption(null);
        setCalApiInitialized(false);
    };

    if (selectedOption) {
        return (
            <section ref={ref} className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header with back button */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleGoBack}
                                className="flex items-center gap-2 text-sm"
                            >
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                Back to options
                            </Button>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                <span className="text-base sm:text-lg font-semibold">{selectedOption.duration}</span>
                            </div>
                        </div>

                        {/* Cal.com Embed */}
                        <div className="cal-embed rounded-lg overflow-hidden border border-border bg-card" style={{ minHeight: '500px' }}>
                            <Cal
                                namespace={selectedOption.namespace}
                                calLink={selectedOption.calLink}
                                style={{
                                    width: "100%",
                                    height: "500px",
                                    overflow: "hidden",
                                    border: "none",
                                    background: "transparent"
                                }}
                                config={{
                                    layout: "month_view",
                                    theme: "dark"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={ref} className="py-20 bg-background">
            <div className="container mx-auto px-4 w-full">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12 fade-up">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Book a Call</h2>
                        <p className="text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-4 sm:px-0">
                            Schedule a call with me if you need a more in-depth conversation about anything you want!
                            Choose the duration that best fits your needs.
                        </p>
                    </div>

                    {/* Appointment Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 fade-up" style={{ animationDelay: "0.2s" }}>
                        {appointmentOptions.map((option, index) => (
                            <Card key={index} className="card-hover transition-all duration-300 hover:shadow-lg">
                                <div className="p-4 sm:p-6 text-center">
                                    <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                        {option.time}
                                    </div>
                                    <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{option.duration}</h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{option.description}</p>
                                    <Button
                                        variant="outline"
                                        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                                        onClick={() => handleSelectOption(option)}
                                    >
                                        Select this option →
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-6 sm:mt-8 fade-up" style={{ animationDelay: "0.4s" }}>
                        <p className="text-xs sm:text-sm text-muted-foreground px-4 sm:px-0">
                            All appointments are conducted via video call. You'll receive a meeting link after booking.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

BookAppointment.displayName = "BookAppointment";

export default BookAppointment;
