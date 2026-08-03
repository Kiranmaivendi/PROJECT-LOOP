import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    domain: { type: String, trim: true },
    plan: { type: String, default: 'pro' },
    settings: {
      theme: { type: String, default: 'dark' },
      notifications: { type: Boolean, default: true },
      apiKey: { type: String, default: '' },
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;
