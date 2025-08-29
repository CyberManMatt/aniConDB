import { PartialType } from "@nestjs/swagger";
import { CreateVendorDto } from "./create-vendor.dto";

export class PatchVendorDto extends PartialType(CreateVendorDto) {}
