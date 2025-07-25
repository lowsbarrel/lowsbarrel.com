import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";

const contactMethods = [
  {
    name: "Email",
    value: "alessandro@lowsbarrel.com",
    href: "mailto:alessandro@lowsbarrel.com",
    icon: Mail,
    description: "alessandro@lowsbarrel.com"
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/alessandro-zucchiatti",
    href: "https://linkedin.com/in/alessandro-zucchiatti",
    icon: Linkedin,
    description: "linkedin.com/in/alessandro-zucchiatti"
  },
  {
    name: "GitHub",
    value: "github.com/lowsbarrel",
    href: "https://github.com/lowsbarrel",
    icon: Github,
    description: "github.com/lowsbarrel"
  }
];

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6" id="contact">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Let's connect.
          </p>
        </div>

        <div className="text-center mb-12 fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-base sm:text-lg text-muted-foreground">
            Connect with me through any of these platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="card-hover fade-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="p-2 sm:p-3 rounded-lg bg-muted flex-shrink-0">
                      <method.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{method.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{method.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="flex-shrink-0 ml-2">
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;