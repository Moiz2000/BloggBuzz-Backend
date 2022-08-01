import { IsNumber, IsString } from "class-validator";

export class UpdateBlogDto {
    @IsNumber()
    userId: number;

    @IsString()
    Title: string;

    @IsString()
    Text: string;
}
