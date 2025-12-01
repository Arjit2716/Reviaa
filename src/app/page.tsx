"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { clothingItems, categories } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ArrowRight, Search, HandHeart, Repeat } from "lucide-react";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }
  
  const getCategoryNameFromId = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : "All";
  }

  const filteredItems = selectedCategory === "All" 
    ? clothingItems 
    : clothingItems.filter(item => item.category.replace(" ", "-").toLowerCase().includes(selectedCategory.toLowerCase()));
  
  const newArrivals = clothingItems.slice(0, 4);


  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Reviaa
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover unique fashion and rent the perfect outfit for any occasion. Your closet is now endless.
        </p>
      </section>

      <section>
        <Accordion type="single" collapsible className="w-full" defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-2xl font-headline font-semibold mb-2 text-center hover:no-underline justify-center">
              <div className="flex items-center gap-2">
                Browse by Category
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? "secondary" : "ghost"}
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex flex-col items-center h-24 w-24 p-4 rounded-lg"
                  >
                    <category.icon className="w-8 h-8 mb-2 text-primary" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-headline font-semibold">
                {selectedCategory === "All" ? "Featured Items" : `Browsing: ${selectedCategory}`}
            </h2>
            {selectedCategory !== "All" && (
                 <Button variant="link" onClick={() => setSelectedCategory("All")}>
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const image = getImage(item.imageId);
            return (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
                <Link href={`/item/${item.id}`} className="block">
                  <CardHeader className="p-0 relative">
                    {image && (
                       <Image
                        src={image.imageUrl}
                        alt={item.name}
                        width={400}
                        height={500}
                        className="w-full h-80 object-cover object-top"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <Badge variant="secondary" className="absolute top-2 right-2">{item.size}</Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg mb-1 truncate group-hover:text-primary">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <p className="text-lg font-bold text-primary">${item.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
        </div>
        {filteredItems.length === 0 && (
            <div className="text-center text-muted-foreground mt-8 py-10 border-2 border-dashed rounded-lg">
              <p className="mb-2">No items found in this category.</p>
              <Button onClick={() => setSelectedCategory("All")}>Back to all items</Button>
            </div>
        )}
      </section>

      <Separator />

       <section>
        <h2 className="text-2xl font-headline font-semibold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">1. Browse & Select</h3>
            <p className="text-muted-foreground">Explore our curated collection and find the perfect outfit for your next event.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <HandHeart className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">2. Rent & Enjoy</h3>
            <p className="text-muted-foreground">Book your item for your desired dates. Wear it, love it, and make a statement.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Repeat className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">3. Easy Return</h3>
            <p className="text-muted-foreground">Simply place the item in the pre-paid return bag and drop it off. We handle the dry cleaning!</p>
          </div>
        </div>
      </section>

      <Separator />
      
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((item) => {
             const image = getImage(item.imageId);
             return (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
                <Link href={`/item/${item.id}`} className="block">
                  <CardHeader className="p-0 relative">
                    {image && (
                       <Image
                        src={image.imageUrl}
                        alt={item.name}
                        width={400}
                        height={500}
                        className="w-full h-80 object-cover object-top"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-lg mb-1 truncate group-hover:text-primary">{item.name}</CardTitle>
                    <p className="text-lg font-bold text-primary">${item.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
                  </CardContent>
                </Link>
              </Card>
             );
          })}
        </div>
      </section>

    </div>
  );
}
