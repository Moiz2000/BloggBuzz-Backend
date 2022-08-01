import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class CreateBlogDto {
    @IsNumber()
    userId: number;

    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
