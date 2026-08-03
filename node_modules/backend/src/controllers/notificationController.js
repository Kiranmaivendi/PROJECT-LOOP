import Notification from '../models/Notification.js';

export const listNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ organization: req.user.organization, user: req.user._id }).sort('-createdAt');
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Notification marked read' });
  } catch (error) {
    next(error);
  }
};
