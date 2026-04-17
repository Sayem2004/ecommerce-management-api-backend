import { IsNotEmpty } from 'class-validator';

export class ZoneDTO {
  @IsNotEmpty()
  zoneName!: string;  
}