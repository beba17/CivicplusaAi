import { Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide13() {
  return (
    <Shell dark number="13">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker dark>Pilot plan</Kicker>
        <h1 className="font-display text-[4.2vw] font-bold leading-[1] tracking-[-0.06em]">Prove value where <span className="text-[#e86f3d]">the signal is strongest.</span></h1>
      </div>
      <div className="absolute bottom-[21vh] left-[5vw] right-[5vw] grid grid-cols-3 gap-[1.5vw]">
        <div className="border-t-[0.3vw] border-[#e86f3d] pt-[2vh]"><p className="font-display text-[2vw] font-bold text-[#e86f3d]">Phase 1</p><p className="mt-[2vh] text-[1.48vw] leading-[1.3] text-[#f4f0e8]/82">2–3 districts, 2–3 priority themes, local language partners</p></div>
        <div className="border-t-[0.3vw] border-[#178f8b] pt-[2vh]"><p className="font-display text-[2vw] font-bold text-[#178f8b]">Phase 2</p><p className="mt-[2vh] text-[1.48vw] leading-[1.3] text-[#f4f0e8]/82">Add more channels and link to existing planning workflows</p></div>
        <div className="border-t-[0.3vw] border-[#e86f3d] pt-[2vh]"><p className="font-display text-[2vw] font-bold text-[#e86f3d]">Phase 3</p><p className="mt-[2vh] text-[1.48vw] leading-[1.3] text-[#f4f0e8]/82">Expand state-wide and publish reusable interfaces</p></div>
      </div>
      <p className="absolute bottom-[10vh] left-[5vw] text-[1.4vw] text-[#f4f0e8]/60">Measure: time to triage, duplicate reduction, review quality, inclusion, and action closure.</p>
      <Footer dark />
    </Shell>
  );
}