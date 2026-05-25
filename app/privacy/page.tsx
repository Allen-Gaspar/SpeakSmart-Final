import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy - SPEAKSMART",
  description: "Read SPEAKSMART privacy policy to understand how we protect your data and personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="glass rounded-3xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                Last updated: April 2026
              </p>
            </div>
          </section>

          {/* Content */}
          <article className="glass rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At SPEAKSMART, we are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information you provide when registering.</li>
                <li><strong>Learning Data:</strong> Your language learning progress, lessons completed, practice sessions, and performance metrics.</li>
                <li><strong>Voice Data:</strong> Audio recordings of your voice when you practice pronunciation (stored securely for improvement purposes).</li>
                <li><strong>Device Information:</strong> Information about your device, browser type, IP address, and usage patterns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Create and manage your account</li>
                <li>Personalize your learning experience</li>
                <li>Improve our services and platform features</li>
                <li>Send you promotional materials and updates (with your consent)</li>
                <li>Respond to your inquiries and customer support requests</li>
                <li>Ensure compliance with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share information we have collected about you in certain situations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li><strong>By Law or to Protect Rights:</strong> If required to disclose personal information by law or to protect our rights.</li>
                <li><strong>Service Providers:</strong> We may share your information with third parties who assist us in operating our website and conducting our business.</li>
                <li><strong>Business Transfers:</strong> Your information may be disclosed if we merge or are acquired by another organization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Security of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use administrative, technical, and physical security measures to protect your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="glass rounded-lg p-4 bg-secondary/50">
                <p className="font-medium">SPEAKSMART Support</p>
                <p className="text-muted-foreground">Email: allengabrielsilvagaspar@gmail.com</p>
                <p className="text-muted-foreground">Address: Pinagkawitan, Lipa City, Batangas, Philippines</p>
              </div>
            </section>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}
