import PDFDocument from 'pdfkit';
import Report from '../models/Report.js';
import Feedback from '../models/Feedback.js';

export const generateReport = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ organization: req.user.organization });
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=project-loop-report.pdf');
    doc.pipe(res);
    doc.fontSize(20).text('Project LOOP Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Total feedback: ${feedback.length}`);
    doc.text(`Positive: ${feedback.filter((item) => item.sentiment === 'positive').length}`);
    doc.text(`Negative: ${feedback.filter((item) => item.sentiment === 'negative').length}`);
    doc.end();

    await Report.create({ organization: req.user.organization, type: 'pdf', title: 'Executive Summary', content: 'Generated report', createdBy: req.user._id });
  } catch (error) {
    next(error);
  }
};

export const exportCsv = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ organization: req.user.organization });
    const rows = ['customerName,email,product,category,sentiment,rating'];
    feedback.forEach((item) => rows.push(`${item.customerName},${item.email},${item.product},${item.category},${item.sentiment},${item.rating}`));
    res.setHeader('Content-Type', 'text/csv');
    res.send(rows.join('\n'));
  } catch (error) {
    next(error);
  }
};
