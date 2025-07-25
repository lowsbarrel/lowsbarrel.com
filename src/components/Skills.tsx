import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "Bash"]
  },
  {
    category: "DevOps & Infrastructure",
    items: ["Docker", "CI/CD", "Linux", "Server Management", "Cloud Platforms"]
  },
  {
    category: "AI & Data",
    items: ["Machine Learning", "Data Processing", "Big Data", "AI Products"]
  },
  {
    category: "Web Development",
    items: ["React", "Next.js", "REST APIs", "Database Design"]
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub Actions", "AWS", "Self-hosting", "Monitoring"]
  }
];

const Skills = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6" id="skills">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Skills</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            What I use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="card-hover fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="mr-2 mb-2 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Current Focus */}
        <div className="mt-16 text-center fade-up" style={{ animationDelay: "0.6s" }}>
          <Card className="inline-block">
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Currently Learning</h3>
              <p className="text-muted-foreground">
                Advanced AI architectures, distributed systems, and financial technology innovations
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;