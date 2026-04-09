import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { Deliveryman } from './deliveryman/deliveryman.entity';
import { OrderModule } from './order/order.module';
import { ZoneModule } from './zone/zone.module';


@Module({
  imports: [
    AdminModule,
    DeliverymanModule,
    OrderModule,
    ZoneModule,
    

    // Database connection
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