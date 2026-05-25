import { Mic, Brain, BarChart3, Trophy, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Recognition",
    description: "Practice speaking with advanced speech-to-text technology that analyzes your pronunciation in real-time.",
  },
  {
    icon: Brain,
    title: "AI Pronunciation Scoring",
    description: "Get instant feedback on accuracy, fluency, and completeness using machine learning algorithms.",
  },
  {
    icon: Globe,
    title: "25+ Regional Accents",
    description: "Learn authentic accents from native speakers across the world - American, British, Australian, and more.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics, streak tracking, and performance insights.",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn XP, unlock achievements, and compete on global leaderboards to stay motivated.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Receive immediate AI-powered feedback on your pronunciation to improve faster.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-balance">Why Choose </span>
            <span className="gradient-text">SPEAKSMART</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our AI-powered platform combines cutting-edge voice recognition with proven learning methods 
            to help you speak any language with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:bg-card/90 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
