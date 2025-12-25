import express from "express"
import "./database/connection.js"
import userRoute from "./routes/userRoute.js"

const app = express()

// Express by default can't handle json msg in req.body
app.use(express.json())

// localhost:3000/api/auth/
app.use("/api/auth", userRoute) // Routes to userRoute

export default app