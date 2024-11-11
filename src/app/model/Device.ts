import { Room } from "./Room"

export class Device{
    idDevice:number=0
    nameDevice:string=""
    typeDevice:string=""
    priceDevice:number=0
    purchaseDateDevice:Date=new Date(Date.now())
    numberDeviceMaintenance:number=0
    room:Room=new Room()
}