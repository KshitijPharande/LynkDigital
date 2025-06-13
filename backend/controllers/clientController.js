const Client = require('../models/Client');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

exports.addClient = async (req, res) => {
  try {
    const { name, phone, email, companyName, address, typeOfWork, startDate, deliveryDate, status, monthlyPayments } = req.body;
    const client = new Client({
      name, phone, email, companyName, address, typeOfWork,
      startDate: typeOfWork === 'WebDev' ? startDate : undefined,
      deliveryDate: typeOfWork === 'WebDev' ? deliveryDate : undefined,
      status: typeOfWork === 'WebDev' ? status : undefined,
      monthlyPayments: typeOfWork === 'DigitalMarketing' ? monthlyPayments : undefined,
    });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClients = async (req, res) => {
  try {
    const { typeOfWork } = req.query;
    let filter = {};
    if (typeOfWork) filter.typeOfWork = typeOfWork;
    const clients = await Client.find(filter);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { month, year, paid } = req.body;
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    // Find or create the payment record for the given month/year
    let payment = client.monthlyPayments.find(
      (p) => p.month === month && p.year === year
    );
    if (payment) {
      payment.paid = paid;
    } else {
      client.monthlyPayments.push({ month, year, paid });
    }

    await client.save();
    res.json({ message: 'Payment status updated', client });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.terminateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    client.terminated = true;
    client.terminatedAt = new Date();
    await client.save();
    res.json({ message: 'Client terminated', client });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    client.status = status;
    await client.save();
    res.json({ message: 'Client status updated', client });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadPaymentProof = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { month, year } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    // Wrap the stream in a Promise
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto', folder: 'payment_proofs' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadToCloudinary();

    // Save proof in client
    client.paymentProofs.push({
      month: parseInt(month),
      year: parseInt(year),
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
    });
    await client.save();
    res.json({ message: 'Payment proof uploaded', url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.restoreClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    client.terminated = false;
    client.terminatedAt = undefined;
    await client.save();
    res.json({ message: 'Client restored', client });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 