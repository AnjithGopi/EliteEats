


export interface IVendorService{

    register(vendorData:any):Promise<any>;
    verifyOtp(otp:string,token:string):Promise<any>;
    login(loginData:{email:string,password:string}):Promise<any>;




}