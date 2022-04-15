import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { ConfigModuleApp } from './config/config.module'
import { ProdutosModule } from './produtos/produtos.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModuleApp,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => configService.getDBConfig(),
      inject: [ConfigService],
    }),
    ProdutosModule
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
