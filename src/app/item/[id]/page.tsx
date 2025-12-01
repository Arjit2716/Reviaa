import { clothingItems } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, Star, PackageCheck, Tag } from "lucide-react";

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = clothingItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      <div className="col-span-1">
        <Card className="overflow-hidden shadow-lg">
          {image && (
            <Image
              src={image.imageUrl}
              alt={item.name}
              width={600}
              height={800}
              className="w-full h-auto object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </Card>
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <div>
          <Badge variant="secondary" className="mb-2">{item.category}</Badge>
          <h1 className="text-4xl font-headline font-bold text-primary">{item.name}</h1>
          <p className="text-lg mt-2 text-muted-foreground">{item.description}</p>
        </div>
        
        <Separator/>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-accent"/>
            <strong>Size:</strong> <Badge variant="outline">{item.size}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-accent"/>
            <strong>Condition:</strong> <span className="font-medium">{item.condition}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent"/>
            <strong>Category:</strong> <span className="font-medium">{item.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent"/>
            <strong>Rating:</strong> <span className="font-medium">4.8 (12 reviews)</span>
          </div>
        </div>

        <Separator/>
        
        <Card className="bg-secondary/50">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Rental Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Price per day</p>
                    <p className="text-2xl font-bold text-primary">${item.pricePerDay}</p>
                </div>
                 <p className="text-xs text-muted-foreground">Select your rental period at checkout. A refundable security deposit may be required.</p>
                <Button size="lg" className="w-full font-bold text-lg">Rent Now</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
