import { UserRecords } from "../models/user-record";

export class GlobalVariables{

    // Local
    public static  backendUrl : string = 'http://localhost:8083'

    // Production
    // public static  backendUrl : string = 'http://rmbapps/hse-training-0.0.1-SNAPSHOT'

    public static authenticatedUserData: UserRecords;
    public static isAuthenticated  : boolean;
}