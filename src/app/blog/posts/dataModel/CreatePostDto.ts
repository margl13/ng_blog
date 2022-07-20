import {UserDto} from "../../../user/dataModel/UserDto";

export interface CreatePostDto {
    title: string;
    subTitle: string;
    imageUrl: string;
    content: string;
    author: UserDto
}
