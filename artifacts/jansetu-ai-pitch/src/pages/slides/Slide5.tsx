import { Bullet, Card, Footer, Kicker, Shell } from '../../components/slide-shared';

export default function Slide5() {
  return (
    <Shell number="05">
      <div className="absolute left-[5vw] top-[10vh]">
        <Kicker>Citizen intake</Kicker>
        <h1 className="font-display text-[4.3vw] font-bold leading-[1] tracking-[-0.06em]">A citizen starts with <span className="text-[#e86f3d]">what they have.</span></h1>
      </div>
      <div className="absolute bottom-[14vh] left-[5vw] right-[5vw] grid grid-cols-[1.1fr_0.9fr] gap-[3vw]">
        <Card className="bg-[#15313a] text-[#f4f0e8]">
          <div className="mb-[3vh] flex items-center gap-[1vw] text-[1.3vw] font-bold uppercase tracking-[0.15em] text-[#e86f3d]"><span className="h-[0.7vw] w-[0.7vw] rounded-full bg-[#e86f3d]" />Incoming request</div>
          <p className="font-body text-[2.15vw] leading-[1.18]">“Paani ki supply roz band ho jaati hai. Hamare gaon mein tanker kab aayega?”</p>
          <p className="mt-[3vh] text-[1.4vw] text-[#f4f0e8]/55">Hindi voice note · Barmer district · consent captured</p>
        </Card>
        <div className="space-y-[2.7vh]">
          <Bullet>Voice note, SMS, WhatsApp-style message, or web form</Bullet>
          <Bullet accent="#178f8b">No new government vocabulary to learn</Bullet>
          <Bullet>Consent and privacy choices are explicit</Bullet>
          <Bullet accent="#178f8b">Status can be returned in the same language and channel</Bullet>
        </div>
      </div>
      <Footer />
    </Shell>
  );
}