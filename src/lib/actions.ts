"use server";

import {
  automatedGarmentCategorization,
  type AutomatedGarmentCategorizationInput,
  type AutomatedGarmentCategorizationOutput,
} from "@/ai/flows/automated-garment-categorization";

/**
 * A server action to wrap the AI flow for automated garment categorization.
 * This provides a secure and reusable way to call the AI model from client components.
 * @param input - The input for the AI flow, containing the image data URI and description.
 * @returns A promise that resolves to the suggested categories and tags.
 */
export async function getGarmentCategorization(
  input: AutomatedGarmentCategorizationInput
): Promise<AutomatedGarmentCategorizationOutput> {
  try {
    const result = await automatedGarmentCategorization(input);
    return result;
  } catch (error) {
    console.error("Error in AI categorization server action:", error);
    // In case of an error, return empty arrays to ensure the client-side doesn't break.
    return { categories: [], tags: [] };
  }
}
