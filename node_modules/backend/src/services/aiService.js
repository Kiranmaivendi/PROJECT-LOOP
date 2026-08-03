export const analyzeFeedback = async (text) => {
  const lower = text.toLowerCase();
  const sentiment = lower.includes('bad') || lower.includes('issue') || lower.includes('hate') ? 'negative' : lower.includes('love') || lower.includes('great') ? 'positive' : 'neutral';
  const category = lower.includes('payment') || lower.includes('billing') ? 'Billing' : lower.includes('support') ? 'Support' : 'Product';
  const keywords = Array.from(new Set(text.split(/\s+/).filter((word) => word.length > 4).slice(0, 5)));
  const summary = `AI summarized: ${text.slice(0, 120)}...`;
  const actions = ['Review the concern', 'Respond to the customer', 'Escalate if urgent'];
  const urgency = lower.includes('urgent') || lower.includes('angry') ? 'high' : 'medium';
  return { sentiment, category, keywords, summary, actions, urgency };
};
