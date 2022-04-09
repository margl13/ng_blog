import {UserDto} from "../../../common/user/dataModel/UserDto";

export interface CreatePostDto {
    title: string;
    subTitle: string;
    imageUrl: string;
    content: string;
    author: UserDto
}
