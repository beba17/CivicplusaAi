import { Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide15() {
  return (
    <Shell dark number="15">
      <div className="absolute left-[5vw] top-[15vh] max-w-[72vw]">
        <Kicker dark>Join the build</Kicker>
        <h1 className="font-display text-[6.2vw] font-bold leading-[0.94] tracking-[-0.07em]">Help us build<br /><span className="text-[#e86f3d]">the bridge.</span></h1>
        <p className="mt-[5vh] max-w-[47vw] text-[2vw] leading-[1.25] text-[#f4f0e8]/84">JanSetu AI turns many voices into a shared map of what matters next.</p>
        <p className="mt-[3vh] max-w-[42vw] text-[1.45vw] leading-[1.4] text-[#f4f0e8]/62">We are looking for pilot partners, language and accessibility collaborators, and public-data stewards.</p>
      </div>
      <div className="absolute bottom-[13vh] right-[7vw] flex h-[16vw] w-[16vw] items-center justify-center rounded-full border-[0.16vw] border-[#e86f3d]/65"><div className="flex h-[9vw] w-[9vw] items-center justify-center rounded-full bg-[#e86f3d] font-display text-[2.2vw] font-bold text-[#15313a]">J</div></div>
      <Footer dark>JANSETU AI  /  THANK YOU · QUESTIONS</Footer>
    </Shell>
  );
}