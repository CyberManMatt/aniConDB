import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admission } from '../admission.entity';
import { Repository } from 'typeorm';
import { CreateAdmissionDto } from '../dtos/create-admission.dto';

@Injectable()
export class AdmissionsService {
    constructor(
        @InjectRepository(Admission)
        private readonly admissionRepository: Repository<Admission>,
    ){}

    public async createAdmission(createAdmissionDto: CreateAdmissionDto) {
        const admission = this.admissionRepository.create(createAdmissionDto);
        return this.admissionRepository.save(admission);
    }

    public async getAdmissions(): Promise<Admission[]> {
        return this.admissionRepository.find();
    }

    public async getAdmissionById(id: number): Promise<Admission> {
        const admission = await this.admissionRepository.findOneBy({ id });
        if (!admission) {
            throw new NotFoundException(`Admission with id ${id} not found`);
        }
        return admission;
    }

    public async updateAdmission(
        id: number,
        updateAdmissionDto: Partial<CreateAdmissionDto>,
    ): Promise<Admission> {
        const admission = await this.admissionRepository.findOneBy({ id });
        if (!admission) {
            throw new NotFoundException(`Admission with id ${id} not found`);
        }

        try {
            Object.assign(admission, updateAdmissionDto);
            return this.admissionRepository.save(admission);
        } catch (error) {
            throw new Error(`Error updating admission: ${error.message}`);
        }
    }

    public async deleteAdmission(id: number): Promise<void> {
        const result = await this.admissionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Admission with id ${id} not found`);
        }
        await this.admissionRepository.delete(id);
    }
}
