import { Exclude } from "class-transformer";
import { CreateAdmissionDto } from "./create-admission.dto";

export class GetAdmissionDetailDto extends CreateAdmissionDto {
    @Exclude()
    id: number;
}