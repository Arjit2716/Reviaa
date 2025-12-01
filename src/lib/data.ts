import { Briefcase, PartyPopper, Shirt, Tally3, VenetianMask } from "lucide-react";

export type ClothingItem = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  size: "XS" | "S" | "M" | "L" | "XL";
  category: string;
  condition: string;
  imageId: string;
};

export const clothingItems: ClothingItem[] = [
  {
    id: "1",
    name: "Enchanted Garden Maxi Dress",
    description: "A beautiful floral print maxi dress, perfect for summer weddings or garden parties. Made from lightweight chiffon.",
    pricePerDay: 45,
    size: "M",
    category: "Party Wear",
    condition: "Like New",
    imageId: "item1",
  },
  {
    id: "2",
    name: "Urban Explorer Leather Jacket",
    description: "A timeless black leather biker jacket. Adds an edge to any outfit. Features silver hardware and a belted waist.",
    pricePerDay: 50,
    size: "S",
    category: "Casual Wear",
    condition: "Gently Used",
    imageId: "item2",
  },
  {
    id: "3",
    name: "Royal Silk Saree",
    description: "Exquisite traditional silk saree with intricate gold embroidery. Ideal for festivals and formal events.",
    pricePerDay: 80,
    size: "M",
    category: "Ethnic Wear",
    condition: "Excellent",
    imageId: "item3",
  },
  {
    id: "4",
    name: "The Executive Power Suit",
    description: "A sharp and modern two-piece business suit in navy blue. Tailored fit for a professional silhouette.",
    pricePerDay: 70,
    size: "L",
    category: "Formal Attire",
    condition: "Like New",
    imageId: "item4",
  },
  {
    id: "5",
    name: "Autumn Sunset Knit Sweater",
    description: "A cozy and oversized knit sweater in warm tones. Perfect for a casual day out or a comfy evening in.",
    pricePerDay: 25,
    size: "M",
    category: "Casual Wear",
    condition: "Gently Used",
    imageId: "item5",
  },
  {
    id: "6",
    name: "Midnight Sparkle Cocktail Dress",
    description: "A head-turning cocktail dress covered in black sequins. Features a flattering sheath silhouette.",
    pricePerDay: 65,
    size: "S",
    category: "Party Wear",
    condition: "Excellent",
    imageId: "item6",
  },
  {
    id: "7",
    name: "Everyday Classic Denim",
    description: "Comfortable and versatile straight-leg denim jeans in a medium wash. A wardrobe staple.",
    pricePerDay: 20,
    size: "M",
    category: "Casual Wear",
    condition: "Good",
    imageId: "item7",
  },
  {
    id: "8",
    name: "Starlight Ball Gown",
    description: "A breathtaking formal evening gown with a tulle skirt and embellished bodice. Make an entrance at any gala.",
    pricePerDay: 150,
    size: "L",
    category: "Formal Attire",
    condition: "Like New",
    imageId: "item8",
  },
];

export const categories = [
    { id: "party", name: "Party", icon: PartyPopper },
    { id: "office", name: "Office", icon: Briefcase },
    { id: "ethnic", name: "Ethnic", icon: VenetianMask },
    { id: "casual", name: "Casual", icon: Shirt },
    { id: "all", name: "All", icon: Tally3 },
];
