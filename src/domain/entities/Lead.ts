import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum LeadStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  suburb: string;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'text',
    default: LeadStatus.INVITED
  })
  status: LeadStatus;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  discountApplied: boolean;

  get fullName(): string {
    return `${this.firstName} ${this.lastName || ''}`.trim();
  }

  applyDiscount(): void {
    if (this.price > 500) {
      this.price = Number((this.price * 0.9).toFixed(2));
      this.discountApplied = true;
    } else {
      this.discountApplied = false;
    }
  }
} 