import { Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide12() {
  return (
    <Shell number="12">
      <div className="absolute left-[5vw] top-[8vh]">
        <Kicker>Platform architecture</Kicker>
        <h1 className="font-display text-[4vw] font-bold leading-[1] tracking-[-0.06em]">A modular architecture <span className="text-[#178f8b]">that can scale.</span></h1>
      </div>
      <div className="absolute bottom-[13vh] left-[5vw] right-[5vw] space-y-[0.8vh]">
        <div className="flex h-[8vh] items-center border border-[#e86f3d]/40 bg-[#e86f3d]/10 px-[2vw]"><span className="w-[18vw] font-display text-[1.55vw] font-bold uppercase tracking-[0.12em] text-[#e86f3d]">Channel adapters</span><span className="text-[1.55vw]">voice · web · SMS · messaging apps</span></div>
        <div className="flex h-[8vh] items-center border border-[#178f8b]/40 bg-[#178f8b]/10 px-[2vw]"><span className="w-[18vw] font-display text-[1.55vw] font-bold uppercase tracking-[0.12em] text-[#178f8b]">Language layer</span><span className="text-[1.55vw]">ASR · translation · entity extraction</span></div>
        <div className="flex h-[8vh] items-center border border-[#15313a]/15 bg-[#fffaf0]/55 px-[2vw]"><span className="w-[18vw] font-display text-[1.55vw] font-bold uppercase tracking-[0.12em] text-[#15313a]/70">Evidence layer</span><span className="text-[1.55vw]">requests · clusters · geospatial context · provenance</span></div>
        <div className="flex h-[8vh] items-center border border-[#15313a]/15 bg-[#fffaf0]/55 px-[2vw]"><span className="w-[18vw] font-display text-[1.55vw] font-bold uppercase tracking-[0.12em] text-[#15313a]/70">Intelligence layer</span><span className="text-[1.55vw]">scoring · hotspot detection · scenario comparison</span></div>
        <div className="flex h-[8vh] items-center border border-[#15313a]/15 bg-[#fffaf0]/55 px-[2vw]"><span className="w-[18vw] font-display text-[1.55vw] font-bold uppercase tracking-[0.12em] text-[#15313a]/70">Decision layer</span><span className="text-[1.55vw]">dashboards · workflows · exports · APIs</span></div>
      </div>
      <Footer />
    </Shell>
  );
}