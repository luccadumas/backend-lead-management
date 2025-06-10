import { Request, Response } from 'express';
import { LeadService } from '../../application/services/LeadService';
import { LeadStatus } from '../../domain/entities/Lead';

export class LeadController {
  constructor(private leadService: LeadService) {}

  async getAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await this.leadService.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  }

  async getLeadsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = req.params.status as LeadStatus;
      const leads = await this.leadService.getLeadsByStatus(status);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leads by status' });
    }
  }

  async getLeadById(req: Request, res: Response): Promise<void> {
    try {
      const lead = await this.leadService.getLeadById(req.params.id);
      if (!lead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch lead' });
    }
  }

  async acceptLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await this.leadService.acceptLead(req.params.id);
      if (!lead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept lead' });
    }
  }

  async declineLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await this.leadService.declineLead(req.params.id);
      if (!lead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to decline lead' });
    }
  }

  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await this.leadService.createLead(req.body);
      res.status(201).json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create lead' });
    }
  }

  async updateLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await this.leadService.updateLead(req.params.id, req.body);
      if (!lead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update lead' });
    }
  }

  async deleteLead(req: Request, res: Response): Promise<void> {
    try {
      await this.leadService.deleteLead(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete lead' });
    }
  }
} 