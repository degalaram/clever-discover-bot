import { Product } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Tag, Layers, DollarSign } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, open, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <DialogTitle className="font-display text-xl font-bold text-foreground leading-tight">
                {product.name}
              </DialogTitle>
              <span className="font-display font-bold text-primary text-2xl whitespace-nowrap">
                ${product.price}
              </span>
            </div>
          </DialogHeader>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Layers className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Category</p>
                <p className="text-sm font-medium text-foreground capitalize">{product.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Rating</p>
                <p className="text-sm font-medium text-foreground">{product.rating} / 5.0</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              <span className="font-medium uppercase tracking-wider">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs capitalize">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
