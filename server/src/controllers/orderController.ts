import type { Request, Response } from "express";
import sendResponse from "../services/sendResponse.js";
import Order from "../database/models/orderModel.js";
import OrderDetails from "../database/models/orderDetailsModel.js";
import Payment from "../database/models/paymentModel.js";
import { PaymentMethod } from "../global/globalType.js";
import axios from "axios";

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

        const payment = await Payment.create({
            orderId: order.orderId
        })
        if (paymentMethod === PaymentMethod.COD) {
            payment.paymentMethod = PaymentMethod.COD
        } else if (paymentMethod === PaymentMethod.Khalti) {
            const payload = {
                "return_url": "http://localhost:5173",
                "website_url": "http://localhost:5173",
                "amount": totalAmount * 100,
                "purchase_order_id": order.orderId,
                "purchase_order_name": "order_" + order.orderId,
            }

            const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", payload, {
                headers: {
                    "Authorization": "Key f1cb6645c5f143f998a9e30d46dfdba1"
                }
            })

            // console.log(response)
            payment.pidx = response.data.pidx
            payment.paymentMethod = PaymentMethod.Khalti

            payment.save()

            sendResponse(res, 200, "Order created successfully", {
                url: response.data.payment_url
            })
        } else {

        }
    }
}

const orderController = new OrderController()
export default orderController