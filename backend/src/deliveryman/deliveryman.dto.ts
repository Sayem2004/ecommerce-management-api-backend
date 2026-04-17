import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength,
  Matches,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class DeliverymanDTO {
  @IsOptional()
  fullName!: string;

  //@IsEmail()
 // email!: string;

  //@MinLength(6)
 // @Matches(/[A-Z]/)
 // password!: string;

 // @IsIn(['male', 'female'])
 // gender!: string;

 // @IsNumber()
 // phone!: number;   

 @IsNotEmpty()
  area!: string;

  @IsIn(['active', 'inactive'])
 status!: string;
}