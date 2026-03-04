import { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  highlighted?: boolean;
  index?: number;
  onClick?: (product: Product) => void;
}

const ProductCard = ({ product, highlighted = false, index = 0, onClick }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card
        onClick={() => onClick?.(product)}
        className={`group overflow-hidden transition-all duration-300 shadow-card hover:shadow-card-hover cursor-pointer bg-gradient-card ${
          highlighted ? "ring-2 ring-primary/60 shadow-glow" : ""
        }`}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-card">
              <ExternalLink className="h-3.5 w-3.5 text-foreground" />
            </div>
          </div>
          {highlighted && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 shadow-card">
                AI Pick
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-base leading-tight text-card-foreground group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>
            <span className="font-display font-bold text-primary text-lg whitespace-nowrap">
              ${product.price}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                        ? "fill-primary/40 text-primary/40"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
            </div>
            <Badge variant="secondary" className="text-[10px] capitalize font-medium">
              {product.category}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
