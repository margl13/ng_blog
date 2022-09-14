import {UserDto} from "../../../user/dataModel/UserDto";

export interface CreatePostDto {
    title: string;
    subTitle: string;
    imageUrl: string;
    slug: string;
    content: string;
    author: UserDto
}
