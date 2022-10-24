export interface IAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface IPropertyRequest {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
}

export interface IAddress {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
    id: string
}

export interface IProperty {
    value: number
    size: number
    address: IAddress
    category: string
    id: string
    sold: boolean
    createdAt: Date
    updatedAt: Date
}