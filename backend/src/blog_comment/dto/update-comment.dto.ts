import { IsDate, IsInt, IsString } from "class-validator";

export class UpdateCommentDto {
    // @IsInt()
    userId: number;

    // @IsInt()
    // blogId: number;

    id: number;

    @IsString()
    Text: string;



    //     // @IsInt()
    //     parentCommentId:number;

    //     // @IsInt()
    //     parentCommentUser:number;

    //     // @IsInt()
    //     parentCommentBlog:number;
}