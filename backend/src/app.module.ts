import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './Admin/admin.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sayem2004',
      database: 'AdminBackend',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AdminModule,
    DeliverymanModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}