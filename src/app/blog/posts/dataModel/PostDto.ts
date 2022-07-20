import {UserDto} from "../../../user/dataModel/UserDto";

export interface PostDto {
    id: number;
    title: string;
    subTitle: string;
    imageUrl:string;
    content: string;
    author: UserDto
}


