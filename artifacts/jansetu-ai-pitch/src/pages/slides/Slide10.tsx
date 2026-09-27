import { Bullet, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide10() {
  return (
    <Shell number="10">
      <div className="absolute left-[5vw] top-[9vh] w-[52vw]">
        <Kicker>Digital Public Good</Kicker>
        <h1 className="font-display text-[4.1vw] font-bold leading-[1] tracking-[-0.06em]">Built for reuse, <span className="text-[#178f8b]">not lock-in.</span></h1>
      </div>
      <div className="absolute bottom-[14vh] right-[6vw] w-[43vw] space-y-[2.4vh]">
        <Bullet>Open interfaces and portable data model</Bullet>
        <Bullet accent="#178f8b">Multilingual by default, not a translation afterthought</Bullet>
        <Bullet>Human review for low confidence and high-impact decisions</Bullet>
        <Bullet accent="#178f8b">Audit logs, provenance, role-based access, and data minimisation</Bullet>
        <Bullet>Deployable from district pilots to national planning systems</Bullet>
      </div>
      <div className="absolute bottom-[15vh] left-[5vw] h-[29vw] w-[29vw] rounded-full border-[0.18vw] border-[#178f8b]/35">
        <div className="absolute inset-[3.3vw] rounded-full border-[0.18vw] border-[#e86f3d]/45" />
        <div className="absolute left-1/2 top-1/2 h-[5vw] w-[5vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#178f8b]" />
        <div className="absolute left-[4vw] top-[5vw] h-[1vw] w-[1vw] rounded-full bg-[#e86f3d]" />
        <div className="absolute bottom-[6vw] right-[3vw] h-[1vw] w-[1vw] rounded-full bg-[#e86f3d]" />
      </div>
      <Footer />
    </Shell>
  );
}