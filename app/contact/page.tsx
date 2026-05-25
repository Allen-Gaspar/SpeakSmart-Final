"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "allengabrielsilvagaspar@gmail.com",
      href: "mailto:allengabrielsilvagaspar@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "09944009180",
      href: "tel:09944009180",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Pinagkawitan, Lipa City, Batangas, Philippines",
      href: "#",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="glass rounded-3xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Contact Us</h1>
              <p className="text-lg text-muted-foreground">
                Have questions or feedback? We&apos;d love to hear from you. Get in touch with our team anytime.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  className="glass rounded-2xl p-6 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm">{info.value}</p>
                </a>
              );
            })}
          </section>

          {/* Contact Form */}
          <section>
            <div className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-2">What&apos;s the typical response time?</h3>
                <p className="text-muted-foreground text-sm">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Panget ba ko? </h3>
                <p className="text-muted-foreground text-sm">
                    Oo, panget ka. Huwag kang mag-alala, hindi ka nag-iisa. Maraming tao ang may insecurities tungkol sa kanilang hitsura, pero tandaan mo na ang tunay na kagandahan ay nagmumula sa loob. Ang pagiging mabait, mapagmalasakit, at may magandang puso ay mas mahalaga kaysa sa panlabas na anyo. Huwag mong hayaang maapektuhan ang iyong kumpiyansa dahil sa mga negatibong komento ng iba. Mahalaga ang pagmamahal sa sarili at pagtanggap sa sarili.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Makakapasa pa ba ko?</h3>
                <p className="text-muted-foreground text-sm">
                  Maybe?, depende sa kung paano mo haharapin ang mga hamon at kung gaano ka kasipag sa pag-aaral. Ang tagumpay ay hindi laging garantisado, pero ang pagsusumikap at determinasyon ay malaking tulong para maabot ang iyong mga goals. Huwag kang matakot magkamali, dahil bahagi ito ng proseso ng pagkatuto. Patuloy lang sa pag-aaral at pag-improve, at baka makamit mo rin ang tagumpay na inaasam mo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
