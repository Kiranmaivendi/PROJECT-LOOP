import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    feedbackText: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true, trim: true },
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
    status: { type: String, enum: ['new', 'reviewed', 'resolved', 'archived'], default: 'new' },
    aiSummary: { type: String, default: '' },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    keywords: [{ type: String }],
    suggestedActions: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

feedbackSchema.index({ organization: 1, date: -1 });
feedbackSchema.index({ feedbackText: 'text', customerName: 'text', category: 'text' });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
