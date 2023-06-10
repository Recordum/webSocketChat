import { UserSocketDto } from './../dto/events.user.socket.dto';
import { Injectable } from "@nestjs/common";
import { MatchMakingPolicy } from "./match.making.policy";
import { MAXUSER } from "../util/events.const";

@Injectable()
export class SimpleMatchMaking implements MatchMakingPolicy{

    private readyQueue: Array<UserSocketDto> = new Array();

    public joinQueue(userSocketDto: UserSocketDto) {
        this.readyQueue.push(userSocketDto);
    }

    public leaveQueue(userSocketDto: UserSocketDto) {
        return;
    }

    public isQueueReady(): boolean {
        return this.readyQueue.length == MAXUSER;
    }

    public getAvailableUsers(): UserSocketDto[] {
        let availableUsers : UserSocketDto[];

        for (let i = 0; i < MAXUSER; i++){
            availableUsers.push(this.readyQueue.shift())
        }

        return availableUsers;
    }

    

   

}