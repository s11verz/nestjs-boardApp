import { isNotEmpty } from "class-validator";

export class CreateBoardDto{
    //@isNotEmpty()
    title:string;

    //@isNotEmpty()
    description:string;
}