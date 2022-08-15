import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class UpdateBlogDto {
    //user:User;

    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
