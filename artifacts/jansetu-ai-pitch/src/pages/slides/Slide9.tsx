import { Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide9() {
  return (
    <Shell dark number="09">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker dark>Prototype walkthrough</Kicker>
        <h1 className="max-w-[72vw] font-display text-[4.1vw] font-bold leading-[1] tracking-[-0.06em]">One request. <span className="text-[#e86f3d]">One recommendation.</span></h1>
      </div>
      <div className="absolute bottom-[16vh] left-[5vw] right-[5vw] grid grid-cols-4 gap-[1vw]">
        <div className="border-t-[0.28vw] border-[#e86f3d] pt-[2vh]"><p className="font-display text-[2.3vw] font-bold text-[#e86f3d]">01</p><p className="mt-[2vh] text-[1.45vw] leading-[1.3] text-[#f4f0e8]/82">A Hindi voice request reports unreliable drinking water in a village cluster</p></div>
        <div className="border-t-[0.28vw] border-[#178f8b] pt-[2vh]"><p className="font-display text-[2.3vw] font-bold text-[#178f8b]">02</p><p className="mt-[2vh] text-[1.45vw] leading-[1.3] text-[#f4f0e8]/82">JanSetu extracts the location and groups nearby duplicates</p></div>
        <div className="border-t-[0.28vw] border-[#e86f3d] pt-[2vh]"><p className="font-display text-[2.3vw] font-bold text-[#e86f3d]">03</p><p className="mt-[2vh] text-[1.45vw] leading-[1.3] text-[#f4f0e8]/82">The hotspot rises because demand is persistent and coverage is low</p></div>
        <div className="border-t-[0.28vw] border-[#178f8b] pt-[2vh]"><p className="font-display text-[2.3vw] font-bold text-[#178f8b]">04</p><p className="mt-[2vh] text-[1.45vw] leading-[1.3] text-[#f4f0e8]/82">The policy view recommends a verified water-supply intervention for review</p></div>
      </div>
      <Footer dark />
    </Shell>
  );
}