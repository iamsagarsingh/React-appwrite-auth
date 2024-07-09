import { Account, Client, ID } from "appwrite";
import { conf } from "../conf/conf";

class AuthService {
  account;
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URI)
      .setProject(conf.APPWRITE_PROJECTID);

    this.account = new Account(this.client);
  }

  async Signup(name: string, email: string, password: string) {
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcc) {
        this.Login(email,password).then(()=>{
          this.createUserVerification()
        })
      } else {
        return userAcc;
      }
    } catch(err:any) {
      if(err.code === 409) alert("Email id already registered.")
    }
  }
  async Login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch(err:any) {
      if(err.code === 401) alert("Invalid Email id or password!!")
    }
  }

  async getAcc() {
    try {
      return await this.account.get();
    } catch {
      console.log("GetAcc error.");
    }
  }

  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch {
      console.log("Logout Error.");
    }
  }

  async recoverPassword(email: string) {
    try {
      await this.account.createRecovery(
        email,
        "http://localhost:5173/reset-password"
      );
    } catch {
      console.log("Password Recover Err.");
    }
  }

  async updatePasswordRecovery(userId:string,secret:string,password:string){
    try{
      await this.account.updateRecovery(userId,secret,password)
    }
    catch{
      console.log("Update Recovery Password");
      
    }
  }

  async createUserVerification(){
    try{
        await this.account.createVerification('http://localhost:5173/verfiy-user')
        alert("check email and click on the verification link.")
    }
    catch(err){
      console.log("email verification fail.",err);
      
    }
  }

  async updateUserVerification(userId:string,secret:string){
    try{
        return await this.account.updateVerification(userId,secret)
        
    }
    catch{
      console.log("fail || update userVerfication.");
      
    }
  }

}

export const authService = new AuthService();
