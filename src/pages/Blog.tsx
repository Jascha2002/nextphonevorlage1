import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";

const posts = [
  {
    title: "iPhone 16 — jetzt mit Wertgarantie bei NextPhones",
    excerpt: "Das neue iPhone 16 ist da! Sichern Sie sich jetzt Ihr neues Smartphone mit umfassendem Schutz durch unsere Wertgarantie.",
    category: "Smartphones",
    date: "15. Jan 2025",
  },
  {
    title: "DSL vs. Glasfaser — was lohnt sich für Sie?",
    excerpt: "Erfahren Sie die wichtigsten Unterschiede zwischen DSL und Glasfaser und welche Technologie für Ihren Bedarf am besten passt.",
    category: "Tarife",
    date: "10. Jan 2025",
  },
  {
    title: "5 Tipps wie Sie bei Ihrem Handyvertrag sparen",
    excerpt: "Mit diesen einfachen Tricks können Sie bei Ihrem nächsten Handyvertrag bares Geld sparen — ohne auf Leistung zu verzichten.",
    category: "Tipps & Tricks",
    date: "05. Jan 2025",
  },
];

const categories = ["Tarife", "Smartphones", "Tipps & Tricks", "Aktionen"];

const Blog = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Blog & News</h1>
        <p className="text-muted-foreground text-center mb-8">
          Neuigkeiten, Tipps und Aktionen rund um Telekommunikation.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.title} className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-secondary flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="text-sm font-medium text-primary">Weiterlesen →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
