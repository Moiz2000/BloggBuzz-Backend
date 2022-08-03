import { IsDate, IsInt, IsString } from "class-validator";

export class UpdateCommentDto{
    @IsInt()
    userId:number;

    @IsInt()
    blogId:number;

    @IsString()
    Text:string;

    @IsDate()
    Create_Time:Date;

    @IsDate()
    Update_Time:Date;
    
    @IsInt()
    parentCommentId:number;

    @IsInt()
    parentCommentUser:number;

    @IsInt()
    parentCommentBlog:number;
}