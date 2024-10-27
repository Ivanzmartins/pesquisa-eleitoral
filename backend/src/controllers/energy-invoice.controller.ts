import { Request, Response, NextFunction } from 'express';
import { EnergyInvoiceService } from '../services/energy-invoice.service';

export class EnergyInvoiceController {
	private energyInvoiceService: EnergyInvoiceService;

	constructor(energyInvoiceService: EnergyInvoiceService) {
		this.energyInvoiceService = energyInvoiceService;
	}

	async createEnergyInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.file) {
			res.status(400).json({ message: 'File is required' });
			return;
		}
		//TODO: IMPLMENT MIME TYPE VALIDATION MIDDLWARE IN A SEPARATE FILE
		if (req.file.mimetype !== 'application/pdf') {
			res.status(400).json({ message: 'Only PDF files are allowed' });
			return;
		}
		const pdfBuffer = req.file.buffer;

		try {
			const energyInvoice = await this.energyInvoiceService.createEnergyInvoice(pdfBuffer);
			res.status(201).json(energyInvoice);
		} catch (error) {
			next(error);
		}
	}
	async getAllEnergyInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { clientNumber, startDate, endDate } = req.query;

			const filters: any = {};
			if (clientNumber) {
				filters.clientNumber = clientNumber.toString();
			}
			if (startDate) {
				filters.startDate = new Date(startDate.toString());
			}
			if (endDate) {
				filters.endDate = new Date(endDate.toString());
			}

			const energyInvoices = await this.energyInvoiceService.getAllEnergyInvoices(filters);

			res.status(200).json(energyInvoices);
		} catch (error) {
			next(error);
		}
	}

	async getInvoicePdf(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;

			const invoice = await this.energyInvoiceService.getEnergyInvoiceById(Number(id));

			if (!invoice) {
				res.status(404).json({ message: 'Invoice not found' });
				return;
			}

			if (!invoice.pdfData) {
				res.status(404).json({ message: 'PDF data not found' });
				return;
			}

			res.contentType('application/pdf');
			res.send(invoice.pdfData);
		} catch (error) {
			next(error);
		}
	}
}

export default EnergyInvoiceController;
