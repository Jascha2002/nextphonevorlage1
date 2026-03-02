import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts, blogCategories } from "@/data/blogPosts";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = activeCategory === "Alle"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">Blog & News</h1>
        <p className="text-muted-foreground text-center mb-8">
          Neuigkeiten, Tipps und Aktionen rund um Telekommunikation.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge className="bg-primary text-primary-foreground mb-3">{post.category}</Badge>
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readingTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="text-sm font-medium text-primary">Weiterlesen →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Haben Sie Fragen zu Tarifen oder Smartphones?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Unsere Experten beraten Sie kostenlos in einem unserer 5 Standorte in Thüringen.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/beratung">Jetzt Beratung sichern</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
