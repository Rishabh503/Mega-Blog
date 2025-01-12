import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";  

// create a class for better code
export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)
            
    }

    async createAcoount({email,password,name}){
        try {
            const userAccount =await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // call another method 
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service:: getCurrentUser::error",error)
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite::logout error:: error",error);
        }
    }
}
// make a object to be exported
const authService=new AuthService();
//export this object
export default authService
