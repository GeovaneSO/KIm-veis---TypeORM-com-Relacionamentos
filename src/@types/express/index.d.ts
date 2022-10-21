import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            user: {
                sub: string
                email: string
                isAdm: boolean
                isActive: boolean
            }
        }
    }
}