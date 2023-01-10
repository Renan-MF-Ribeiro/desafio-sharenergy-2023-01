import { IUser } from "./User";

export type IAuthentication={
    tokenEncript: string,
    user: IUser,
}