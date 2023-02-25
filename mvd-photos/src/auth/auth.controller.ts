import {Body, Controller, Param, ParseIntPipe, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AccessTokenDto} from './dto/access-token.dto';
import {Roles} from './roles.decorator';
import {RolesGuard} from './roles.guard';
import {AuthGuard} from '@nestjs/passport';


@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {

    constructor(
       private authService: AuthService
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('admin')
    @Post('/signup/:userGroupId')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
        @Param('userGroupId', ParseIntPipe) userGroupId: number
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDto, userGroupId);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<AccessTokenDto> {
        return this.authService.signIn(authCredentialsDto);
    }

}
