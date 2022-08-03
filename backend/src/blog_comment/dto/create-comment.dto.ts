import { IsInt, IsString } from "class-validator";

export class CreateCommentDto{
    @IsInt()
    userId:number;

    @IsInt()
    blogId:number;

    @IsString()
    Text:string;

    @IsInt()
    parentCommentId:number;

    @IsInt()
    parentCommentUser:number;

    @IsInt()
    parentCommentBlog:number;
}