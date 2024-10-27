import { Router } from 'express';
import multer from 'multer';
import InvoiceDetailRepository from '../repository/energy-invoice-details.repository';
import EnergyInvoiceService from '../services/energy-invoice.service';
import EnergyInvoiceController from '../controllers/energy-invoice.controller';
import EnergyInvoiceRepository from '../repository/energy-invoice.repository';
import { PdfReadService } from '../services/pdf-read.service';

const upload = multer({ storage: multer.memoryStorage() });

const energyInvoiceRouter = Router();

const pdfReadService = new PdfReadService();
const energyInvoiceRepository = new EnergyInvoiceRepository();
const energyInvoiceDetailsRepository = new InvoiceDetailRepository();
const energyInvoiceService = new EnergyInvoiceService(
	energyInvoiceRepository,
	energyInvoiceDetailsRepository,
	pdfReadService
);
const energyInvoiceController = new EnergyInvoiceController(energyInvoiceService);

energyInvoiceRouter.post('/', upload.single('file'), (req, res, next) =>
	energyInvoiceController.createEnergyInvoice(req, res, next)
);

energyInvoiceRouter.get('/', (req, res, next) =>
	energyInvoiceController.getAllEnergyInvoices(req, res, next)
);

energyInvoiceRouter.get('/:id/download', (req, res, next) =>
	energyInvoiceController.getInvoicePdf(req, res, next)
);

export default energyInvoiceRouter;
