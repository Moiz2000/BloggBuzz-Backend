import { IsBoolean, IsInt, IsNumber } from "class-validator";

export class CreateLikeDto{
    @IsInt()
    userId:number;

    @IsInt()
    blogId:number;

    @IsBoolean()
    Like_Status:boolean;
}