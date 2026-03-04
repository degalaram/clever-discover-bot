import { useState, FormEvent } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    "Show me budget laptops",
    "What's good for gaming?",
    "Best headphones under $400",
    "Recommend something for a creative professional",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-search transition-shadow focus-within:ring-2 focus-within:ring-primary/30">
          <Sparkles className="ml-2 h-5 w-5 text-primary shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI anything about products..."
            className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
          />
          <Button type="submit" size="sm" disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="hidden sm:inline ml-1">Ask</span>
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s);
              onSearch(s);
            }}
            className="text-xs px-3 py-1.5 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
