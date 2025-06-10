import { Lead, LeadStatus } from '../entities/Lead';

export interface ILeadRepository {
  findAll(): Promise<Lead[]>;
  findByStatus(status: LeadStatus): Promise<Lead[]>;
  findById(id: string): Promise<Lead | null>;
  save(lead: Lead): Promise<Lead>;
  update(id: string, lead: Partial<Lead>): Promise<Lead | null>;
  delete(id: string): Promise<void>;
  findLastJobId(): Promise<Lead | null>;
} 
