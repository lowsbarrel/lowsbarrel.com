
import { useEffect, useRef, useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import avatarImage from "@/assets/alessandro-avatar.png";

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // Typewriter effect for the headline
  const fullText = "hello, Alessandro here|";
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        if (idx.current < fullText.length) {
          const next = prev + fullText[idx.current];
          idx.current += 1;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 70);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20" id="about">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center space-y-6 sm:space-y-8 fade-up">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto relative">
              <img
                src={avatarImage}
                alt="Alessandro Zucchiatti"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-status-green rounded-full border-2 sm:border-4 border-background flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                {displayed}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
                your average tech enthusiast from Italy trying to build the future of fintech.
                Currently CTO at Quantivo and studying AI & Big Data 🚀
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Italy</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span>20 years old</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span>@lowsbarrel</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button asChild size="sm" className="text-sm">
                <a href="#contact" className="flex items-center gap-2">
                  Get in touch
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="text-sm">
                <a href="https://github.com/lowsbarrel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="text-sm">
                <a href="https://linkedin.com/in/alessandro-zucchiatti" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-md mx-auto pt-6 sm:pt-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">5+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years Coding</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">2</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">∞</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Coffee Cups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;