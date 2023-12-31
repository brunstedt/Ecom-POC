export type Product = {
    id: string,
    productVariantId: string,
    productParentId: string,
    name: string,
    displayName: string,
    description: string,
    displayDescription: string,
    taxGroupId: string,
    basePriceAmount: number,
    salePriceAmount: number,
    discountAmount: number,
    taxPercentage: number,
    taxPercentageDecimals: number,
    imageUrl: string,
    customAttributes: Record<string, any>,
    tags: Record<string, any>,
    options: Record<string, any>,
    created: string,
    updated: string,
    revision: number,
    totalDiscountAmount: number,
    totalPriceAmount: number,
    totalTaxAmount: number
}



