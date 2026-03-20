import ServiceDetailLayout from "@/components/leistungen/ServiceDetailLayout";
import heroImage from "@/assets/hero-handyservice.jpg";
import serviceHandyservice from "@/assets/service-handyservice.jpg";

const Handyservice = () => (
  <ServiceDetailLayout
    title="Handyservice"
    subtitle="Unser Service rund um Dein Smartphone – schnell, qualitätsorientiert und zum besten Preis!"
    heroImage={heroImage}
    seoTitle="Handyservice & Reparatur in Thüringen — NextPhones Erfurt, Weimar, Gera, Apolda"
    seoDescription="Smartphone-Reparatur und Handyservice bei NextPhones in Erfurt, Weimar, Gera und Apolda. Displayreparatur, Datenübertragung und Handyversicherung."
    sections={[
      {
        title: "Unser Service rund um Dein Smartphone",
        text: "Zack! Ein Schaden am Smartphone ist schnell passiert! Sehr ärgerlich, gerade weil das Smartphone in der heutigen Zeit sehr wichtig ist und täglich genutzt wird. Sehr häufig lassen sich defekte Handys nur noch mit einem speziellen Werkzeug reparieren. Lass Deinen Smartphone-Schaden von unseren Experten reparieren – schnell, qualitätsorientiert und zum besten Preis!",
        image: serviceHandyservice,
        imageAlt: "Smartphone Reparatur",
      },
      {
        title: "Wir übernehmen die Handywartungen",
        text: "Du musst Dich immer wieder mit Deinem Smartphone rumärgern? Profitiere von unserem beliebten Handyservice – von der Ersteinrichtung über die App-Installation bis zur Datenübertragung auf ein Neugerät. Wir kümmern uns darum, dass Dein Smartphone reibungslos funktioniert.",
      },
      {
        title: "Deine Handyversicherung bei NextPhones",
        text: "Gehe kein Risiko ein und hol Dir den idealen Schutz für Dein Smartphone. Wir beraten Dich an allen Standorten bezüglich der Handyversicherung. So bist Du bei Displayschäden, Wasserschäden oder Diebstahl optimal abgesichert.",
      },
    ]}
  />
);

export default Handyservice;
