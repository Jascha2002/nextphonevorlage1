import { useRef, useState, useCallback } from 'react';
import PaketeHero from '@/components/pakete/PaketeHero';
import VorteileBar from '@/components/pakete/VorteileBar';
import PaketCards from '@/components/pakete/PaketCards';
import BundleKonfigurator from '@/components/pakete/BundleKonfigurator';
import WarumBundle from '@/components/pakete/WarumBundle';
import PaketAnfrageFormular from '@/components/pakete/PaketAnfrageFormular';
import PaketeFooterCTA from '@/components/pakete/PaketeFooterCTA';
import { komponenten } from '@/data/paketeData';

export default function Pakete() {
  const paketeRef = useRef<HTMLDivElement>(null);
  const konfiguratorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [preSelectedPaket, setPreSelectedPaket] = useState('');
  const [preSelectedComponents, setPreSelectedComponents] = useState<string[]>([]);
  const [prePersons, setPrePersons] = useState(1);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePaketAnfrage = useCallback((paketId: string) => {
    setPreSelectedPaket(paketId);
    setPreSelectedComponents([]);
    setPrePersons(1);
    setTimeout(() => scrollTo(formRef), 100);
  }, []);

  const handleKonfiguratorSubmit = useCallback((config: { target: string; components: string[]; persons: number }) => {
    setPreSelectedPaket('eigene');
    const labels = config.components.map(c => komponenten.find(k => k.id === c)?.label || c);
    setPreSelectedComponents(labels);
    setPrePersons(config.persons);
    setTimeout(() => scrollTo(formRef), 100);
  }, []);

  return (
    <>
      <PaketeHero
        onScrollKonfigurator={() => scrollTo(konfiguratorRef)}
        onScrollPakete={() => scrollTo(paketeRef)}
      />
      <VorteileBar />
      <div ref={paketeRef}>
        <PaketCards onAnfrage={handlePaketAnfrage} />
      </div>
      <div ref={konfiguratorRef}>
        <BundleKonfigurator onSubmit={handleKonfiguratorSubmit} />
      </div>
      <WarumBundle />
      <div ref={formRef}>
        <PaketAnfrageFormular
          preSelectedPaket={preSelectedPaket}
          preSelectedComponents={preSelectedComponents}
          prePersons={prePersons}
        />
      </div>
      <PaketeFooterCTA />
    </>
  );
}
