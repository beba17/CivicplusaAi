import { Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide7() {
  return (
    <Shell number="07">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker>The policy view</Kicker>
        <h1 className="font-display text-[4.3vw] font-bold leading-[1] tracking-[-0.06em]">Hotspots, not <span className="text-[#178f8b]">anecdotes.</span></h1>
      </div>
      <Card className="absolute bottom-[12vh] left-[5vw] h-[49vh] w-[55vw] overflow-hidden bg-[#d8ebe1]">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-[17%] top-[23%] h-[18vw] w-[15vw] rounded-[45%_55%_48%_52%] bg-[#b0d5c5] rotate-[18deg]" />
          <div className="absolute left-[42%] top-[17%] h-[21vw] w-[17vw] rounded-[52%_48%_45%_55%] bg-[#a2c9bd] rotate-[-22deg]" />
          <div className="absolute left-[62%] top-[38%] h-[16vw] w-[13vw] rounded-[48%_52%_50%_50%] bg-[#bddbc9] rotate-[33deg]" />
          <div className="absolute left-[21%] top-[38%] h-[1.3vw] w-[1.3vw] rounded-full bg-[#e86f3d] shadow-[0_0_0_0.7vw_rgba(232,111,61,0.22)]" />
          <div className="absolute left-[48%] top-[31%] h-[1.3vw] w-[1.3vw] rounded-full bg-[#e86f3d] shadow-[0_0_0_0.7vw_rgba(232,111,61,0.22)]" />
          <div className="absolute left-[71%] top-[54%] h-[1.3vw] w-[1.3vw] rounded-full bg-[#178f8b] shadow-[0_0_0_0.7vw_rgba(23,143,139,0.24)]" />
        </div>
        <div className="absolute left-[2vw] top-[2vw] text-[1.25vw] font-bold uppercase tracking-[0.16em] text-[#15313a]/55">Demand intensity · demo data</div>
        <div className="absolute bottom-[2vw] left-[2vw] flex gap-[1.4vw] text-[1.2vw] text-[#15313a]/65"><span className="flex items-center gap-[0.5vw]"><i className="h-[0.65vw] w-[0.65vw] rounded-full bg-[#e86f3d]" /> water</span><span className="flex items-center gap-[0.5vw]"><i className="h-[0.65vw] w-[0.65vw] rounded-full bg-[#178f8b]" /> roads</span></div>
      </Card>
      <div className="absolute bottom-[15vh] right-[6vw] w-[30vw] space-y-[3.5vh]">
        <p className="text-[1.62vw] leading-[1.3]">Map demand intensity by district and infrastructure theme.</p>
        <p className="text-[1.62vw] leading-[1.3] text-[#15313a]/72">Compare need against service coverage and demographic context.</p>
        <p className="text-[1.62vw] leading-[1.3] text-[#15313a]/72">Click from a hotspot into the underlying citizen evidence.</p>
      </div>
      <Footer />
    </Shell>
  );
}