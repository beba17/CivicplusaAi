import { base, Kicker, Shell, Footer } from '../../components/slide-shared';

export default function Slide1() {
  return (
    <Shell dark number="01">
      <img src={`${base}jansetu-hero.jpg`} crossOrigin="anonymous" alt="Abstract network of towns and rivers at blue hour" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,49,58,0.95)_0%,rgba(21,49,58,0.7)_50%,rgba(21,49,58,0.38)_100%)]" />
      <div className="absolute left-[5vw] top-[12vh] max-w-[62vw]">
        <Kicker dark>Hackathon prototype · Demo data clearly labeled</Kicker>
        <h1 className="max-w-[60vw] font-display text-[7vw] font-bold leading-[0.92] tracking-[-0.07em] text-[#f4f0e8]">JanSetu <span className="text-[#e86f3d]">AI</span></h1>
        <p className="mt-[5vh] max-w-[38vw] text-[2.3vw] leading-[1.15] text-[#f4f0e8]/88">From citizen voice to national infrastructure action.</p>
        <p className="mt-[2vh] max-w-[35vw] text-[1.55vw] leading-[1.4] text-[#f4f0e8]/68">A multilingual Digital Public Good for India.</p>
      </div>
      <div className="absolute bottom-[11vh] right-[7vw] h-[14vw] w-[14vw] rounded-full border border-[#e86f3d]/70">
        <div className="absolute inset-[1.8vw] rounded-full border border-[#e86f3d]/50" />
        <div className="absolute left-1/2 top-1/2 h-[0.8vw] w-[0.8vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e86f3d]" />
      </div>
      <Footer dark>JANSETU AI  /  CIVIC SIGNAL → PUBLIC ACTION</Footer>
    </Shell>
  );
}