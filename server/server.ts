import adminSeeder from "./adminSeeder.js"
import app from "./src/app.js"
import { envConfig } from "./src/config/config.js"

function startServer() {
    const port = envConfig.port || 4000
    app.listen(port, async () => {
        console.log(`Server started on port[${port}]`)
        adminSeeder()
    })
}

startServer()