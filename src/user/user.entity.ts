import { userActiveStatus } from "./utill/user.active.status";
import { userKeynoteStatus } from "./utill/user.keynote.status";

export class User {
    private userName :string;
    private userEmail :string;
    private userMMR :number;
    private nickname :string;
    private userActive :userActiveStatus;
    private user_keynote: userKeynoteStatus;
}