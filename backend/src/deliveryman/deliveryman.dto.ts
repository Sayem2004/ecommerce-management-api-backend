import { IsNotEmpty, IsEmail, MinLength, Matches, IsIn } from 'class-validator';

export class DeliverymanDTO {

    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Email must be valid and aiub.edu domain' })
    @Matches(/@aiub\.edu$/, { message: 'Email invalid' })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    password: string;

    @IsIn(['male','female'])
    gender: string;

    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phone: string;

    @IsNotEmpty()
    area: string;

    @IsIn(['active','inactive'])
    status: string;
}
