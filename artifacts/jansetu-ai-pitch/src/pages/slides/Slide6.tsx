import { Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide6() {
  return (
    <Shell dark number="06">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker dark>The AI pipeline</Kicker>
        <h1 className="font-display text-[4.3vw] font-bold leading-[1] tracking-[-0.06em]">Turns noise into <span className="text-[#e86f3d]">structure.</span></h1>
      </div>
      <div className="absolute bottom-[19vh] left-[5vw] right-[5vw] flex items-stretch gap-[0.8vw]">
        <div className="flex-1 border border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06] p-[1.6vw]"><div className="mb-[4vh] text-[3vw] font-display font-bold text-[#e86f3d]">01</div><p className="text-[1.45vw] leading-[1.25]">Detect language and transcribe</p></div>
        <div className="flex-1 border border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06] p-[1.6vw]"><div className="mb-[4vh] text-[3vw] font-display font-bold text-[#178f8b]">02</div><p className="text-[1.45vw] leading-[1.25]">Translate with original text preserved</p></div>
        <div className="flex-1 border border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06] p-[1.6vw]"><div className="mb-[4vh] text-[3vw] font-display font-bold text-[#e86f3d]">03</div><p className="text-[1.45vw] leading-[1.25]">Extract location, need, urgency, and affected groups</p></div>
        <div className="flex-1 border border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06] p-[1.6vw]"><div className="mb-[4vh] text-[3vw] font-display font-bold text-[#178f8b]">04</div><p className="text-[1.45vw] leading-[1.25]">Cluster duplicates into a shared demand signal</p></div>
        <div className="flex-1 border border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06] p-[1.6vw]"><div className="mb-[4vh] text-[3vw] font-display font-bold text-[#e86f3d]">05</div><p className="text-[1.45vw] leading-[1.25]">Route low-confidence cases for human review</p></div>
      </div>
      <Footer dark>JANSETU AI  /  ORIGINAL LANGUAGE STAYS ATTACHED</Footer>
    </Shell>
  );
}