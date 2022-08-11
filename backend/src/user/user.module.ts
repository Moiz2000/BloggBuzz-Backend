import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { jwtConstants } from './auth.constant';
import { User } from './entity/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,LocalStrategy,JwtStrategy],
  exports: [UserService],
  imports: [PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '10s' },
  }),ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'public'),}),
  TypeOrmModule.forFeature([User])],
})
export class UserModule {}