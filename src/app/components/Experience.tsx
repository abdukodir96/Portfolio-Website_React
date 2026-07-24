import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

type Job = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

const technologiesByJob = [
  ["TypeScript", "NestJS", "Express", "FastAPI", "MongoDB", "MySQL", "Prisma", "Redis", "Docker", "Nginx", "PyTorch", "OpenCV"],
  ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT", "Docker", "Nginx", "PM2", "Linux", "Grafana", "GitHub"],
  ["Node.js", "Python", "React", "Next.js", "MongoDB", "MySQL", "HTML", "CSS", "Bootstrap", "GitHub"]
];

export function Experience() {
  const { t } = useTranslation();
  const jobs = t("experience.jobs", { returnObjects: true }) as Job[];
  const experiences = jobs.map((job, index) => ({
    ...job,
    technologies: technologiesByJob[index] ?? []
  }));

  return (
    <section className="py-20 px-4">
      <div className="max-w-[75.6rem] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">{t("experience.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("experience.description")}
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.title}
                    </CardTitle>
                    <p className="text-primary mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}