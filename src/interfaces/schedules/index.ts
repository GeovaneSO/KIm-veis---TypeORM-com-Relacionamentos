export interface IScheduleRequest {
    userId: string
    propertyId: string
    date: string
    hour: string
}

export interface ISchedule {
    user: string
    property: string
    date: Date
    hour: Date
    id: string
}