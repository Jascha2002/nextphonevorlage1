const items = [
  { text: '1 Ansprechpartner' },
  { text: 'Günstiger als einzeln' },
  { text: '5 Standorte vor Ort' },
  { text: 'Persönliche Beratung' },
];

export default function VorteileBar() {
  return (
    <section className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {items.map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-1 text-white">
              <span className="text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
