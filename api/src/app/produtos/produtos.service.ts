import { Injectable } from '@nestjs/common';
import { ProdutoDto } from './dto/produto.dto';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Produto } from './entities/produto.entity'

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(request: ProdutoDto) {
    return await this.produtoRepository.save(request)
  }

  async findAll(skip: string, take: string) {
    const [ result, count ] = await this.produtoRepository.findAndCount({
      where: { flg_deleted: 0 },
      skip: Number(skip),
      take: Number(take),
      order: {
        updatedDate: 'DESC',
      },
    });

    return { data: result, count: count }
  }

  async findOne(id: string) {
    return await this.produtoRepository.findOne({
      where: {
        id: id,
        flg_deleted: 0
      },
    });
  }

  async update(id: string, request: ProdutoDto) {
    return await this.produtoRepository.update(
      { id: id },
      request,
    )
  }

  async remove(id: string) {
    return this.produtoRepository.update(
      { id: id },
      { flg_deleted: 1 },
    )
  }
}
