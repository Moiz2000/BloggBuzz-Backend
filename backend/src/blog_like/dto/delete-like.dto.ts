import { IsBoolean, IsInt, IsNumber } from "class-validator";

export class DeleteLikeDto{
    @IsInt()
    userId:number;

    @IsInt()
    blogId:number;

    @IsBoolean()
    Like_Status:boolean;
}