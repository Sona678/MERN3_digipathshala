import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config.ts/config";
const sequalize=new Sequelize(envConfig.connectionString as string)
try{
    sequalize.authenticate()
    .then(()=>{
        console.log("Successful authentication!!!")
    })
    .catch(err=>{
        console.log("error!!",err)
    })
}catch(error){
    console.log(error)
}

export default sequalize