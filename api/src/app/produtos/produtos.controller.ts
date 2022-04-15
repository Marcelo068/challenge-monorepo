import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutoDto } from './dto/produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() request: ProdutoDto) {
    return this.produtosService.create(request);
  }

  @Get()
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    return this.produtosService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: ProdutoDto) {
    return this.produtosService.update(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
