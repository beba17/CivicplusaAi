import { Bullet, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide14() {
  return (
    <Shell number="14">
      <div className="absolute left-[5vw] top-[10vh]">
        <Kicker>Outcome</Kicker>
        <h1 className="font-display text-[4.3vw] font-bold leading-[1] tracking-[-0.06em]">What success <span className="text-[#e86f3d]">looks like.</span></h1>
      </div>
      <div className="absolute bottom-[13vh] left-[5vw] w-[66vw] space-y-[2.6vh]">
        <Bullet>More citizen requests become comparable evidence</Bullet>
        <Bullet accent="#178f8b">Planners see unmet need before allocating the next rupee</Bullet>
        <Bullet>High-priority projects have a traceable rationale</Bullet>
        <Bullet accent="#178f8b">Communities receive status, not silence</Bullet>
        <Bullet>Public infrastructure investment becomes more responsive and measurable</Bullet>
      </div>
      <div className="absolute bottom-[12vh] right-[8vw] h-[18vw] w-[18vw] rounded-full bg-[#178f8b]"><div className="absolute inset-[1.8vw] rounded-full border-[0.14vw] border-[#f4f0e8]/60" /><div className="absolute left-[4.2vw] top-[3.3vw] h-[7vw] w-[0.25vw] rotate-[42deg] bg-[#f4f0e8]" /><div className="absolute left-[8.5vw] top-[7.7vw] h-[5vw] w-[0.25vw] rotate-[-42deg] bg-[#f4f0e8]" /></div>
      <Footer />
    </Shell>
  );
}