import type { Request, Response } from "express"
import sendResponse from "./sendResponse.js"

const errorHandler = (func: Function) => {
    return ((req: Request, res: Response) => {
        func(req, res).catch((err: Error) => {
            sendResponse(res, 500, "Internal error", err.message)
        })
    })
}

export default errorHandler