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

export type CartSessionsResponse = {
    capabilities: {
        shippingProviders: {
            name: string,
            id: string
        }[],
        voucherProviders: {
            name: string,
            id: string
        }[],
        taxProviders: {
            name: string,
            id: string
        }[],
        giftCardProviders: {
            name: string,
            id: string
        }[],
        paymentProviders: {
            name: string,
            id: string,
            config: Record<string, string>
        }[]
    },
    attributes: {
        company: {
            reference: string,
            registrationNumber: string,
            taxId: string,
            name: string
        },
        voyado: {
            contactId: string
        }
    },
    locked: boolean,
    checkout: {
        id: string,
        revision: number
    },
    cart: {
        isTaxIncludedInPrice: boolean,
        discountCodes: {
            applyLast: boolean,
            isExclusive: boolean,
            code: string,
            freeShipping: boolean,
            name: string,
            discountAmount: number,
            currencyCode: string,
            discountCodeRuleId: string
        }[],
        created: string,
        discountRules: {
            freeShipping: boolean,
            name: string,
            discountAmount: number,
            discountRuleId: string,
            currencyCode: string
        }[],
        discountAmount: number,
        sessionId: string,
        totals: {
            discountTotal: number,
            grandTotal: number,
            taxTotal: number,
            subTotal: number
        },
        storeGroupId: string,
        countryCode: string,
        id: string,
        currencyCode: string,
        updated: string,
        items: CartItem[],
        gifts: {
            displayDescription: string,
            quantity: number,
            productVariantId: string,
            totalPriceAmount: number,
            displayName: string,
            totalDiscountAmount: number,
            taxPercentage: number,
            salePriceAmount: number,
            description: string,
            discountAmount: number,
            basePriceAmount: number,
            taxGroupId: string,
            imageUrl: string,
            name: string,
            discountRuleId: string,
            id: string,
            totalTaxAmount: number,
            taxPercentageDecimals: number,
            shippingAttributes: Record<string, any>,
            productParentId: string,
            customAttributes: Record<string, any>
        }[]
    },
    token: string
}

export type CartItem = {
        displayDescription: string,
        quantity: number,
        productVariantId: string,
        totalPriceAmount: number,
        displayName: string,
        totalDiscountAmount: number,
        created: string,
        salePriceAmount: number,
        taxPercentage: number,
        description: string,
        discountAmount: number,
        tags: Record<string, any>,
        basePriceAmount: number,
        taxGroupId: string,
        imageUrl: string,
        name: string,
        options: Record<string, any>,
        id: string,
        totalTaxAmount: number,
        updated: string,
        taxPercentageDecimals: number,
        shippingAttributes: Record<string, any>,
        productParentId: string,
        customAttributes: Record<string, any>
}