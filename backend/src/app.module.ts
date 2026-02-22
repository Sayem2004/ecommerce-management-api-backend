import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AdminModule} from './Admin/admin.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';




@Module({
  imports: [AdminModule,DeliverymanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
