import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convention } from '../convention.entity';
import { Repository } from 'typeorm';
import { CreateConDto } from '../dtos/create-con.dto';

@Injectable()
export class ConventionsService {
  // This service can be expanded with methods to handle convention-related logic,
  // For example, methods to create, update, delete, or retrieve conventions

  constructor(
    // Inject any necessary repositories or services here
    @InjectRepository(Convention)
    private readonly conventionRepository: Repository<Convention>,
  ) {}

  /* Create a new convention */
  public async createConvention(createConventionDto: CreateConDto) {
    const convention = this.conventionRepository.create(createConventionDto);
    return this.conventionRepository.save(convention);
  }

  /* Get all conventions */
  public async getConventions(): Promise<Convention[]> {
    return this.conventionRepository.find();
  }

  /* Get a convention by ID */
  public async getConventionById(id: number): Promise<Convention> {
    const convention = await this.conventionRepository.findOneBy({ id });
    if (!convention) {
      throw new NotFoundException(`Convention with id ${id} not found`);
    }
    return convention;
  }

  /* Update a convention */
  public async updateConvention(
    id: number,
    updateConventionDto: Partial<CreateConDto>,
  ): Promise<Convention> {
    const convention = await this.conventionRepository.findOneBy({ id });
    if (!convention) {
      throw new NotFoundException(`Convention with id ${id} not found`);
    }

    try {
      Object.assign(convention, updateConventionDto);
      return this.conventionRepository.save(convention);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Error updating convention: ${error.message}`);
    }
  }

  /* Delete a convention */
  public async deleteConvention(id: number): Promise<void> {
    const result = await this.conventionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Convention with id ${id} not found`);
    }
    await this.conventionRepository.delete(id);
  }
}
