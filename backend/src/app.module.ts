import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { OrderModule } from './order/order.module';
import { ZoneModule } from './zone/zone.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AdminModule,
    DeliverymanModule,
    OrderModule,
    ZoneModule,
    AuthModule,

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'myname34299@gmail.com',  
          pass: 'ojmvigoqesnozbli',     
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '142811',
      database: 'Ecommerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}