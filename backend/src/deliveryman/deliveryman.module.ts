import { Module } from "@nestjs/common";
import { DeliverymanController } from "./deliveryman.controller";
import { DeliverymanService } from "./deliveryman.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliveryman } from './deliveryman.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Deliveryman])],
    controllers: [DeliverymanController],
    providers: [DeliverymanService]
})
export class DeliverymanModule {}