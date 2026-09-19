import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { LockIn } from "@/components/home/LockIn";
import { Prime } from "@/components/home/Prime";
import { Progress } from "@/components/home/Progress";
import { PageEffects } from "@/components/PageEffects";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <LockIn />
      <Prime />
      <Progress />
      <FinalCTA />
      <PageEffects />
    </main>
  );
}
