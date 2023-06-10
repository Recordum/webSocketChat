import { userActiveStatus } from "../utill/user.active.status";
import { userKeynoteStatus } from "../utill/user.keynote.status";

export interface UserGameDto{
    userName :string;
    userMMR :number;
    nickname :string;
    userActive : userActiveStatus;
    userKeynote: userKeynoteStatus;
}