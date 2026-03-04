import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

const categoryIcons: Record<string, string> = {
  laptop: "💻",
  headphones: "🎧",
  wearable: "⌚",
  tablet: "📱",
  audio: "🔊",
  keyboard: "⌨️",
};

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => onSelect(null)}
        className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-all duration-200 ${
          selected === null
            ? "bg-primary text-primary-foreground border-primary shadow-card"
            : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === selected ? null : cat)}
          className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-all duration-200 capitalize flex items-center gap-1.5 ${
            selected === cat
              ? "bg-primary text-primary-foreground border-primary shadow-card"
              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
          }`}
        >
          <span>{categoryIcons[cat] || "📦"}</span>
          {cat}
        </button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
