const Lead = require('../models/Lead');
const Client = require('../models/Client');

exports.addLead = async (req, res) => {
  try {
    const { name, phone, email, companyName, address, typeOfWork } = req.body;
    const lead = new Lead({ name, phone, email, companyName, address, typeOfWork });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.acceptLead = async (req, res) => {
  try {
    const { startDate, deliveryDate } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    
    lead.status = 'accepted';
    await lead.save();

    // Move to clients
    const client = new Client({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      companyName: lead.companyName,
      address: lead.address,
      typeOfWork: lead.typeOfWork,
      startDate: startDate,
      deliveryDate: lead.typeOfWork === 'WebDev' ? deliveryDate : undefined,
      status: lead.typeOfWork === 'WebDev' ? 'inProgress' : undefined,
    });
    await client.save();
    res.json({ message: 'Lead accepted and moved to clients', client });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    lead.status = 'rejected';
    await lead.save();
    res.json({ message: 'Lead rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCall = async (req, res) => {
  try {
    const { firstCall, followUpCall } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (firstCall !== undefined) lead.firstCall = firstCall;
    if (followUpCall !== undefined) lead.followUpCall = followUpCall;
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 

exports.editLead = async (req, res) => {
  try {
    const { name, phone, email, companyName, address, typeOfWork } = req.body;
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (lead.status !== 'pending') return res.status(400).json({ message: 'Can only edit pending leads' });

    lead.name = name;
    lead.phone = phone;
    lead.email = email;
    lead.companyName = companyName;
    lead.address = address;
    lead.typeOfWork = typeOfWork;

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 