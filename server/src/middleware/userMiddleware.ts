import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import sendResponse from "../services/sendResponse.js";
import { envConfig } from "../config/config.js";
import User from "../database/models/userModel.js";

// 1. Keep types in a separate file usually, but this is okay for now.
export interface IAuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    }
}

export enum Role {
    Customer = "customer",
    Admin = "admin"
}

// 2. Export functions directly. No need for a Class.
export const isUserLoggedIn = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        // 3. specific check for Bearer token standard
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            sendResponse(res, 401, "Please login first (Token missing or malformed)");
            return; 
        }

        // Split "Bearer <token>" and take the second part
        const token = authHeader.split(" ")[1] as string;

        // 4. Verify synchronously inside try/catch. 
        // This throws an error if invalid, which goes to the catch block.
        const decoded = jwt.verify(token, envConfig.jwtKey as string) as JwtPayload;

        // 5. Database call
        // OPTIMIZATION: Use attributes/projection to ONLY fetch what you need. 
        // NEVER fetch the password.
        const user = await User.findByPk(decoded.userId, {
            attributes: ['id', 'username', 'email', 'role'] 
        });

        if (!user) {
            sendResponse(res, 401, "User belonging to this token no longer exists");
            return;
        }

        // 6. Attach safe user data to request
        // We use type assertion or define the user type on the model
        req.user = user as unknown as { id: string; email: string; role: string };

        next(); // Move to the next middleware

    } catch (error) {
        sendResponse(res, 401, "Invalid or Expired Token", error);
    }
};

// 7. Factory Function for Role Authorization
export const allowTo = (...allowedRoles: Role[]) => {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
        // req.user is guaranteed to exist here because isUserLoggedIn runs first
        const userRole = req.user?.role as Role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            sendResponse(res, 403, "You do not have permission to perform this action");
            return;
        }

        next();
    };
};