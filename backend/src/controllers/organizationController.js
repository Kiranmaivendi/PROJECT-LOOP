import Organization from '../models/Organization.js';
import User from '../models/User.js';

export const getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.user.organization).populate('members');
    res.json(organization);
  } catch (error) {
    next(error);
  }
};

export const inviteMember = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const organization = await Organization.findById(req.user.organization);
    const user = await User.create({ name: email.split('@')[0], email, password: 'temp123456', role, organization: organization._id });
    organization.members.push(user._id);
    await organization.save();
    res.status(201).json({ message: 'Member invited' });
  } catch (error) {
    next(error);
  }
};
