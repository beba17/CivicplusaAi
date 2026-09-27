import { Bullet, Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide2() {
  return (
    <Shell number="02">
      <div className="absolute left-[5vw] top-[10vh] max-w-[78vw]">
        <Kicker>The problem</Kicker>
        <h1 className="max-w-[70vw] font-display text-[4.2vw] font-bold leading-[1.02] tracking-[-0.05em]">The signal is everywhere. <span className="text-[#e86f3d]">The system is fragmented.</span></h1>
      </div>
      <div className="absolute bottom-[15vh] left-[5vw] right-[5vw] grid grid-cols-2 gap-[1.5vw]">
        <Card><Bullet>Requests arrive through offices, helplines, apps, and messaging groups</Bullet></Card>
        <Card><Bullet accent="#178f8b">Feedback is difficult to compare across languages and districts</Bullet></Card>
        <Card><Bullet accent="#178f8b">Infrastructure priorities and lived demand rarely meet in one view</Bullet></Card>
        <Card><Bullet>Policymakers need evidence that is local, explainable, and actionable</Bullet></Card>
      </div>
      <Footer />
    </Shell>
  );
}