


export interface IVendorService{

    register(vendorData:any):Promise<any>;
    verifyOtp(otp:string,token:string,image:string):Promise<any>;
    login(loginData:{email:string,password:string}):Promise<any>;
    addMenu(data:any):Promise<any>,
    addCategory(data:any):Promise<any>
    



}