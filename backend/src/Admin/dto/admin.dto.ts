import {
  IsNotEmpty,
  IsString,
  Matches,
  IsDateString,
  IsUrl,
  IsEmail
} from 'class-validator';

export class AdminDto {

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^0-9]*$/, {
    message: 'Name must not contain numbers',
  })
  name!: string;

  @IsNotEmpty({ message: "Enter mail" })
  @IsEmail({}, { message: "Please enter a valid email address" }) mail!: string;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @Matches(/[@#$&]/, {
    message: 'Password must contain (@, #, $, &)',
  })
  password!: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Invalid date format' })
  createdAt!: string;

  @IsNotEmpty()
  @IsUrl(
    { require_protocol: true },
    { message: 'Invalid social media URL' }
  )
  socialLink!: string;
}