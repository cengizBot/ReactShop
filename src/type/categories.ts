export const CLOTHING = "clothing" as const;
export const CASUAL = "casual" as const;
export const SHOES = "shoes" as const;
export const ACCESSORIES = "accessories" as const;
export const TECH = "tech" as const;


export const CATEGORIES = [CLOTHING, CASUAL, SHOES, ACCESSORIES, TECH] as const;


export type Category = typeof CATEGORIES[number]; // "clothing" | "casual" | "shoes" | "accessories" | "tech"
