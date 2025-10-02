export interface IVendorService {
  register(vendorData: any): Promise<any>;
  verifyOtp(otp: string, token: string, image: string): Promise<any>;
  login(loginData: { email: string; password: string }): Promise<any>;
  addMenu(data: any): Promise<any>;
  addCategory(data: any): Promise<any>;
  fetchCategories(data: string): Promise<any>;
  fetchMenu(id: string): Promise<any>;
  handleCategoryDeletion(id: string): Promise<any>;
  orderManagement(id: string): Promise<any>;
  getOrder(id: string): Promise<any>;
  resetPassword(email: string): Promise<any>;
  verifyAndResetPassword(token: string, passoword: string): Promise<any>;
}
