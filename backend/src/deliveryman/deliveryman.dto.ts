import { IsNotEmpty } from "class-validator";
export class DeliverymanDTO {

    @IsNotEmpty()
    name: string;
    phone: string;
    area: string;
    status: string;
}
