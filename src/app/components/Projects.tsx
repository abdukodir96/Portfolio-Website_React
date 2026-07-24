import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type ProjectItem = {
  title: string;
  description: string;
};

const BASE = import.meta.env.BASE_URL;

const projectMeta = [
  {
    image: `${BASE}MediBridge.png`,
    technologies: ["Next.js", "NestJS", "GraphQL", "MongoDB", "PostgreSQL", "Prisma", "Socket.IO", "RabbitMQ", "FastAPI", "Stripe"],
    github: "#",
    demo: "#"
  },
  {
    image: `${BASE}nearhelps.png`,
    technologies: ["NestJS", "GraphQL", "MongoDB", "Next.js", "Socket.IO", "i18next"],
    github: "#",
    demo: "https://nearhelps.com"
  },
  {
    image: `${BASE}quickstay.png`,
    technologies: ["React 19", "Express 5", "MongoDB", "Stripe", "Clerk"],
    github: "#",
    demo: "https://quickstayhotel.com"
  },
  {
    image: `${BASE}aihabit.png`,
    technologies: ["React 19", "Vite", "Tailwind CSS v4", "Node.js", "Gemini API", "MongoDB"],
    github: "#",
    demo: "https://aihabittracker.online"
  },
  {
    image: `${BASE}Caffiora.png`,
    technologies: ["React", "TypeScript", "Redux Toolkit", "Zustand", "MUI", "Node.js", "MongoDB"],
    github: "#",
    demo: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
    technologies: ["Python", "OpenAI API", "python-telegram-bot", "PostgreSQL", "APScheduler"],
    github: "#",
    demo: "#"
  }
];

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const items = t("projects.items", { returnObjects: true }) as ProjectItem[];
  const projects = items.map((item, index) => ({
    ...item,
    ...projectMeta[index]
  }));

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-[108rem] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">{t("projects.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://github.com/abdukodir96" target="_blank" rel="noopener noreferrer">
                      <GitHubIcon sx={{ fontSize: 16 }} />
                      {t("projects.code")}
                    </a>
                  </Button>
                  {project.demo !== "#" && (
                    <Button size="sm" className="gap-2" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                        {t("projects.demo")}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? (
                <>
                  {t("projects.showLess")}
                  <ExpandLessIcon sx={{ fontSize: 18 }} />
                </>
              ) : (
                <>
                  {t("projects.viewAll")}
                  <ExpandMoreIcon sx={{ fontSize: 18 }} />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}