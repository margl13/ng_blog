import {UserDto} from "../../../user/dataModel/UserDto";

export interface EditPostDto {
    id: number;
    title: string;
    subTitle: string;
    imageUrl: string;
    content: string;
    author: UserDto
}
