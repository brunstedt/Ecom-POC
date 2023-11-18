type CustomAttributes = {
    roomFor: string;
    roomSize: string;
    salesArgument1: string;
    salesArgument2: string;
    salesArgument3: string;
};

export type CheckoutItem = {
    id: string;
    productVariantId: string;
    productParentId: string;
    quantity: number;
    name: string;
    displayName: string;
    description: string;
    displayDescription: string;
    taxGroupId: string;
    basePriceAmount: number;
    salePriceAmount: number;
    discountAmount: number;
    totalPriceAmount: number;
    totalTaxAmount: number;
    taxPercentage: number;
    totalDiscountAmount: number;
    taxPercentageDecimals: number;
    imageUrl: string;
    customAttributes: CustomAttributes;
    tags: Record<string, unknown>;
    options: Record<string, unknown>;
};

type Checkout = {
    id: string;
    sessionId: string;
    cartRevision: number;
    storeGroupId: string;
    countryCode: string;
    currencyCode: string;
    languageCode: string;
    discountCodes: string[];
    discountRules: string[];
    isTaxIncludedInPrice: boolean;
    isTaxExempt: boolean;
    created: string;
    updated: string;
    items: CheckoutItem[];
    gifts: string[];
    shippingOptions: string[];
    giftCards: string[];
    discountAmount: number;
    capabilities: {
        paymentProvider: {
            id: string;
            name: string;
            config: {
                ShippingProviderProxy: string;
            };
        };
        shippingProvider: {
            id: string;
            name: string;
            config: {
                baseUrl: string;
            };
        };
    };
    totals: {
        subTotal: number;
        taxTotal: number;
        discountTotal: number;
        shippingTotal: number;
        voucherTotal: number;
        giftCardTotal: number;
        grandTotal: number;
    };
};

export type CheckoutSessionResponse = {
    token: string;
    checkout: Checkout;
};
