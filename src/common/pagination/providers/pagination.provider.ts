import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { Paginated } from '../interfaces/paginated.interface';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PaginationProvider {
  /**
   * Use Constructor to Inject Request
   * */
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const page =
      Number(paginationQuery.page) > 0 ? Number(paginationQuery.page) : 1;
    const limit =
      Number(paginationQuery.limit) > 0 ? Number(paginationQuery.limit) : 10;

    const skip = (page - 1) * limit;

    const results = await repository.find({
      skip,
      take: limit,
    });

    /**
     * Create the request URLs
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    // Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const previousPage = page <= 1 ? 1 : page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      metadata: {
        itemsPerPage: limit,
        totalItems: totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
      },
    };

    return finalResponse;
  }
}
