import curdInterface from "./interface.js";
import { User } from "./user.js";
export declare class crudApp implements curdInterface {
    users: User[];
    col: string[];
    roleType: string[];
    data: any[];
    tableContainer: HTMLDivElement;
    td: HTMLElement;
    constructor();
    loadData(): void;
    createTable(): void;
    update(e: Event): void;
    delete(e: Event): void;
    create(e: Event): void;
    read(): void;
    refresh(): void;
}
