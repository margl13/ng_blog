import {UserDto} from "../../../user/dataModel/UserDto";

export interface PostDto {
    id: number;
    title: string;
    subTitle: string;
    imageUrl: string;
    slug: string;
    content: string;
    author: UserDto
}



