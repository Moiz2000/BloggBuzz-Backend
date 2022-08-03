import { IsNumber, IsString } from "class-validator";

export class CreateBlogDto {
    @IsNumber()
    userId: number;

    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
