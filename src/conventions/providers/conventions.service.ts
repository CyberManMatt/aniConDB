import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convention } from '../convention.entity';
import { Repository } from 'typeorm';
import { CreateConDto } from '../dtos/create-con.dto';
import { plainToInstance } from 'class-transformer';
import { GetConDetailDto } from '../dtos/get-con-detail.dto';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { GetConsQueryDto } from '../dtos/get-cons-query.dto';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';

@Injectable()
export class ConventionsService {
  // This service can be expanded with methods to handle convention-related logic,
  // For example, methods to create, update, delete, or retrieve conventions

  constructor(
    // Inject any necessary repositories or services here
    @InjectRepository(Convention)
    private readonly conventionRepository: Repository<Convention>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  /* Create a new convention */
  public async createConvention(createConventionDto: CreateConDto) {
    const convention = this.conventionRepository.create(createConventionDto);
    return this.conventionRepository.save(convention);
  }

  /* Get all conventions */
  public async getConventions(
    consQuery: GetConsQueryDto,
  ): Promise<Paginated<Convention>> {
    return await this.paginationProvider.paginateQuery(
      {
        limit: consQuery.limit,
        page: consQuery.page,
      },
      this.conventionRepository,
    );
  }

  /* Get a convention by ID */
  public async getConventionById(id: number): Promise<GetConDetailDto> {
    const convention = await this.conventionRepository.findOne({
      where: { id },
      relations: ['venue'],
    });
    if (!convention) {
      throw new NotFoundException(`Convention with id ${id} not found`);
    }
    return plainToInstance(GetConDetailDto, convention, {
      excludeExtraneousValues: true,
    });
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
