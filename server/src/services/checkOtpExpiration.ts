import type { Response } from "express";
import sendResponse from "./sendResponse.js";

function checkOtpExpiration(res: Response, otpGeneratedTime: string, thresholdTime: number) {
    const currentTime = Date.now()

    if (currentTime - parseInt(otpGeneratedTime) <= thresholdTime) {
        sendResponse(res, 200, "OTP Valid, now you can proceed to reset password.")
    } else {
        sendResponse(res, 403, "OTP Expired, try again!")
    }
}

export default checkOtpExpiration