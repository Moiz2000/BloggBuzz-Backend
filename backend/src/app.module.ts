import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'abc123',
    database: 'blogbuzzdb',
    entities: [User],
    synchronize: true,
  }), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
