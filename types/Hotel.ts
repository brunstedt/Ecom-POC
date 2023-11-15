export type Hotel = {
    id: string,
    name: string,
    displayNames: {
        SE: string,
        en: string
    },
    description: string,
    imageUrl: string,
    displayDescriptions: {
        SE: string,
        en: string
    },
    isActive: boolean,
    isArchived: boolean,
    created: string,
    updated: string,
    customAttributes: Record<string, any>,
    tags: {
        city: string[],
        roomSelections: string[]
    }
}

export type Room = {
    id: string,
    productParentId: string,
    taxGroupId: string,
    name: string,
    displayNames: {
        SE: string,
        en: string
    },
    description: string,
    displayDescriptions: {
        SE: string,
        en: string
    },
    imageUrl: string,
    isActive: boolean,
    isArchived: boolean,
    created: string,
    updated: string,
    customAttributes: Record<string, string>,
    tags: Record<string, any>,
    dimensions: {
        width: number,
        height: number,
        length: number
    },
    weight: number
}

export type Rooms = Room[]

export type RoomPrice = {
    productVariantId: string,
    productParentId: string,
    basePriceAmount: number,
    discountAmount: number,
    salePriceAmount: number,
    countryCode: string,
    currencyCode: string,
    storeGroupId: string,
    storeName: string,
    created: string,
    updated: string
}

export type RoomPrices = RoomPrice[]