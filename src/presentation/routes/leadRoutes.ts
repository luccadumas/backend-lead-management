import { Router } from 'express';
import { LeadController } from '../controllers/LeadController';
import { LeadService } from '../../application/services/LeadService';
import { LeadRepository } from '../../infrastructure/repositories/LeadRepository';
import { EmailService } from '../../infrastructure/services/EmailService';

const router = Router();
const leadRepository = new LeadRepository();
const emailService = new EmailService();
const leadService = new LeadService(leadRepository, emailService);
const leadController = new LeadController(leadService);

// Get all leads
router.get('/leads', (req, res) => leadController.getAllLeads(req, res));

// Get leads by status
router.get('/leads/status/:status', (req, res) => leadController.getLeadsByStatus(req, res));

// Get lead by ID
router.get('/leads/:id', (req, res) => leadController.getLeadById(req, res));

// Accept lead
router.post('/leads/:id/accept', (req, res) => leadController.acceptLead(req, res));

// Decline lead
router.post('/leads/:id/decline', (req, res) => leadController.declineLead(req, res));

// Create new lead
router.post('/leads', (req, res) => leadController.createLead(req, res));

// Update lead
router.put('/leads/:id', (req, res) => leadController.updateLead(req, res));

// Delete lead
router.delete('/leads/:id', (req, res) => leadController.deleteLead(req, res));

export default router; 