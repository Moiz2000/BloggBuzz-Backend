import { UserModule } from './../user/user.module';
import { jwtConstants } from './../user/auth.constant';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { LocalStrategy } from 'src/user/local.strategy';
import { JwtStrategy } from 'src/user/jwt.strategy';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[UserModule]
})
export class ProfileModule {}
