import { Header } from "@/components/Header";
import { TwitterBanner } from "@/components/TwitterBanner";
import { Hero } from "@/components/Hero";
import { EarlyProjects } from "@/components/EarlyProjects";
import { Airdrops } from "@/components/Airdrops";
import { ScamAlerts } from "@/components/ScamAlerts";
import { WhyFollow } from "@/components/WhyFollow";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";
import { signals } from "@/data/signals";
import { airdrops } from "@/data/airdrops";
import { scams } from "@/data/scams";

export default function HomePage() {
  return (
    <>
      <TwitterBanner />
      <Header />
      <main>
        <Hero
          signalCount={signals.length}
          airdropCount={airdrops.length}
          scamCount={scams.length}
        />
        <EarlyProjects signals={signals} />
        <Airdrops airdrops={airdrops} />
        <ScamAlerts scams={scams} />
        <WhyFollow />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
