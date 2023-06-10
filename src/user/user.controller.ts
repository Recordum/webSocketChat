import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
    
    @Render('index')
    @Get('/match')
    matchMaking(){
        
       //Match Making Algorithm

        return;
    }
}
