import { forwardRef } from "react";
import { Card } from "@/components/ui/card";

const experiences = [
  {
    company: "Quantivo",
    role: "Co-Founder & CTO",
    period: "2025 - Now",
    location: "Italy",
    description: "Founded and leading the technical vision of a fintech software company. Building scalable financial solutions and managing the entire tech stack.",
    color: "status-blue"
  },
  {
    company: "NoHold",
    role: "AI Engineer",
    period: "2025 - 2025",
    location: "Silicon Valley, CA (Remote)",
    description: "Worked at a Silicon Valley startup developing AI products. Contributed to machine learning pipelines and AI-driven solutions.",
    color: "status-green"
  },
  {
    company: "Self-Hosting & DevOps",
    role: "DevOps Engineer",
    period: "2022 - Present",
    location: "Italy",
    description: "Extensive experience in DevOps, setting up and managing game servers, implementing CI/CD pipelines, and maintaining self-hosted infrastructure.",
    color: "status-orange"
  },
  {
    company: "AI & Big Data Studies",
    role: "University Student",
    period: "2024 - Present",
    location: "Italy",
    description: "Currently pursuing bachelor's degree in AI and Big Data. Diving deep into machine learning, data science, and artificial intelligence.",
    color: "status-purple"
  }
];

const Experience = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6" id="experience">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Timeline</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            My journey so far.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="card-hover">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                    <div className="flex flex-col items-center mt-1">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-${exp.color} rounded-full`}></div>
                      {index < experiences.length - 1 && (
                        <div className="w-px h-12 sm:h-16 bg-border mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                            {exp.role}
                          </h3>
                          <div className="text-primary font-medium text-sm sm:text-base">
                            {exp.company}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {exp.location}
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground font-medium flex-shrink-0">
                          {exp.period}
                        </div>
                      </div>


                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;