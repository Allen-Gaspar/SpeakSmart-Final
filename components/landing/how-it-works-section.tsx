import { Mic, Volume2, BarChart3, Award } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Volume2,
    title: "Listen to Native Speakers",
    description: "Hear how words and phrases are pronounced with authentic regional accents.",
  },
  {
    step: 2,
    icon: Mic,
    title: "Practice Speaking",
    description: "Record yourself speaking and let our AI analyze your pronunciation.",
  },
  {
    step: 3,
    icon: BarChart3,
    title: "Get AI Feedback",
    description: "Receive instant scoring on accuracy, fluency, and completeness.",
  },
  {
    step: 4,
    icon: Award,
    title: "Track Progress",
    description: "Monitor your improvement, earn XP, and climb the leaderboard.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-balance">How </span>
            <span className="gradient-text">SPEAKSMART Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our simple four-step process helps you improve your speaking skills quickly and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="glass rounded-2xl p-6 h-full">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
