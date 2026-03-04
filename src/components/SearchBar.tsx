import { useState, FormEvent } from "react";
import { Search, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    { text: "Show me budget laptops", icon: "💻" },
    { text: "What's good for gaming?", icon: "🎮" },
    { text: "Best headphones under $400", icon: "🎧" },
    { text: "Recommend for creative work", icon: "🎨" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className={`flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-search transition-all duration-300 ${
            isFocused ? "ring-2 ring-primary/30 shadow-glow border-primary/20" : "border-border"
          }`}
        >
          <div className="ml-2 h-9 w-9 rounded-xl bg-gradient-ai flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask AI anything about products..."
            className="flex-1 bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !query.trim()}
            className="rounded-xl px-4 h-9 font-medium"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Ask AI</span>
                <ArrowRight className="h-3 w-3 hidden sm:inline" />
              </>
            )}
          </Button>
        </div>
      </motion.form>

      <motion.div
        className="flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {suggestions.map((s, i) => (
          <motion.button
            key={s.text}
            onClick={() => {
              setQuery(s.text);
              onSearch(s.text);
            }}
            className="text-xs px-3.5 py-2 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 flex items-center gap-1.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          >
            <span>{s.icon}</span>
            {s.text}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SearchBar;
