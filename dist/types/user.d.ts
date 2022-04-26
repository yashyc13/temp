import { Role } from "./role";
export declare class User {
    id: number;
    firstName: string;
    middleName: string | undefined;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    address: string;
    constructor(user: User);
}
