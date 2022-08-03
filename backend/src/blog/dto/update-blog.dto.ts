import { IsNumber, IsString } from "class-validator";

export class UpdateBlogDto {
    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
