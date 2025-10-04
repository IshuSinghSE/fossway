import { Header } from "@/components/Header";
import { EnhancedHero } from "@/components/EnhancedHero";
import { Features } from "@/components/Features";
import { EnhancedProcess } from "@/components/EnhancedProcess";
import { About } from "@/components/About";
import { Goals } from "@/components/Goals";
import { Community } from "@/components/Community";
import { EnhancedFooter } from "@/components/EnhancedFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <EnhancedHero />
        <div id="features">
          <Features />
        </div>
        <div id="process">
          <EnhancedProcess />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="goals">
          <Goals />
        </div>
        <div id="community">
          <Community />
        </div>
      </main>
      <EnhancedFooter />
    </div>
  );
}