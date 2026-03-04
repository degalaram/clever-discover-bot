import { useState, useMemo } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ReactMarkdown from "react-markdown";
import { Sparkles, ShoppingBag, Package, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);

  const baseProducts = filteredProducts ?? products;
  const displayProducts = selectedCategory
    ? baseProducts.filter((p) => p.category === selectedCategory)
    : baseProducts;

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setAiSummary(null);
    setSelectedCategory(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask", {
        body: { query },
      });

      if (fnError) throw new Error(fnError.message);

      if (data?.error) {
        setError(data.error);
        setFilteredProducts(null);
        return;
      }

      const { productIds, summary } = data;

      if (productIds && productIds.length > 0) {
        const matched = products.filter((p) => productIds.includes(p.id));
        setFilteredProducts(matched);
      } else {
        setFilteredProducts([]);
      }

      if (summary) {
        setAiSummary(summary);
      }
    } catch (err: unknown) {
      console.error("Search error:", err);
      setError("AI service temporarily unavailable. Please try again.");
      setFilteredProducts(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFilteredProducts(null);
    setAiSummary(null);
    setError(null);
    setSelectedCategory(null);
  };

  const handleOpenProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-14 px-3 sm:px-4">
          <a href="/" className="flex items-center gap-2.5 min-w-0 cursor-pointer no-underline">
            <div className="h-8 w-8 rounded-lg bg-gradient-ai flex items-center justify-center shadow-card shrink-0">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight truncate">DiscvrAI</span>
          </a>
          <span className="text-[10px] text-muted-foreground bg-muted px-2.5 py-1 rounded-full flex items-center gap-1 font-medium uppercase tracking-wider shrink-0">
            <Zap className="h-3 w-3 text-primary" />
            AI-Powered
          </span>
        </div>
      </header>

      <section className="pt-12 sm:pt-14 pb-8 px-3 sm:px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-6xl mx-auto text-center space-y-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <Sparkles className="h-3 w-3" />
            Natural language product search
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-gradient-hero">Discover Products</span>
            <br />
            <span className="text-foreground">with AI</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ask in natural language — our AI understands what you need and finds the perfect match.
          </motion.p>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-3 sm:px-4 pb-16 sm:pb-20">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm text-center border border-destructive/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {aiSummary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-5 rounded-xl border bg-card shadow-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-ai" />
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded-md bg-gradient-ai flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground">AI Recommendation</span>
              </div>
              <div className="text-sm text-muted-foreground prose prose-sm max-w-none leading-relaxed">
                <ReactMarkdown>{aiSummary}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 min-w-0">
              <Package className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate">{filteredProducts ? "AI Results" : "All Products"}</span>
              <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                {displayProducts.length}
              </span>
            </h2>
            {filteredProducts && (
              <button onClick={handleReset} className="text-xs text-primary hover:underline font-medium shrink-0">
                ← Show all products
              </button>
            )}
          </div>

          <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                highlighted={filteredProducts !== null}
                index={i}
                onClick={handleOpenProduct}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground space-y-2"
          >
            <Package className="h-10 w-10 mx-auto text-muted-foreground/40" />
            <p className="font-medium">No products matched your query.</p>
            <p className="text-sm">Try a different question or browse all products!</p>
          </motion.div>
        )}

        <footer className="mt-16 sm:mt-20 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground">Built with AI-powered search · DiscvrAI © {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
