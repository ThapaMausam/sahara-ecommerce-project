import express from "express"
import "./database/connection.js"
import userRoute from "./routes/userRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"

const app = express()

// Express by default can't handle json msg in req.body
app.use(express.json())

// localhost:3000/api/auth/
app.use("/api/auth", userRoute) // Routes to userRoute
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

export default app