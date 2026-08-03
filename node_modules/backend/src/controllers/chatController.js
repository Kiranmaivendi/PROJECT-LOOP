import Chat from '../models/Chat.js';
import Feedback from '../models/Feedback.js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'demo-key' });

export const createChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const feedback = await Feedback.find({ organization: req.user.organization }).limit(20);
    const context = feedback.map((item) => `${item.customerName}: ${item.feedbackText}`).join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an AI assistant for customer feedback intelligence. Use the provided context to answer user questions concisely.' },
        { role: 'user', content: `Context:\n${context}\n\nQuestion: ${message}` },
      ],
    });

    const answer = completion.choices?.[0]?.message?.content || 'No answer generated';
    const chat = await Chat.findOneAndUpdate(
      { organization: req.user.organization, user: req.user._id },
      { $push: { messages: [{ role: 'user', content: message }, { role: 'assistant', content: answer }] } },
      { upsert: true, new: true },
    );

    res.json({ answer, chat });
  } catch (error) {
    next(error);
  }
};
