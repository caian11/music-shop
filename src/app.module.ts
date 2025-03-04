import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/data-source';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProdutoModule,
    CategoriaModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
