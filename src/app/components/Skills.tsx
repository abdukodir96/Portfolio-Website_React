import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Settings, Globe, Sparkles, Plug } from "lucide-react";

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      iconSrc: "/backend.webp",
      titleKey: "backend",
      skills: ["NestJS", "Node.js", "Express.js", "FastAPI", "Python", "GraphQL", "REST API", "MongoDB", "Mongoose", "PostgreSQL", "Prisma", "MySQL", "Redis", "JWT", "Socket.IO", "SQLAlchemy"]
    },
    {
      icon: Globe,
      titleKey: "frontend",
      skills: ["HTML", "CSS", "SASS", "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Redux Toolkit", "Zustand", "Apollo Client", "Tailwind CSS", "React Native"]
    },
    {
      icon: Sparkles,
      titleKey: "aiml",
      skills: ["Google Gemini API", "OpenAI API", "RAG", "PyTorch", "OpenCV", "NumPy", "Pandas", "python-telegram-bot"]
    },
    {
      icon: Plug,
      titleKey: "integrations",
      skills: ["Clerk", "Stripe", "Cloudinary", "Nodemailer", "Resend"]
    },
    {
      icon: Settings,
      titleKey: "devops",
      skills: ["Docker", "Docker Compose", "Nginx", "Let's Encrypt", "Linux", "PM2", "Git", "GitHub"]
    },
    {
      icon: Code,
      titleKey: "patterns",
      skills: ["MVC", "Monorepo", "Dependency Injection", "Middleware", "Webhooks", "Postman", "VS Code", "Figma"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">{t("skills.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = "icon" in category ? category.icon : undefined;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {"iconSrc" in category ? (
                      <img src={category.iconSrc} alt="" className="h-5 w-5" />
                    ) : IconComponent ? (
                      <IconComponent className="h-5 w-5 text-primary" />
                    ) : null}
                    {t(`skills.categories.${category.titleKey}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}