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
        return this.Login(email, password);
      } else {
        return userAcc;
      }
    } catch {
      console.log("Signup error.");
    }
  }
  async Login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch {
      console.log("Login Error.");
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
        await this.account.deleteSessions()
    } catch {
      console.log("Logout Error.");
    }
  }
}

export const authService = new AuthService();
