export type CartItem = {
    id: string,
    productVariantId: string,
    productParentId: string,
    quantity: number,
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

export type CartSession = {
    token: string,
    cart: Cart,
    capabilities: {
        paymentProviders: any[],
        shippingProviders: any[],
        giftCardProviders: any[]
    },
    locked: boolean
}

export type Cart = {
    id: string,
    sessionId: string,
    storeGroupId: string,
    countryCode: string,
    currencyCode: string,
    languageCode: string,
    isTaxIncludedInPrice: boolean,
    discountCodes: any[],
    discountRules: any[],
    created: string,
    updated: string,
    discountAmount: number,
    revision: number,
    items: CartItem[],
    gifts: any[],
    totals: {
        subTotal: number,
        taxTotal: number,
        discountTotal: number,
        grandTotal: number
    }
}