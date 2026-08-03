import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    generatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
