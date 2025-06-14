"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios, { AxiosError } from 'axios';

interface Invoice {
  _id: string
  sender: {
    name: string
    phone: string
    email: string
    address: string
  }
  invoiceNumber: string
  phone: string
  email: string
  companyName: string
  advanceAmount: number
  remainingBalance: number
  fullAmount: number
  createdAt: string
  note?: string
  lineItems?: LineItem[]
  bankName?: string
  accountNumber?: string
  paymentType?: string
}

interface LineItem {
  description: string;
  amount: string;
  qty: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFullPayment, setIsFullPayment] = useState(false)
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    phone: "",
    email: "",
    companyName: "",
    advanceAmount: "",
    remainingBalance: "",
    fullAmount: "",
    bankName: "",
    accountNumber: "",
    paymentType: "bank_transfer",
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([{ description: "", amount: "", qty: "1" }]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState(0); // 0 = all
  const [filterYear, setFilterYear] = useState(0); // 0 = all
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [editFormData, setEditFormData] = useState({
    invoiceNumber: "",
    phone: "",
    email: "",
    companyName: "",
    advanceAmount: "",
    remainingBalance: "",
    fullAmount: "",
    note: "",
    lineItems: [{ description: "", amount: "", qty: "1" }],
    bankName: "",
    accountNumber: "",
    paymentType: "bank_transfer",
  });
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [filterClient, setFilterClient] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`${API_URL}/api/invoices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setInvoices(data)
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to fetch invoices", { position: "top-right" })
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const totalAmount = lineItems.reduce((sum, item) => {
    const amount = parseFloat(item.amount || "0");
    const qty = parseFloat(item.qty || "1");
    return sum + (amount * qty);
  }, 0);

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string) => {
    setLineItems((prev) => {
      const newItems = prev.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return newItems;
    });
  };

  const handleAddLineItem = () => {
    setLineItems((prev) => [...prev, { description: "", amount: "", qty: "1" }]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const totalAmount = lineItems.reduce((sum, item) => {
        const amount = parseFloat(item.amount || "0");
        const qty = parseFloat(item.qty || "1");
        return sum + (amount * qty);
      }, 0);
      const advanceAmount = isFullPayment ? totalAmount : parseFloat(formData.advanceAmount);
      const remainingBalance = isFullPayment ? 0 : totalAmount - advanceAmount;

      const { data } = await axios.post(`${API_URL}/api/invoices`, {
        ...formData,
        advanceAmount,
        remainingBalance,
        fullAmount: totalAmount,
        lineItems: lineItems.map(item => ({
          description: item.description,
          amount: parseFloat(item.amount || "0") * parseFloat(item.qty || "1"),
          qty: parseFloat(item.qty || "1")
        })),
        note,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Invoice added successfully", { position: "top-right" })
      setFormData({
        invoiceNumber: "",
        phone: "",
        email: "",
        companyName: "",
        advanceAmount: "",
        remainingBalance: "",
        fullAmount: "",
        bankName: "",
        accountNumber: "",
        paymentType: "bank_transfer",
      })
      setLineItems([{ description: "", amount: "", qty: "1" }])
      setNote("")
      setIsFullPayment(false)
      fetchInvoices()
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to add invoice", { position: "top-right" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdvanceAmountChange = (value: string) => {
    const totalAmount = lineItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount || "0");
      const qty = parseFloat(item.qty || "1");
      return sum + (amount * qty);
    }, 0);
    const advanceAmount = parseFloat(value) || 0;
    const remainingBalance = totalAmount - advanceAmount;
    
    setFormData(prev => ({
      ...prev,
      advanceAmount: value,
      remainingBalance: remainingBalance.toString(),
      fullAmount: totalAmount.toString()
    }));
  };

  const handleDownloadPDF = async (invoiceId: string) => {
    try {
      console.log('Starting PDF download for invoice:', invoiceId);
      setLoading(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to download PDF");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/invoices/${invoiceId}/pdf`,
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setLoading(false);
    } catch (error: any) {
      console.error('PDF download error:', error);
      setLoading(false);
      
      // Enhanced error handling
      let errorMessage = 'Failed to download PDF';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        
        // Try to read the error message from the response
        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const errorData = JSON.parse(reader.result as string);
              console.error('Error details from server:', errorData);
              errorMessage = errorData.message || errorData.error || errorMessage;
              toast.error(errorMessage);
            } catch (e) {
              console.error('Error parsing error response:', e);
              toast.error('Failed to parse error response');
            }
          };
          reader.onerror = () => {
            console.error('Error reading error response');
            toast.error('Failed to read error response');
          };
          reader.readAsText(error.response.data);
        } else {
          errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
          toast.error(errorMessage);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        toast.error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        toast.error(error.message || 'An unexpected error occurred');
      }
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this invoice? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/invoices/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Invoice deleted", { position: "top-right" })
      fetchInvoices()
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to delete invoice", { position: "top-right" })
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setEditFormData({
      invoiceNumber: invoice.invoiceNumber,
      phone: invoice.phone,
      email: invoice.email,
      companyName: invoice.companyName,
      advanceAmount: invoice.advanceAmount.toString(),
      remainingBalance: invoice.remainingBalance.toString(),
      fullAmount: invoice.fullAmount.toString(),
      note: invoice.note || "",
      lineItems: invoice.lineItems || [{ description: "", amount: "", qty: "1" }],
      bankName: invoice.bankName || "",
      accountNumber: invoice.accountNumber || "",
      paymentType: invoice.paymentType || "bank_transfer",
    });
  };

  const handleUpdateInvoice = async () => {
    if (!editingInvoice) return;
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${API_URL}/api/invoices/${editingInvoice._id}`, editFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Invoice updated", { position: "top-right" })
      setEditingInvoice(null);
      fetchInvoices();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to update invoice", { position: "top-right" })
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      (invoice.invoiceNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (invoice.companyName || "").toLowerCase().includes(search.toLowerCase()) ||
      (invoice.lineItems || []).some(item => item.description.toLowerCase().includes(search.toLowerCase()));
    const date = new Date(invoice.createdAt);
    const matchesMonth = filterMonth === 0 || date.getMonth() + 1 === filterMonth;
    const matchesYear = filterYear === 0 || date.getFullYear() === filterYear;
    const matchesDateRange =
      (!dateRange.startDate || date >= dateRange.startDate) &&
      (!dateRange.endDate || date <= dateRange.endDate);
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'paid' && invoice.remainingBalance === 0) ||
      (filterStatus === 'unpaid' && invoice.advanceAmount === 0 && invoice.remainingBalance > 0) ||
      (filterStatus === 'partial' && invoice.advanceAmount > 0 && invoice.remainingBalance > 0);
    const matchesAmount =
      (!amountMin || invoice.fullAmount >= Number(amountMin)) &&
      (!amountMax || invoice.fullAmount <= Number(amountMax));
    const matchesClient =
      !filterClient ||
      (invoice.invoiceNumber || "").toLowerCase().includes(filterClient.toLowerCase()) ||
      (invoice.companyName || '').toLowerCase().includes(filterClient.toLowerCase());
    return matchesSearch && matchesMonth && matchesYear && matchesDateRange && matchesStatus && matchesAmount && matchesClient;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Line Items</Label>
                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={e => handleLineItemChange(idx, "description", e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => handleLineItemChange(idx, "qty", e.target.value)}
                      className="w-24"
                    />
                    <Input
                      placeholder="Amount per item"
                      type="number"
                      value={item.amount}
                      onChange={e => handleLineItemChange(idx, "amount", e.target.value)}
                      required
                      className="w-32"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveLineItem(idx)} disabled={lineItems.length === 1}>Remove</Button>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                <Button type="button" size="sm" onClick={handleAddLineItem}>Add Item</Button>
                  <div className="font-bold">Total: ₹{totalAmount}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="fullPayment"
                  checked={isFullPayment}
                  onCheckedChange={(checked) => setIsFullPayment(checked as boolean)}
                />
                <Label htmlFor="fullPayment">Full Payment</Label>
              </div>
              {!isFullPayment && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="advanceAmount">Advance Amount</Label>
                    <Input
                      id="advanceAmount"
                      type="number"
                      value={formData.advanceAmount}
                      onChange={(e) => handleAdvanceAmountChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remainingBalance">Remaining Balance</Label>
                    <Input
                      id="remainingBalance"
                      type="number"
                      value={formData.remainingBalance}
                      readOnly
                      className="bg-zinc-800/50"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Add a note (optional)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentType">Payment Type</Label>
                <select
                  id="paymentType"
                  value={formData.paymentType}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="cheque">Cheque</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="Enter bank name"
                  disabled={formData.paymentType !== "bank_transfer"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter account number"
                  disabled={formData.paymentType !== "bank_transfer"}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Invoice"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            <Input
              placeholder="Search by invoice number, company, or item..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-56"
            />
            <select
              value={filterMonth}
              onChange={e => setFilterMonth(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={0}>All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{format(new Date(2024, i), "MMMM")}</option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={e => setFilterYear(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={0}>All Years</option>
              {Array.from(new Set(invoices.map(inv => new Date(inv.createdAt).getFullYear()))).sort((a, b) => b - a).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
            </select>
            <Input
              type="number"
              min="0"
              placeholder="Min Amount"
              value={amountMin}
              onChange={e => setAmountMin(e.target.value)}
              className="w-28"
            />
            <Input
              type="number"
              min="0"
              placeholder="Max Amount"
              value={amountMax}
              onChange={e => setAmountMax(e.target.value)}
              className="w-28"
            />
            <Input
              placeholder="Client/Company..."
              value={filterClient}
              onChange={e => setFilterClient(e.target.value)}
              className="w-40"
            />
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => setShowDatePicker((v) => !v)}
            >
              {dateRange.startDate && dateRange.endDate
                ? `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`
                : 'Select Date Range'}
            </Button>
            {showDatePicker && (
              <div className="absolute z-50 mt-2">
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDateRange(item.selection)}
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]}
                  maxDate={new Date()}
                />
                <Button size="sm" className="mt-2 w-full" onClick={() => setShowDatePicker(false)}>Close</Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <motion.div key="invoices-table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Date</TableHead>
                    <TableHead className="min-w-[120px]">Invoice #</TableHead>
                    <TableHead className="min-w-[140px]">Company</TableHead>
                    <TableHead className="min-w-[100px]">Advance</TableHead>
                    <TableHead className="min-w-[100px]">Remaining</TableHead>
                    <TableHead className="min-w-[100px]">Total</TableHead>
                    <TableHead className="min-w-[120px]">Note</TableHead>
                    <TableHead className="min-w-[180px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice._id} className="hover:bg-zinc-800/60 transition-colors group align-middle">
                      <TableCell className="py-3 px-2 align-middle">{format(new Date(invoice.createdAt), "MMM d, yyyy")}</TableCell>
                      <TableCell className="py-3 px-2 align-middle truncate max-w-[120px]">
                        <Tooltip content={invoice.invoiceNumber}>
                          <span>{invoice.invoiceNumber || <span className="text-zinc-500">—</span>}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="py-3 px-2 align-middle truncate max-w-[140px]">
                        <Tooltip content={invoice.companyName}>
                          <span>{invoice.companyName || <span className="text-zinc-500">—</span>}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="py-3 px-2 align-middle">₹{invoice.advanceAmount}</TableCell>
                      <TableCell className="py-3 px-2 align-middle">₹{invoice.remainingBalance}</TableCell>
                      <TableCell className="py-3 px-2 align-middle">₹{invoice.fullAmount}</TableCell>
                      <TableCell className="py-3 px-2 align-middle truncate max-w-[120px]">
                        <Tooltip content={invoice.note}>
                          <span>{invoice.note || <span className="text-zinc-500">—</span>}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="py-3 px-2 align-middle">
                        <div className="flex gap-2 flex-wrap justify-center">
                          <Button size="sm" variant="ghost" className="border border-zinc-700 text-blue-400 hover:bg-zinc-800" onClick={() => setViewInvoice(invoice)}>
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="border border-zinc-700 text-blue-400 hover:bg-zinc-800" onClick={() => handleDownloadPDF(invoice._id)}>
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="text-white border-zinc-700 hover:bg-zinc-800" onClick={() => handleEditInvoice(invoice)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700 text-white px-3" onClick={() => handleDeleteInvoice(invoice._id)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {editingInvoice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-zinc-800"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Invoice</h2>
            <div className="space-y-4">
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.invoiceNumber}
                onChange={(e) => setEditFormData({ ...editFormData, invoiceNumber: e.target.value })}
                placeholder="Invoice Number"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                placeholder="Phone"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder="Email"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.companyName}
                onChange={(e) => setEditFormData({ ...editFormData, companyName: e.target.value })}
                placeholder="Company Name"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.advanceAmount}
                onChange={(e) => setEditFormData({ ...editFormData, advanceAmount: e.target.value })}
                placeholder="Advance Amount"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.remainingBalance}
                onChange={(e) => setEditFormData({ ...editFormData, remainingBalance: e.target.value })}
                placeholder="Remaining Balance"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.fullAmount}
                onChange={(e) => setEditFormData({ ...editFormData, fullAmount: e.target.value })}
                placeholder="Full Amount"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.note}
                onChange={(e) => setEditFormData({ ...editFormData, note: e.target.value })}
                placeholder="Note"
              />
              <select
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.paymentType}
                onChange={(e) => setEditFormData({ ...editFormData, paymentType: e.target.value })}
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="cheque">Cheque</option>
                <option value="other">Other</option>
              </select>
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.bankName}
                onChange={(e) => setEditFormData({ ...editFormData, bankName: e.target.value })}
                placeholder="Bank Name"
                disabled={editFormData.paymentType !== "bank_transfer"}
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.accountNumber}
                onChange={(e) => setEditFormData({ ...editFormData, accountNumber: e.target.value })}
                placeholder="Account Number"
                disabled={editFormData.paymentType !== "bank_transfer"}
              />
              <div className="flex gap-4 mt-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2" onClick={handleUpdateInvoice}>Update</Button>
                <Button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg py-2" onClick={() => setEditingInvoice(null)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {viewInvoice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-zinc-800"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Invoice Preview</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{format(new Date(viewInvoice.createdAt), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Invoice #:</span>
                <span>{viewInvoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Company:</span>
                <span>{viewInvoice.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{viewInvoice.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{viewInvoice.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Advance:</span>
                <span>₹{viewInvoice.advanceAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Remaining:</span>
                <span>₹{viewInvoice.remainingBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>₹{viewInvoice.fullAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment Type:</span>
                <span>{viewInvoice.paymentType ? viewInvoice.paymentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '-'}</span>
              </div>
              {viewInvoice.paymentType === 'bank_transfer' && (
                <>
                  <div className="flex justify-between">
                    <span className="font-semibold">Bank Name:</span>
                    <span>{viewInvoice.bankName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Account Number:</span>
                    <span>{viewInvoice.accountNumber || '-'}</span>
                  </div>
                </>
              )}
              <div className="font-semibold mt-4">Line Items:</div>
              <ul className="mb-2">
                {viewInvoice.lineItems && viewInvoice.lineItems.length > 0 ? (
                  viewInvoice.lineItems.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b border-zinc-700 py-1">
                      <span>{item.description}</span>
                      <span>₹{item.amount}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-400">No line items</li>
                )}
              </ul>
              <div className="flex justify-between">
                <span className="font-semibold">Note:</span>
                <span>{viewInvoice.note || '-'}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2" onClick={() => handleDownloadPDF(viewInvoice._id)}>
                Download PDF
              </Button>
              <Button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg py-2" onClick={() => setViewInvoice(null)}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 