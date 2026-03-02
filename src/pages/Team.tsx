import { Users } from "lucide-react";

const teamMembers = [
  { name: "Max Mustermann", position: "Geschäftsführer", location: "Erfurt" },
  { name: "Maria Schmidt", position: "Filialleitung", location: "Erfurt" },
  { name: "Thomas Müller", position: "Verkaufsberater", location: "Apolda" },
  { name: "Anna Weber", position: "Filialleitung", location: "Weimar" },
  { name: "Stefan Koch", position: "Techniker", location: "Gera Debschwitz" },
  { name: "Laura Becker", position: "Verkaufsberaterin", location: "Gera Zentrum" },
  { name: "Markus Fischer", position: "Verkaufsberater", location: "Erfurt" },
  { name: "Julia Hoffmann", position: "Auszubildende", location: "Erfurt" },
];

const Team = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Unser Team</h1>
        <p className="text-muted-foreground text-center mb-4 max-w-xl mx-auto">
          Dein persönlicher Ansprechpartner — kompetent, freundlich und immer für dich da.
        </p>

        <div className="flex justify-center mb-12">
          <img
            src="/images/team-photo-2.jpeg"
            alt="NextPhones Team"
            className="rounded-lg shadow-lg max-w-3xl w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-card rounded-lg p-6 border shadow-sm text-center">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-primary">{member.position}</p>
              <p className="text-xs text-muted-foreground mt-1">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
