import { Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide4() {
  return (
    <Shell dark number="04">
      <div className="absolute left-[5vw] top-[11vh] w-[52vw]">
        <Kicker dark>Meet JanSetu AI</Kicker>
        <h1 className="font-display text-[4.5vw] font-bold leading-[0.98] tracking-[-0.06em]">A public-interest intelligence layer between citizen feedback and government planning.</h1>
      </div>
      <div className="absolute bottom-[13vh] left-[5vw] right-[5vw] grid grid-cols-3 gap-[1.5vw]">
        <Card dark><div className="mb-[6vh] font-display text-[4.5vw] font-bold text-[#e86f3d]">01</div><p className="text-[1.65vw] leading-[1.3]">One intake layer for many languages and channels</p></Card>
        <Card dark><div className="mb-[6vh] font-display text-[4.5vw] font-bold text-[#178f8b]">02</div><p className="text-[1.65vw] leading-[1.3]">AI-assisted classification, deduplication, and prioritisation</p></Card>
        <Card dark><div className="mb-[6vh] font-display text-[4.5vw] font-bold text-[#e86f3d]">03</div><p className="text-[1.65vw] leading-[1.3]">A transparent evidence trail from request to recommendation</p></Card>
      </div>
      <Footer dark />
    </Shell>
  );
}