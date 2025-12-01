import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { clothingItems, categories } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          StyleSwap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover unique fashion and rent the perfect outfit for any occasion. Your closet is now endless.
        </p>
      </section>

      <Separator />

      <section>
        <h2 className="text-2xl font-headline font-semibold mb-6 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="flex flex-col items-center h-24 w-24 p-4 rounded-lg hover:bg-secondary"
            >
              <category.icon className="w-8 h-8 mb-2 text-primary" />
              <span className="text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-2xl font-headline font-semibold mb-6 text-center">Available Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingItems.map((item) => {
            const image = getImage(item.imageId);
            return (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <Link href={`/item/${item.id}`} className="block">
                  <CardHeader className="p-0">
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
                    <CardTitle className="font-headline text-lg mb-2 truncate group-hover:text-primary">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <p className="text-lg font-bold text-primary">${item.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
                    <Badge variant="secondary">{item.size}</Badge>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
