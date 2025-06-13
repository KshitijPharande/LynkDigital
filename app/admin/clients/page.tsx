"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import axiosInstance from '../../lib/axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface PaymentProof {
  month: number;
  year: number;
  url: string;
  public_id: string;
  format: string;
}

interface Client {
  _id: string
  name: string
  phone: string
  email: string
  companyName: string
  address: string
  typeOfWork: "WebDev" | "DigitalMarketing"
  startDate: string
  deliveryDate: string
  status: "inProgress" | "completed"
  monthlyPayments?: Array<{
    month: number
    year: number
    paid: boolean
  }>
  terminated?: boolean
  terminatedAt?: string
  paymentProofs?: PaymentProof[]
}

const formatDate = (dateString: string) => {
  if (!dateString) return "Not set"
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "Invalid date"
  return format(date, "MMM d, yyyy")
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [uploadingProof, setUploadingProof] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadMonth, setUploadMonth] = useState<number | null>(null)
  const [uploadYear, setUploadYear] = useState<number | null>(null)
  const [markingCompleteId, setMarkingCompleteId] = useState<string | null>(null)
  const [webdevProofFile, setWebdevProofFile] = useState<File | null>(null)
  const [webdevUploading, setWebdevUploading] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    companyName: "",
    // Add other fields as needed
  })

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handlePaymentUpdate = async (clientId: string, month: number, year: number, paid: boolean) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/api/clients/${clientId}/payment`, {
        month,
        year,
        paid
      });
      
      if (response.data) {
        toast.success('Payment status updated');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update payment status');
    }
  }

  const webDevClients = clients.filter(
    (client) => client.typeOfWork === "WebDev"
  )

  const digitalMarketingClients = clients.filter((client) => {
    if (client.typeOfWork !== "DigitalMarketing" || client.terminated) return false;
    if (!client.startDate) return true; // fallback: show if no start date
    const start = new Date(client.startDate);
    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();
    return (
      startYear < selectedYear || (startYear === selectedYear && startMonth <= selectedMonth)
    );
  });

  const previousDigitalMarketingClients = clients.filter((client) =>
    client.typeOfWork === "DigitalMarketing" && client.terminated
  );

  const handleTerminateClient = async (clientId: string) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/api/clients/${clientId}/terminate`);
      if (response.data) {
        toast.success('Client terminated successfully');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to terminate client');
    }
  };

  const inProgressWebDevClients = webDevClients.filter((client) => client.status === "inProgress");
  const completedWebDevClients = webDevClients.filter((client) => client.status === "completed");

  const handleMarkCompleted = async (clientId: string) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/api/clients/${clientId}/status`, { status: "completed" });
      if (response.data) {
        toast.success('Project marked as completed');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to mark as completed');
    }
  };

  const handleProofUpload = async (clientId: string, month: number, year: number) => {
    if (!selectedFile) return;
    setUploadingProof(clientId);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('month', month.toString());
      formData.append('year', year.toString());
      const response = await axiosInstance.post(`${API_URL}/api/clients/${clientId}/payment-proof`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        toast.success('Payment proof uploaded successfully');
        setSelectedFile(null);
        setUploadMonth(null);
        setUploadYear(null);
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload proof');
    } finally {
      setUploadingProof(null);
    }
  };

  const handleMarkCompletedWithProof = async (clientId: string, deliveryDate: string) => {
    setMarkingCompleteId(clientId);
    setWebdevUploading(true);
    try {
      // Mark as completed
      await handleMarkCompleted(clientId);
      // Upload proof if file selected
      if (webdevProofFile) {
        const formData = new FormData();
        const date = new Date(deliveryDate);
        formData.append('file', webdevProofFile);
        formData.append('month', (date.getMonth() + 1).toString());
        formData.append('year', date.getFullYear().toString());
        const response = await axiosInstance.post(`${API_URL}/api/clients/${clientId}/payment-proof`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data) {
          toast.success('Payment proof uploaded successfully');
        }
      }
      setWebdevProofFile(null);
      fetchClients();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to mark as completed or upload proof');
    } finally {
      setWebdevUploading(false);
      setMarkingCompleteId(null);
    }
  };

  const handleRestoreClient = async (clientId: string) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/api/clients/${clientId}/restore`);
      if (response.data) {
        toast.success('Client restored successfully');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to restore client');
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this client? This cannot be undone.")) return;
    try {
      const response = await axiosInstance.delete(`${API_URL}/api/clients/${clientId}`);
      if (response.data) {
        toast.success('Client deleted successfully');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete client');
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setEditFormData({
      name: client.name,
      companyName: client.companyName,
      // Set other fields as needed
    });
  };

  const handleUpdateClient = async () => {
    if (!editingClient) return;
    try {
      const response = await axiosInstance.put(`${API_URL}/api/clients/${editingClient._id}`, editFormData);
      if (response.data) {
        toast.success('Client updated successfully');
        setEditingClient(null);
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update client');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="webdev">
            <TabsList>
              <TabsTrigger value="webdev">Web Development</TabsTrigger>
              <TabsTrigger value="digitalmarketing">Digital Marketing</TabsTrigger>
              <TabsTrigger value="previousdm">Previous Clients</TabsTrigger>
            </TabsList>
            <TabsContent value="webdev">
              <Tabs defaultValue="inprogress" className="mt-4">
                <TabsList>
                  <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="inprogress">
                  <motion.div key="webdev-inprogress" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Delivery Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inProgressWebDevClients.map((client) => (
                          <TableRow key={client._id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.companyName}</TableCell>
                            <TableCell>{formatDate(client.startDate)}</TableCell>
                            <TableCell>{formatDate(client.deliveryDate)}</TableCell>
                            <TableCell>
                              <span className="text-yellow-600">In Progress</span>
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                                Edit
                              </Button>
                              {markingCompleteId === client._id ? (
                                <div className="flex flex-col gap-2">
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => setWebdevProofFile(e.target.files?.[0] || null)}
                                    className="block text-xs"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleMarkCompletedWithProof(client._id, client.deliveryDate)}
                                    disabled={webdevUploading || !webdevProofFile}
                                  >
                                    {webdevUploading ? "Uploading..." : "Upload & Complete"}
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => setMarkingCompleteId(client._id)}
                                >
                                  Mark as Completed
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                </TabsContent>
                <TabsContent value="completed">
                  <motion.div key="webdev-completed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Delivery Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Proof</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completedWebDevClients.map((client) => {
                          const proof = client.paymentProofs?.find(
                            (p) => {
                              const d = new Date(client.deliveryDate);
                              return p.month === d.getMonth() + 1 && p.year === d.getFullYear();
                            }
                          );
                          return (
                            <TableRow key={client._id}>
                              <TableCell>{client.name}</TableCell>
                              <TableCell>{client.companyName}</TableCell>
                              <TableCell>{formatDate(client.startDate)}</TableCell>
                              <TableCell>{formatDate(client.deliveryDate)}</TableCell>
                              <TableCell>
                                <span className="text-green-600">Completed</span>
                              </TableCell>
                              <TableCell>
                                {proof ? (
                                  proof.format.startsWith("image") ? (
                                    <a href={proof.url} target="_blank" rel="noopener noreferrer">
                                      <img src={proof.url} alt="Proof" className="w-10 h-10 object-cover rounded" />
                                    </a>
                                  ) : (
                                    <a href={proof.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View PDF</a>
                                  )
                                ) : (
                                  <span className="text-gray-400">No proof</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="digitalmarketing">
              <motion.div key="digitalmarketing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <div className="flex space-x-4 mb-4">
                  <Select
                    value={selectedMonth.toString()}
                    onValueChange={(value) => setSelectedMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {format(new Date(2024, i), "MMMM")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={(new Date().getFullYear() - 2 + i).toString()}
                        >
                          {new Date().getFullYear() - 2 + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {digitalMarketingClients.map((client) => {
                      const payment = client.monthlyPayments?.find(
                        (p) => p.month === selectedMonth && p.year === selectedYear
                      )
                      const proof = client.paymentProofs?.find(
                        (p) => p.month === selectedMonth && p.year === selectedYear
                      )
                      return (
                        <TableRow key={client._id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.companyName}</TableCell>
                          <TableCell>{formatDate(client.startDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={payment?.paid ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  if (!payment?.paid) {
                                    handlePaymentUpdate(
                                      client._id,
                                      selectedMonth,
                                      selectedYear,
                                      true
                                    )
                                    setUploadMonth(selectedMonth)
                                    setUploadYear(selectedYear)
                                  }
                                }}
                                disabled={uploadingProof === client._id}
                              >
                                {payment?.paid ? "Paid" : "Unpaid"}
                              </Button>
                              {payment?.paid && !proof && (
                                <>
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    className="block text-xs"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleProofUpload(client._id, selectedMonth, selectedYear)}
                                    disabled={!selectedFile || uploadingProof === client._id}
                                  >
                                    {uploadingProof === client._id ? "Uploading..." : "Upload Proof"}
                                  </Button>
                                </>
                              )}
                              {proof && (
                                proof.format.startsWith("image") ? (
                                  <a href={proof.url} target="_blank" rel="noopener noreferrer">
                                    <img src={proof.url} alt="Proof" className="w-10 h-10 object-cover rounded" />
                                  </a>
                                ) : (
                                  <a href={proof.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View PDF</a>
                                )
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleTerminateClient(client._id)}
                            >
                              Terminate
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </motion.div>
            </TabsContent>
            <TabsContent value="previousdm">
              <motion.div key="previousdm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Terminated Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previousDigitalMarketingClients.map((client) => (
                      <TableRow key={client._id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.companyName}</TableCell>
                        <TableCell>{formatDate(client.terminatedAt)}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleRestoreClient(client._id)}
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClient(client._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {editingClient && (
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
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Client</h2>
            <div className="space-y-4">
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                placeholder="Name"
              />
              <Input
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700 focus:ring-2 focus:ring-blue-500"
                value={editFormData.companyName}
                onChange={(e) => setEditFormData({ ...editFormData, companyName: e.target.value })}
                placeholder="Company Name"
              />
              {/* Add other fields as needed */}
              <div className="flex gap-4 mt-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2" onClick={handleUpdateClient}>Update</Button>
                <Button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg py-2" onClick={() => setEditingClient(null)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 