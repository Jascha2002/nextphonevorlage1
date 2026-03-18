import { Eye } from 'lucide-react';

export default function DemoBanner() {
  const isDemoMode = new URLSearchParams(window.location.search).get('demo') === 'true'
    || sessionStorage.getItem('np_demo') === 'true';

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-black text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
      <Eye className="h-4 w-4" />
      Demo-Modus – Nur Ansicht, keine Änderungen möglich
    </div>
  );
}
