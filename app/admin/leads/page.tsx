"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { motion } from "framer-motion"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axiosInstance from '../../lib/axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Lead {
  _id: string
  name: string
  phone: string
  email: string
  companyName: string
  address: string
  typeOfWork: "WebDev" | "DigitalMarketing"
  status: "pending" | "accepted" | "rejected"
  firstCall: string | null
  followUpCall: string | null
  createdAt: string
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return null
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return null
  return format(date, "MMM d, yyyy")
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    address: "",
    typeOfWork: "WebDev",
  })
  const [acceptModalData, setAcceptModalData] = useState<{
    isOpen: boolean
    leadId: string | null
    startDate: string
    deliveryDate: string
  }>({
    isOpen: false,
    leadId: null,
    startDate: "",
    deliveryDate: "",
  })
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClient, setFilterClient] = useState('');
  const [editModalData, setEditModalData] = useState<{
    isOpen: boolean;
    lead: Lead | null;
  }>({
    isOpen: false,
    lead: null,
  });

  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get('/api/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axiosInstance.post('/api/leads', formData);
      if (response.data) {
        toast.success("Lead added successfully", { position: "top-right" });
      setFormData({
        name: "",
        phone: "",
        email: "",
        companyName: "",
        address: "",
        typeOfWork: "WebDev",
        });
        fetchLeads();
      }
    } catch (error) {
      toast.error("Failed to add lead", { position: "top-right" });
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async (id: string) => {
    setAcceptModalData({
      isOpen: true,
      leadId: id,
      startDate: "",
      deliveryDate: "",
    })
  }

  const handleAcceptConfirm = async () => {
    const selectedLead = leads.find(lead => lead._id === acceptModalData.leadId);
    if (!selectedLead) {
      toast.error("Lead not found", { position: "top-right" });
      return;
    }

    if (
      (selectedLead.typeOfWork === "WebDev" && (!acceptModalData.startDate || !acceptModalData.deliveryDate)) ||
      (selectedLead.typeOfWork === "DigitalMarketing" && !acceptModalData.startDate)
    ) {
      toast.error("Please fill in all required fields", { position: "top-right" });
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/leads/${acceptModalData.leadId}/accept`, {
          startDate: acceptModalData.startDate,
          deliveryDate: acceptModalData.deliveryDate,
      });

      if (response.data) {
      toast.success("Lead accepted and converted to client", { position: "top-right" });
      setAcceptModalData({
        isOpen: false,
        leadId: null,
        startDate: "",
        deliveryDate: "",
      });
      fetchLeads();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to accept lead');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await axiosInstance.put(`/api/leads/${id}/reject`);
      if (response.data) {
        toast.success("Lead rejected", { position: "top-right" });
        fetchLeads();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject lead');
    }
  }

  const handleCallUpdate = async (id: string, callType: "firstCall" | "followUpCall") => {
    try {
      const response = await axiosInstance.put(`/api/leads/${id}/call`, {
        [callType]: new Date().toISOString()
      });
      if (response.data) {
        toast.success("Call status updated", { position: "top-right" });
        fetchLeads();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update call status');
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditModalData({
      isOpen: true,
      lead: lead,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalData.lead) return;

    try {
      const response = await axiosInstance.put(`/api/leads/${editModalData.lead._id}/edit`, {
        name: editModalData.lead.name,
        phone: editModalData.lead.phone,
        email: editModalData.lead.email,
        companyName: editModalData.lead.companyName,
        address: editModalData.lead.address,
        typeOfWork: editModalData.lead.typeOfWork,
      });

      if (response.data) {
        toast.success("Lead updated successfully", { position: "top-right" });
        setEditModalData({ isOpen: false, lead: null });
        fetchLeads();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update lead", { position: "top-right" });
    }
  };

  const pendingLeads = leads.filter((lead) => lead.status === "pending")
  const acceptedLeads = leads.filter((lead) => lead.status === "accepted")
  const rejectedLeads = leads.filter((lead) => lead.status === "rejected")

  const filteredPendingLeads = leads.filter((lead) =>
    (filterStatus === 'all' || filterStatus === 'pending') &&
    lead.status === "pending" && (
      (lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      (lead.companyName || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.address || "").toLowerCase().includes(search.toLowerCase())) &&
      (!filterClient ||
        lead.name.toLowerCase().includes(filterClient.toLowerCase()) ||
        (lead.companyName || '').toLowerCase().includes(filterClient.toLowerCase())) &&
      (!dateRange.startDate || new Date(lead.createdAt) >= dateRange.startDate) &&
      (!dateRange.endDate || new Date(lead.createdAt) <= dateRange.endDate)
    )
  );
  const filteredAcceptedLeads = leads.filter((lead) =>
    (filterStatus === 'all' || filterStatus === 'accepted') &&
    lead.status === "accepted" && (
      (lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      (lead.companyName || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.address || "").toLowerCase().includes(search.toLowerCase())) &&
      (!filterClient ||
        lead.name.toLowerCase().includes(filterClient.toLowerCase()) ||
        (lead.companyName || '').toLowerCase().includes(filterClient.toLowerCase())) &&
      (!dateRange.startDate || new Date(lead.createdAt) >= dateRange.startDate) &&
      (!dateRange.endDate || new Date(lead.createdAt) <= dateRange.endDate)
    )
  );
  const filteredRejectedLeads = leads.filter((lead) =>
    (filterStatus === 'all' || filterStatus === 'rejected') &&
    lead.status === "rejected" && (
      (lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      (lead.companyName || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.address || "").toLowerCase().includes(search.toLowerCase())) &&
      (!filterClient ||
        lead.name.toLowerCase().includes(filterClient.toLowerCase()) ||
        (lead.companyName || '').toLowerCase().includes(filterClient.toLowerCase())) &&
      (!dateRange.startDate || new Date(lead.createdAt) >= dateRange.startDate) &&
      (!dateRange.endDate || new Date(lead.createdAt) <= dateRange.endDate)
    )
  );

  const LeadTable = ({ leads }: { leads: Lead[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>First Call</TableHead>
          <TableHead>Follow-up</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead._id}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.phone}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.companyName}</TableCell>
            <TableCell>{lead.address}</TableCell>
            <TableCell>{lead.typeOfWork}</TableCell>
            <TableCell>
              {lead.firstCall ? (
                formatDate(lead.firstCall)
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCallUpdate(lead._id, "firstCall")}
                >
                  Mark
                </Button>
              )}
            </TableCell>
            <TableCell>
              {lead.followUpCall ? (
                formatDate(lead.followUpCall)
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCallUpdate(lead._id, "followUpCall")}
                >
                  Mark
                </Button>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {lead.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(lead)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAccept(lead._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(lead._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {lead.status === "accepted" && (
                  <span className="text-green-600">Accepted</span>
                )}
                {lead.status === "rejected" && (
                  <span className="text-red-600">Rejected</span>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="typeOfWork">Type of Work</Label>
                <Select
                  value={formData.typeOfWork}
                  onValueChange={(value) => setFormData({ ...formData, typeOfWork: value as "WebDev" | "DigitalMarketing" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of work" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WebDev">Web Development</SelectItem>
                    <SelectItem value="DigitalMarketing">Digital Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Lead"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <Input
              placeholder="Search by name, email, phone, company, or address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-80"
            />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
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
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({filteredPendingLeads.length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({filteredAcceptedLeads.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({filteredRejectedLeads.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <motion.div
                key={"pending"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <LeadTable leads={filteredPendingLeads} />
              </motion.div>
            </TabsContent>
            <TabsContent value="accepted">
              <motion.div
                key={"accepted"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <LeadTable leads={filteredAcceptedLeads} />
              </motion.div>
            </TabsContent>
            <TabsContent value="rejected">
              <motion.div
                key={"rejected"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <LeadTable leads={filteredRejectedLeads} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {acceptModalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Accept Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.find(lead => lead._id === acceptModalData.leadId)?.typeOfWork === "WebDev" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={acceptModalData.startDate}
                        onChange={(e) =>
                          setAcceptModalData({
                            ...acceptModalData,
                            startDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={acceptModalData.deliveryDate}
                        onChange={(e) =>
                          setAcceptModalData({
                            ...acceptModalData,
                            deliveryDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </>
                )}
                {leads.find(lead => lead._id === acceptModalData.leadId)?.typeOfWork === "DigitalMarketing" && (
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={acceptModalData.startDate}
                      onChange={(e) =>
                        setAcceptModalData({
                          ...acceptModalData,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setAcceptModalData({
                        isOpen: false,
                        leadId: null,
                        startDate: "",
                        deliveryDate: "",
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAcceptConfirm}>Accept Lead</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {editModalData.isOpen && editModalData.lead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Edit Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editModalData.lead.name}
                      onChange={(e) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, name: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={editModalData.lead.phone}
                      onChange={(e) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, phone: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editModalData.lead.email}
                      onChange={(e) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, email: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-companyName">Company Name</Label>
                    <Input
                      id="edit-companyName"
                      value={editModalData.lead.companyName}
                      onChange={(e) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, companyName: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Input
                      id="edit-address"
                      value={editModalData.lead.address}
                      onChange={(e) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, address: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-typeOfWork">Type of Work</Label>
                    <Select
                      value={editModalData.lead.typeOfWork}
                      onValueChange={(value) =>
                        setEditModalData({
                          ...editModalData,
                          lead: { ...editModalData.lead!, typeOfWork: value as "WebDev" | "DigitalMarketing" },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of work" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WebDev">Web Development</SelectItem>
                        <SelectItem value="DigitalMarketing">Digital Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditModalData({ isOpen: false, lead: null })}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 