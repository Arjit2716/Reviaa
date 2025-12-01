"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Loader2, Sparkles, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { getGarmentCategorization } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const uploadSchema = z.object({
  name: z.string().min(3, "Item name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(1, "Price must be at least $1."),
  size: z.string().min(1, "Please select a size."),
  availability: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export function UploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const description = form.getValues("description");
    if (!imageFile || !description) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide an image and a description before generating.",
      });
      return;
    }

    setIsGenerating(true);
    setCategories([]);
    setTags([]);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const result = await getGarmentCategorization({ photoDataUri: dataUri, description });
        setCategories(result.categories);
        setTags(result.tags);
        toast({
          title: "AI Analysis Complete",
          description: "Categories and tags have been generated for you.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not generate categories. Please try again.",
        });
      } finally {
        setIsGenerating(false);
      }
    };
  };

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
      title: "Item Submitted!",
      description: "Your item has been successfully listed on Reviaa.",
    });
    // Here you would typically send the data to your backend.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden bg-secondary/30">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <UploadCloud className="mx-auto h-12 w-12" />
                  <p>Upload a photo of your item</p>
                </div>
              )}
               <Input id="picture" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Elegant Floral Maxi Dress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the item, its material, and any special features." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per day ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="XS">Extra Small</SelectItem>
                          <SelectItem value="S">Small</SelectItem>
                          <SelectItem value="M">Medium</SelectItem>
                          <SelectItem value="L">Large</SelectItem>
                          <SelectItem value="XL">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
             <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Availability Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        </div>
        
        <div className="space-y-4 rounded-lg border bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-lg font-headline font-semibold">AI Garment Categorization</h3>
                    <p className="text-sm text-muted-foreground">Let AI suggest categories and tags based on your image and description.</p>
                </div>
                <Button type="button" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                    ) : (
                        <><Sparkles className="mr-2 h-4 w-4" /> Generate with AI</>
                    )}
                </Button>
            </div>
            
            {(categories.length > 0 || tags.length > 0) && (
                <div className="space-y-4 pt-4">
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Suggested Categories:</h4>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat, i) => <Badge key={i} variant="secondary">{cat}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm mb-2">Suggested Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => <Badge key={i} variant="outline">{tag}</Badge>)}
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="font-bold">Upload Item</Button>
        </div>
      </form>
    </Form>
  );
}
