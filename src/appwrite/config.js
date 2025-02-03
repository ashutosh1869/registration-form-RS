import { Client, ID, Databases } from "appwrite";
import Conf from "../conf/Conf";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteProjectId)
        this.databases = new Databases(this.client);
    }

    async createdoc(data) {
        try {

            const {  leaderName,payment_id, leaderPhone,leaderEmail,leaderBranch, memberName,memberNumber,memberBranch,memberEmail} = data;
            const res=await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                ID.unique(),
                {
                    leaderName,
                    leaderPhone,
                    leaderEmail,
                    leaderBranch,
                    memberName,
                    memberNumber,
                    memberBranch,
                    memberEmail,
                    payment_id,
                }
               

            )
            return res.$id;
            
        } catch (error) {
            console.log("please submit again", error);
        }
    }

    async getdoc(id) {
        //get a single document with the id variable
        try {
            if (!id) {
                throw new Error("Document ID is required");
            }
            return await this.databases.getDocument(Conf.appwriteDatabaseId, Conf.appwriteCollectionId, id);
        } catch (error) {
            console.log("please submit again", error);
        }
    }
    async updateDoc(id, payment_id) {
        try {
            if (!id) {
                throw new Error("Document ID is required");
            }
            return await this.databases.updateDocument(Conf.appwriteDatabaseId, Conf.appwriteCollectionId, id, {
                payment_id
            });
        } catch (error) {
            console.log("please submit again", error);
        }
    }
    


}
const appwriteService = new Service();
export default appwriteService;