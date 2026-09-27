import { Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide11() {
  return (
    <Shell dark number="11">
      <div className="absolute left-[5vw] top-[9vh]">
        <Kicker dark>Governance</Kicker>
        <h1 className="font-display text-[4.2vw] font-bold leading-[1] tracking-[-0.06em]">Trust is a <span className="text-[#e86f3d]">product feature.</span></h1>
      </div>
      <div className="absolute bottom-[14vh] left-[5vw] right-[5vw] grid grid-cols-5 gap-[1vw]">
        <Card dark><p className="text-[1.45vw] leading-[1.3]">Citizens can see what was captured and correct it</p></Card>
        <Card dark><p className="text-[1.45vw] leading-[1.3]">Original language stays attached to every translation</p></Card>
        <Card dark><p className="text-[1.45vw] leading-[1.3]">Sensitive fields are minimised and access is scoped</p></Card>
        <Card dark><p className="text-[1.45vw] leading-[1.3]">Recommendations are advisory, never automatic funding decisions</p></Card>
        <Card dark><p className="text-[1.45vw] leading-[1.3]">Communities can challenge, annotate, and close the loop</p></Card>
      </div>
      <Footer dark />
    </Shell>
  );
}