import adminSeeder from "./adminSeeder.js"
import app from "./src/app.js"
import { envConfig } from "./src/config/config.js"
import categoryController from "./src/controllers/categoryController.js"
import { connectDB } from "./src/database/connection.js"

async function startServer() {
    try {
        const port = envConfig.port || 4000
    
        await connectDB()
        
        app.listen(port, async () => {
            await categoryController.seedCategory()
    
            console.log(`Server started on port[${port}]`)
            
            await adminSeeder()
        })
        
    } catch (error) {
        console.log(`Failed to start server: ${error}`)
    }
}

startServer()