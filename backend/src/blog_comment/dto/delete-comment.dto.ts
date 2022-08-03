import { IsInt, IsString } from "class-validator";

export class DeleteCommentDto{
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