import { UserSocketDto } from "../dto/events.user.socket.dto";

export interface MatchMakingPolicy{
    isQueueReady(): boolean;
    getAvailableUsers(): Array<UserSocketDto>;
    joinQueue();
    leaveQueue();

}