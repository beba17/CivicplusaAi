import type { ReactNode } from 'react';

export const base = import.meta.env.BASE_URL;

export function Shell({
  children,
  dark = false,
  number,
}: {
  children: ReactNode;
  dark?: boolean;
  number?: string;
}) {
  return (
    <div className={`relative w-screen h-screen overflow-hidden ${dark ? 'bg-[#15313a] text-[#f4f0e8]' : 'bg-[#f4f0e8] text-[#15313a]'}`}>
      <div className="absolute inset-0 slide-noise opacity-30" />
      <div className="relative z-10 h-full w-full">{children}</div>
      {number ? <div className={`absolute bottom-[4vh] right-[5vw] text-[1.35vw] font-body tracking-[0.18em] ${dark ? 'text-[#f4f0e8]/50' : 'text-[#15313a]/45'}`}>{number}</div> : null}
    </div>
  );
}

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`mb-[3vh] flex items-center gap-[0.8vw] text-[1.25vw] font-body font-bold uppercase tracking-[0.16em] ${dark ? 'text-[#e86f3d]' : 'text-[#178f8b]'}`}><span className="h-[0.6vw] w-[0.6vw] rounded-full bg-current" />{children}</div>;
}

export function Footer({ children, dark = false }: { children?: ReactNode; dark?: boolean }) {
  return <div className={`absolute bottom-[4vh] left-[5vw] text-[1.25vw] font-body tracking-[0.09em] ${dark ? 'text-[#f4f0e8]/55' : 'text-[#15313a]/50'}`}>{children ?? 'JANSETU AI  /  DIGITAL INFRASTRUCTURE & GOVERNANCE'}</div>;
}

export function Bullet({ children, accent = '#e86f3d', dark = false }: { children: ReactNode; accent?: string; dark?: boolean }) {
  return <div className="flex items-start gap-[1vw]"><span className="mt-[0.9vh] h-[0.65vw] w-[0.65vw] shrink-0 rounded-full" style={{ backgroundColor: accent }} /><p className={`text-[1.62vw] leading-[1.35] ${dark ? 'text-[#f4f0e8]/85' : 'text-[#15313a]/82'}`}>{children}</p></div>;
}

export function Card({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <div className={`border p-[2vw] ${dark ? 'border-[#f4f0e8]/15 bg-[#f4f0e8]/[0.06]' : 'border-[#15313a]/10 bg-[#fffaf0]/65'} ${className}`}>{children}</div>;
}