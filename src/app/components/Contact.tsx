import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Swal from "sweetalert2";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      Swal.fire({
        title: "Email service not configured",
        text: "Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.",
        icon: "error",
      });
      return;
    }

    setIsSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      Swal.fire({
        title: t("contact.alertTitle"),
        text: t("contact.alertText"),
        icon: "success",
      });
      formRef.current.reset();
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: "The message could not be sent. Please try again or email me directly.",
        icon: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">{t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4>{t("contact.email")}</h4>
                    <p className="text-muted-foreground">abdukodirsheraliev1@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <h4>{t("contact.phone")}</h4>
                    <p className="text-muted-foreground">010-5106-9955</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4>{t("contact.telegramKakao")}</h4>
                    <p className="text-muted-foreground">@abdukodir9796 · steve9796</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h4>{t("contact.location")}</h4>
                    <p className="text-muted-foreground">{t("contact.locationValue")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>{t("contact.formTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="name" placeholder={t("contact.yourName")} required />
                  <Input type="email" name="email" placeholder={t("contact.yourEmail")} required />
                </div>
                <Input name="title" placeholder={t("contact.subject")} required />
                <Textarea name="message" placeholder={t("contact.yourMessage")} className="flex-1 min-h-40 resize-none" required />
                <Button type="submit" className="w-full gap-2" disabled={isSending}>
                  <Send className="h-4 w-4" />
                  {isSending ? "..." : t("contact.sendMessage")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}