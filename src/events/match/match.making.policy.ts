import { UserSocketDto } from './../dto/events.user.socket.dto';

export interface MatchMakingPolicy{

    joinQueue(userSocketDto:UserSocketDto);
    leaveQueue(userSocketDto:UserSocketDto);
    isQueueReady(): boolean;
    getAvailableUsers(): Array<UserSocketDto>;

}