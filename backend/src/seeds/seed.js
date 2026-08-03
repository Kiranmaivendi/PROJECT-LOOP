import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Organization from '../models/Organization.js';
import Feedback from '../models/Feedback.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project-loop');
  await Promise.all([User.deleteMany({}), Organization.deleteMany({}), Feedback.deleteMany({})]);

  const organization = await Organization.create({ name: 'Loop Labs', slug: 'loop-labs', plan: 'enterprise' });
  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await User.create({ name: 'Demo Admin', email: 'demo@loop.ai', password: passwordHash, role: 'Admin', organization: organization._id });
  organization.members.push(admin._id);
  await organization.save();

  await Feedback.create([
    { organization: organization._id, customerName: 'Ava', email: 'ava@example.com', product: 'Analytics Suite', source: 'Email', feedbackText: 'Billing portal is confusing and the support team was slow to reply.', rating: 2, date: new Date('2026-07-17'), category: 'Billing', sentiment: 'negative', status: 'new', aiSummary: 'Customer reported billing confusion and slow support.', urgency: 'high', keywords: ['billing', 'support', 'confusing'], suggestedActions: ['Clarify billing flow', 'Escalate to support'] },
    { organization: organization._id, customerName: 'Noah', email: 'noah@example.com', product: 'Analytics Suite', source: 'Web', feedbackText: 'Love the new onboarding experience and the dashboard is beautiful.', rating: 5, date: new Date('2026-07-21'), category: 'Onboarding', sentiment: 'positive', status: 'reviewed', aiSummary: 'Customer praised onboarding and dashboard design.', urgency: 'low', keywords: ['onboarding', 'dashboard'], suggestedActions: ['Celebrate the win', 'Share feedback with product team'] },
    { organization: organization._id, customerName: 'Mia', email: 'mia@example.com', product: 'Insights Pro', source: 'App', feedbackText: 'The export feature is slow and I need better filters.', rating: 3, date: new Date('2026-07-25'), category: 'Performance', sentiment: 'neutral', status: 'reviewed', aiSummary: 'Customer requested faster exports and better filters.', urgency: 'medium', keywords: ['export', 'filters', 'slow'], suggestedActions: ['Investigate export performance', 'Add filter improvements'] },
  ]);

  console.log('Seed data created');
  await mongoose.disconnect();
};

seed().catch((err) => console.error(err));
