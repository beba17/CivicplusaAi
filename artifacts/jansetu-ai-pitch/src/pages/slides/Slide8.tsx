import { Bullet, Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide8() {
  return (
    <Shell number="08">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker>Prioritisation</Kicker>
        <h1 className="font-display text-[4.2vw] font-bold leading-[1] tracking-[-0.06em]">Explainable <span className="text-[#e86f3d]">by design.</span></h1>
      </div>
      <Card className="absolute bottom-[13vh] left-[5vw] w-[42vw] bg-[#15313a] text-[#f4f0e8]">
        <p className="text-[1.2vw] font-bold uppercase tracking-[0.16em] text-[#e86f3d]">Demo scoring model</p>
        <div className="mt-[4vh] flex items-end gap-[1vw]"><span className="font-display text-[7vw] font-bold leading-none text-[#f4f0e8]">82</span><span className="mb-[0.7vw] text-[1.55vw] text-[#f4f0e8]/60">priority score / 100</span></div>
        <div className="mt-[4vh] h-[0.7vw] w-full bg-[#f4f0e8]/15"><div className="h-full w-[82%] bg-[#e86f3d]" /></div>
        <p className="mt-[3vh] text-[1.35vw] text-[#f4f0e8]/55">Every recommendation shows the factors behind its score.</p>
      </Card>
      <div className="absolute bottom-[14vh] right-[6vw] w-[38vw] space-y-[2.5vh]">
        <Bullet>Demand intensity and persistence</Bullet>
        <Bullet accent="#178f8b">Equity gap and affected population</Bullet>
        <Bullet>Feasibility and alignment with active investment plans</Bullet>
        <Bullet accent="#178f8b">Confidence, freshness, and evidence diversity</Bullet>
      </div>
      <Footer />
    </Shell>
  );
}