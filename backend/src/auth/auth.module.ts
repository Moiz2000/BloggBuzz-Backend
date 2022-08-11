import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../user/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../user/auth.constant';
//import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers:[AuthController],
    imports:[UserModule, PassportModule,
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule {
}
