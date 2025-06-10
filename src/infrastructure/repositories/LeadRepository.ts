import { Repository } from 'typeorm';
import { Lead, LeadStatus } from '../../domain/entities/Lead';
import { ILeadRepository } from '../../domain/repositories/ILeadRepository';
import { AppDataSource } from '../../infrastructure/database/data-source';

export class LeadRepository implements ILeadRepository {
  private repository: Repository<Lead>;

  constructor() {
    this.repository = AppDataSource.getRepository(Lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.repository.find();
  }

  async findByStatus(status: LeadStatus): Promise<Lead[]> {
    return this.repository.find({ where: { status } });
  }

  async findById(id: string): Promise<Lead | null> {
    return this.repository.findOne({ where: { id } });
  }

  async save(lead: Lead): Promise<Lead> {
    return this.repository.save(lead);
  }

  async update(id: string, leadData: Partial<Lead>): Promise<Lead | null> {
    await this.repository.update(id, leadData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findLastJobId(): Promise<Lead | null> {
    return this.repository
      .createQueryBuilder('lead')
      .orderBy('lead.jobId', 'DESC')
      .getOne();
  }
} 
