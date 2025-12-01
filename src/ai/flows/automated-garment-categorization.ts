// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI agent for automated garment categorization based on image and description.
 *
 * - automatedGarmentCategorization - A function that suggests categories and tags for clothing items.
 * - AutomatedGarmentCategorizationInput - The input type for the automatedGarmentCategorization function.
 * - AutomatedGarmentCategorizationOutput - The return type for the automatedGarmentCategorization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedGarmentCategorizationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the clothing item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the clothing item.'),
});
export type AutomatedGarmentCategorizationInput = z.infer<
  typeof AutomatedGarmentCategorizationInputSchema
>;

const AutomatedGarmentCategorizationOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('Suggested categories for the clothing item.'),
  tags: z.array(z.string()).describe('Suggested tags for the clothing item.'),
});
export type AutomatedGarmentCategorizationOutput = z.infer<
  typeof AutomatedGarmentCategorizationOutputSchema
>;

export async function automatedGarmentCategorization(
  input: AutomatedGarmentCategorizationInput
): Promise<AutomatedGarmentCategorizationOutput> {
  return automatedGarmentCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedGarmentCategorizationPrompt',
  input: {schema: AutomatedGarmentCategorizationInputSchema},
  output: {schema: AutomatedGarmentCategorizationOutputSchema},
  prompt: `You are a fashion expert specializing in categorizing clothing items.

You will use the photo and description to suggest appropriate categories and tags for the item.

Categories should be general and well-defined (e.g., "ethnic wear", "formal attire", "casual wear").
Tags should be more specific and descriptive (e.g., "floral print", "silk", "maxi dress").

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Categories:
Tags: `,
});

const automatedGarmentCategorizationFlow = ai.defineFlow(
  {
    name: 'automatedGarmentCategorizationFlow',
    inputSchema: AutomatedGarmentCategorizationInputSchema,
    outputSchema: AutomatedGarmentCategorizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
