import { Role } from '../enums/Chat';

export interface Message {
    role: Role | string;
    content: string;
}
