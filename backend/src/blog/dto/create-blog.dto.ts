import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class CreateBlogDto {
    //@IsNumber()
    user: User;

    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
