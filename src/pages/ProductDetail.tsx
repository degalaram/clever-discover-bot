import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
  Tag,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "@/data/products";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const product = useMemo(
    () => products.find((item) => item.id === Number(productId)),
    [productId],
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSlide = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    updateSlide();
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);

    return () => {
      carouselApi.off("select", updateSlide);
    };
  }, [carouselApi]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  const renderRatingStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
              ? "fill-primary/40 text-primary/40"
              : "text-muted"
        }`}
      />
    ));

  if (!product) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20">
          <div className="container max-w-6xl mx-auto h-14 px-3 sm:px-4 flex items-center">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <main className="container max-w-6xl mx-auto px-3 sm:px-4 py-14 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
          <p className="text-muted-foreground mt-2 mb-6">This product link is invalid or no longer available.</p>
          <Button onClick={() => navigate("/")}>Go to products</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container max-w-6xl mx-auto h-14 px-3 sm:px-4 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-ai flex items-center justify-center shadow-card shrink-0">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-sm sm:text-base truncate">DiscvrAI</span>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-3 sm:space-y-4">
            <div className="relative rounded-2xl border bg-card p-2 sm:p-3 shadow-card">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent className="-ml-0">
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={`${product.id}-${index}`} className="pl-0">
                      <div className="aspect-square sm:aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                        <img
                          src={image}
                          alt={`${product.name} image ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {galleryImages.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => carouselApi?.scrollPrev()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => carouselApi?.scrollNext()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={`thumb-${product.id}-${index}`}
                    type="button"
                    className={`aspect-square rounded-lg border overflow-hidden transition-all ${
                      activeIndex === index ? "ring-2 ring-primary border-primary" : "border-border"
                    }`}
                    onClick={() => {
                      setActiveIndex(index);
                      carouselApi?.scrollTo(index);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border bg-card p-4 sm:p-6 shadow-card space-y-5 h-fit">
            <div className="space-y-3">
              <Badge variant="secondary" className="capitalize text-xs">
                {product.category}
              </Badge>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-card-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="font-display font-bold text-primary text-3xl sm:text-4xl">${product.price}</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">{renderRatingStars(product.rating)}</div>
                  <span className="text-sm text-muted-foreground">{product.rating} / 5</span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <Tag className="h-3.5 w-3.5" />
                Key highlights
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs capitalize">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4 space-y-2">
              <h2 className="font-display font-semibold text-base">Why this product</h2>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Top rated in {product.category} with {product.rating} stars</li>
                <li>Matches needs around {product.tags.slice(0, 2).join(" and ")}</li>
                <li>Balanced value at ${product.price}</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
