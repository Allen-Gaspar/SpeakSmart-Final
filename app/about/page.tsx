import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Zap, Users, Globe, Sparkles, Mic } from "lucide-react";

export const metadata = {
  title: "About SPEAKSMART - AI Language Learning",
  description: "Learn about SPEAKSMART, the AI-powered voice language learning platform revolutionizing how people learn languages.",
};

export default function AboutPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "Personalized lessons adapted to your learning pace and style using advanced AI technology.",
    },
    {
      icon: Mic,
      title: "Voice Recognition",
      description: "Real-time pronunciation feedback with native accent training from expert speakers.",
    },
    {
      icon: Globe,
      title: "10+ Languages",
      description: "Learn from English, Spanish, French, German, Mandarin, Japanese, and many more.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with millions of learners worldwide and participate in language challenges.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="glass rounded-3xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About SPEAKSMART</h1>
              <p className="text-lg text-muted-foreground mb-6">
                We&apos;re revolutionizing language learning through AI-powered voice recognition and personalized education.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="glass rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                At SPEAKSMART, we believe that learning a new language should be accessible, engaging, and effective for everyone. Our mission is to empower millions of people worldwide to master any language through cutting-edge AI technology and immersive voice-based learning.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We combine the power of artificial intelligence with expert-crafted lessons to create a truly personalized learning experience that adapts to your unique pace and preferences.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose SPEAKSMART</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="glass rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Impact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">1M+</div>
                <p className="text-muted-foreground">Learners worldwide</p>
              </div>
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">10+</div>
                <p className="text-muted-foreground">Languages available</p>
              </div>
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                <p className="text-muted-foreground">User satisfaction rate</p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <div className="glass rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                SPEAKSMART was founded by a team of linguists, AI researchers, and educators passionate about making language learning accessible to everyone. Our diverse team brings together expertise in machine learning, linguistics, and educational psychology.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Together, we&apos;re committed to continuously improving our platform and helping learners achieve their language goals.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
