import { Bullet, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide3() {
  return (
    <Shell number="03">
      <div className="absolute left-[5vw] top-[10vh] w-[45vw]">
        <Kicker>The opportunity</Kicker>
        <h1 className="font-display text-[4.3vw] font-bold leading-[1] tracking-[-0.06em]">Make every request <span className="text-[#178f8b]">decision-ready.</span></h1>
      </div>
      <div className="absolute right-[7vw] top-[17vh] h-[55vh] w-[32vw] border-l border-[#15313a]/15 pl-[3vw]">
        <div className="absolute -left-[0.45vw] top-0 h-[0.9vw] w-[0.9vw] rounded-full bg-[#e86f3d]" />
        <div className="absolute -left-[0.45vw] top-[25%] h-[0.9vw] w-[0.9vw] rounded-full bg-[#178f8b]" />
        <div className="absolute -left-[0.45vw] top-[50%] h-[0.9vw] w-[0.9vw] rounded-full bg-[#e86f3d]" />
        <div className="absolute -left-[0.45vw] top-[75%] h-[0.9vw] w-[0.9vw] rounded-full bg-[#178f8b]" />
        <div className="space-y-[5vh]">
          <Bullet>Capture voice, text, and messaging inputs in the citizen's language</Bullet>
          <Bullet accent="#178f8b">Translate and structure unstructured requests without losing local context</Bullet>
          <Bullet>Combine demand with demographic, infrastructure, and investment layers</Bullet>
          <Bullet accent="#178f8b">Surface hotspots and explain why a project should move first</Bullet>
        </div>
      </div>
      <Footer />
    </Shell>
  );
}