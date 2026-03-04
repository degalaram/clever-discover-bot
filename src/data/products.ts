export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image: string;
  images?: string[];
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "ProBook Gaming X15",
    category: "laptop",
    price: 1299,
    description: "High-performance gaming laptop with RTX 4070, 16GB RAM, and 144Hz display. Perfect for AAA titles and content creation.",
    tags: ["gaming", "high-performance", "RTX"],
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=700&fit=crop",
    ],
    rating: 4.7,
  },
  {
    id: 2,
    name: "EduBook Lite 14",
    category: "laptop",
    price: 449,
    description: "Lightweight budget laptop ideal for students. 8GB RAM, 256GB SSD, all-day battery life.",
    tags: ["budget", "student", "portable"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=900&h=700&fit=crop",
    ],
    rating: 4.2,
  },
  {
    id: 3,
    name: "StudioPods Max",
    category: "headphones",
    price: 349,
    description: "Premium noise-cancelling over-ear headphones with spatial audio and 30-hour battery.",
    tags: ["premium", "noise-cancelling", "wireless"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&h=700&fit=crop",
    ],
    rating: 4.8,
  },
  {
    id: 4,
    name: "FitBand Ultra",
    category: "wearable",
    price: 199,
    description: "Advanced fitness tracker with heart rate, SpO2, GPS, and 14-day battery life.",
    tags: ["fitness", "health", "GPS"],
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=900&h=700&fit=crop",
    ],
    rating: 4.4,
  },
  {
    id: 5,
    name: "CreatorPad Pro 12.9",
    category: "tablet",
    price: 899,
    description: "Professional drawing tablet with stylus, 120Hz OLED display, and desktop-class performance.",
    tags: ["creative", "drawing", "professional"],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1589739900243-4b52cd9f5531?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=900&h=700&fit=crop",
    ],
    rating: 4.6,
  },
  {
    id: 6,
    name: "SoundBar Home 5.1",
    category: "audio",
    price: 599,
    description: "Dolby Atmos soundbar with wireless subwoofer and rear speakers for immersive home theater.",
    tags: ["home-theater", "surround-sound", "premium"],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=900&h=700&fit=crop",
    ],
    rating: 4.5,
  },
  {
    id: 7,
    name: "MechKey 75%",
    category: "keyboard",
    price: 149,
    description: "Compact mechanical keyboard with hot-swappable switches, RGB, and wireless connectivity.",
    tags: ["mechanical", "gaming", "wireless"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&h=700&fit=crop",
    ],
    rating: 4.3,
  },
  {
    id: 8,
    name: "UltraWork Laptop 16",
    category: "laptop",
    price: 1899,
    description: "Workstation laptop with M-series chip, 32GB RAM, and stunning Retina display for professionals.",
    tags: ["professional", "workstation", "premium"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=700&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&h=700&fit=crop",
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=900&h=700&fit=crop",
    ],
    rating: 4.9,
  },
];
