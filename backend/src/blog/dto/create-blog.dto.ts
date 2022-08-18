import { IsNumber, IsString } from "class-validator";
import { Tag } from "src/tag/entity/tag.entity";
import { User } from "src/user/entity/user.entity";

export class CreateBlogDto {
    //@IsNumber()
    user: User;

    @IsString()
    Title: string;

    @IsString()
    Text: string;

    tag: Tag

    // @IsString()
    // ImageName: string;
}
