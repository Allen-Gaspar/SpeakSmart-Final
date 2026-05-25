import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service - SPEAKSMART",
  description: "Read SPEAKSMART Terms of Service to understand the rules and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="glass rounded-3xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Terms of Service</h1>
              <p className="text-lg text-muted-foreground">
                Last updated: April 2026
              </p>
            </div>
          </section>

          {/* Content */}
          <article className="glass rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the SPEAKSMART website and services, you accept and agree to be bound by and comply with these terms and conditions. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on SPEAKSMART for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The materials on SPEAKSMART are provided on an &apos;as is&apos; basis. SPEAKSMART makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall SPEAKSMART or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SPEAKSMART, even if SPEAKSMART or a SPEAKSMART authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on SPEAKSMART could include technical, typographical, or photographic errors. SPEAKSMART does not warrant that any of the materials on the website are accurate, complete, or current. SPEAKSMART may make changes to the materials contained on the website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                SPEAKSMART has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SPEAKSMART of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                SPEAKSMART may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="glass rounded-lg p-4 bg-secondary/50">
                <p className="font-medium">SPEAKSMART Legal Team</p>
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
