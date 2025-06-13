"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";
import axiosInstance from '../../lib/axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsResponse, clientsResponse, invoicesResponse] = await Promise.all([
          axiosInstance.get('/api/leads'),
          axiosInstance.get('/api/clients'),
          axiosInstance.get('/api/invoices')
        ]);

        const leads = leadsResponse.data;
        const clients = clientsResponse.data;
        const invoices = invoicesResponse.data;
        // Calculate stats
        const totalLeads = leads.length;
        const totalClients = clients.length;
        const totalInvoices = invoices.length;
        const totalRevenue = invoices.reduce((sum: number, inv: any) => sum + (inv.fullAmount || 0), 0);
        const totalReceived = invoices.reduce((sum: number, inv: any) => sum + (inv.advanceAmount || 0), 0);
        const totalOutstanding = invoices.reduce((sum: number, inv: any) => sum + (inv.remainingBalance || 0), 0);
        // Revenue over time (by month)
        const revenueByMonth: { [k: string]: number } = {};
        invoices.forEach((inv: any) => {
          const d = new Date(inv.createdAt);
          const key = format(d, "yyyy-MM");
          revenueByMonth[key] = (revenueByMonth[key] || 0) + (inv.fullAmount || 0);
        });
        const revenueChart = Object.entries(revenueByMonth).map(([month, value]) => ({ month, value }));
        // Leads over time (by month)
        const leadsByMonth: { [k: string]: number } = {};
        leads.forEach((lead: any) => {
          const d = new Date(lead.createdAt);
          const key = format(d, "yyyy-MM");
          leadsByMonth[key] = (leadsByMonth[key] || 0) + 1;
        });
        const leadsChart = Object.entries(leadsByMonth).map(([month, value]) => ({ month, value }));
        // Clients over time (by month)
        const clientsByMonth: { [k: string]: number } = {};
        clients.forEach((client: any) => {
          const d = new Date(client.createdAt);
          const key = format(d, "yyyy-MM");
          clientsByMonth[key] = (clientsByMonth[key] || 0) + 1;
        });
        const clientsChart = Object.entries(clientsByMonth).map(([month, value]) => ({ month, value }));
        // Payment status breakdown
        const paid = invoices.filter((inv: any) => inv.remainingBalance === 0).length;
        const unpaid = invoices.filter((inv: any) => inv.advanceAmount === 0 && inv.remainingBalance > 0).length;
        const partial = invoices.filter((inv: any) => inv.advanceAmount > 0 && inv.remainingBalance > 0).length;
        setStats({
          totalLeads,
          totalClients,
          totalInvoices,
          totalRevenue,
          totalReceived,
          totalOutstanding,
          revenueChart,
          leadsChart,
          clientsChart,
          paymentStatus: [
            { name: "Paid", value: paid },
            { name: "Unpaid", value: unpaid },
            { name: "Partial", value: partial },
          ],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20 text-lg">Loading dashboard...</div>;
  if (!stats) return <div className="text-center py-20 text-red-500">Failed to load dashboard data.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-blue-400">{stats.totalLeads}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clients</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-400">{stats.totalClients}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Invoices</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-400">{stats.totalInvoices}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-purple-400">₹{stats.totalRevenue}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payments Received</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-cyan-400">₹{stats.totalReceived}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outstanding</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-red-400">₹{stats.totalOutstanding}</CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.revenueChart}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.leadsChart}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#5ba3d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clients Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.clientsChart}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={stats.paymentStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  <Cell key="Paid" fill="#34d399" />
                  <Cell key="Unpaid" fill="#fbbf24" />
                  <Cell key="Partial" fill="#f87171" />
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
} 