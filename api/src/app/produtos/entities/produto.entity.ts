import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Produto {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar', { length: 40 })
    nome: string;
  
    @Column('float')
    preco: number;
  
    @Column('int')
    quantidade: number;

    @Column('varchar', { length: 100 })
    descricao: string;
  
    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;
  
    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;

    @Column('integer', { default: 0 })
    flg_deleted: number
  }