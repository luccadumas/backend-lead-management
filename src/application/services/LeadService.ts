import { Lead, LeadStatus } from '../../domain/entities/Lead';
import { ILeadRepository } from '../../domain/repositories/ILeadRepository';
import { EmailService } from '../../infrastructure/services/EmailService';

export class LeadService {
  constructor(
    private leadRepository: ILeadRepository,
    private emailService: EmailService
  ) {}

  async getAllLeads(): Promise<Lead[]> {
    return this.leadRepository.findAll();
  }

  async getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
    return this.leadRepository.findByStatus(status);
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return this.leadRepository.findById(id);
  }

  async acceptLead(id: string): Promise<Lead | null> {
    const lead = await this.leadRepository.findById(id);
    if (!lead) {
      return null;
    }

    lead.status = LeadStatus.ACCEPTED;
    lead.applyDiscount();
    
    const updatedLead = await this.leadRepository.save(lead);
    await this.emailService.sendLeadAcceptedNotification(updatedLead);
    
    return updatedLead;
  }

  async declineLead(id: string): Promise<Lead | null> {
    const lead = await this.leadRepository.findById(id);
    if (!lead) {
      return null;
    }

    lead.status = LeadStatus.DECLINED;
    return this.leadRepository.save(lead);
  }

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    const lead = new Lead();
    Object.assign(lead, leadData);

    const lastLead = await this.leadRepository.findLastJobId();
    lead.jobId = lastLead ? lastLead.jobId + 1 : 1;

    return this.leadRepository.save(lead);
  }

  async updateLead(id: string, leadData: Partial<Lead>): Promise<Lead | null> {
    return this.leadRepository.update(id, leadData);
  }

  async deleteLead(id: string): Promise<void> {
    await this.leadRepository.delete(id);
  }
} 
