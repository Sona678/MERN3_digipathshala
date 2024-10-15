import app from "./src/app";
import { envConfig } from "./src/config.ts/config";

function startServer(){
    const port=envConfig.port||4000
    app.listen(port,()=>{
        console.log(`server has started at port [${port}]`)
    })
}
startServer()