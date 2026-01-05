import type { Request, Response } from "express";
import sendResponse from "../services/sendResponse.js";
import Order from "../database/models/orderModel.js";
import OrderDetails from "../database/models/orderDetailsModel.js";
import Payment from "../database/models/paymentModel.js";
import { PaymentMethod } from "../global/globalType.js";

interface IProduct {
    productId: string,
    productQty: number
}

interface IUserId extends Request {
    user?: {
        userId: string
    }
}

class OrderController {
    async createOrder(req: IUserId, res: Response) {
        const { phoneNumber, shippingAddress, totalAmount, paymentMethod } = req.body
        const products: IProduct[] = req.body.products
        const userId = req.user?.userId

        if (!phoneNumber || !shippingAddress || !totalAmount || products.length == 0) {
            sendResponse(res, 400, "Please enter all details")
            return
        }

        const order = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId
        })

        for (const product of products) {
            await OrderDetails.create({
                quantity: product.productQty,
                orderId: order.orderId,
                productId: product.productId
            })
        }

        if (paymentMethod === PaymentMethod.COD) {
            await Payment.create({
                orderId: order.orderId
            })
        } else if (paymentMethod === PaymentMethod.Esewa) {

        } else {

        }

        sendResponse(res, 200, "Order created successfully")
    }
}

const orderController = new OrderController()
export default orderController