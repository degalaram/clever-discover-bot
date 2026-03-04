import { useState } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import ReactMarkdown from "react-markdown";
import { Sparkles, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayProducts = filteredProducts ?? products;

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setAiSummary(null);

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
    } catch (err: any) {
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-ai flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">DiscvrAI</span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Powered
          </span>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="pt-16 pb-10 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-gradient-hero">Discover Products</span>
            <br />
            <span className="text-foreground">with AI</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ask in natural language — our AI understands what you need and finds the perfect match.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* Results */}
      <main className="container max-w-6xl mx-auto px-4 pb-20">
        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        {/* AI Summary */}
        {aiSummary && (
          <div className="mb-8 p-5 rounded-xl border bg-card shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-display font-semibold text-sm text-foreground">AI Recommendation</span>
            </div>
            <div className="text-sm text-muted-foreground prose prose-sm max-w-none">
              <ReactMarkdown>{aiSummary}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Product count + reset */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {filteredProducts ? "AI Results" : "All Products"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({displayProducts.length})
            </span>
          </h2>
          {filteredProducts && (
            <button
              onClick={handleReset}
              className="text-sm text-primary hover:underline"
            >
              Show all products
            </button>
          )}
        </div>

        {/* Products grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                highlighted={filteredProducts !== null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No products matched your query. Try a different question!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
