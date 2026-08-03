import Feedback from '../models/Feedback.js';
import Organization from '../models/Organization.js';
import { analyzeFeedback } from '../services/aiService.js';

export const listFeedback = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category, sentiment, source, status, sort = '-date' } = req.query;
    const query = { organization: req.user.organization };

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { feedbackText: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (sentiment) query.sentiment = sentiment;
    if (source) query.source = source;
    if (status) query.status = status;

    const feedback = await Feedback.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments(query);
    res.json({ feedback, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  try {
    const analysis = await analyzeFeedback(req.body.feedbackText);
    const feedback = await Feedback.create({
      ...req.body,
      organization: req.user.organization,
      createdBy: req.user._id,
      sentiment: analysis.sentiment,
      category: analysis.category,
      aiSummary: analysis.summary,
      keywords: analysis.keywords,
      suggestedActions: analysis.actions,
      urgency: analysis.urgency,
    });
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findOneAndUpdate({ _id: req.params.id, organization: req.user.organization }, req.body, { new: true });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findOneAndDelete({ _id: req.params.id, organization: req.user.organization });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    next(error);
  }
};

export const analytics = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ organization: req.user.organization });
    const total = feedback.length;
    const positive = feedback.filter((item) => item.sentiment === 'positive').length;
    const negative = feedback.filter((item) => item.sentiment === 'negative').length;
    const avgRating = total ? (feedback.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1) : 0;
    res.json({ total, positivePercent: Math.round((positive / total) * 100) || 0, negativePercent: Math.round((negative / total) * 100) || 0, averageRating: Number(avgRating) });
  } catch (error) {
    next(error);
  }
};
