import React, { useState } from "react";
import {
  FaPlus,
  FaFileInvoiceDollar,
  FaHistory,
  FaChartLine,
  FaEye,
} from "react-icons/fa";

const invoicesData = [
  {
    invoiceNo: "INV-2025-001",
    client: "Priya & Raj Sharma",
    event: "Wedding",
    amount: 150000,
    paid: 75000,
    dueDate: "8/10/2025",
    status: "partial",
  },
  {
    invoiceNo: "INV-2025-002",
    client: "Raj & Sunita Gupta",
    event: "Anniversary",
    amount: 50000,
    paid: 50000,
    dueDate: "8/5/2025",
    status: "paid",
  },
  {
    invoiceNo: "INV-2025-003",
    client: "Aisha & Dev Kumar",
    event: "Pre-wedding",
    amount: 80000,
    paid: 0,
    dueDate: "8/30/2025",
    status: "pending",
  },
];

const paymentsData = [
  {
    date: "8/1/2025",
    client: "Priya & Raj Sharma",
    invoiceNo: "INV-2025-001",
    amount: 75000,
    method: "Bank Transfer",
    transactionId: "TXN123456789",
    status: "completed",
  },
  {
    date: "8/3/2025",
    client: "Raj & Sunita Gupta",
    invoiceNo: "INV-2025-002",
    amount: 50000,
    method: "UPI",
    transactionId: "UPI987654321",
    status: "completed",
  },
];

const revenueTrendData = [
  { month: "August 2025", revenue: 125000 },
  { month: "July 2025", revenue: 195000 },
  { month: "June 2025", revenue: 178000 },
];

const paymentMethodsData = [
  { method: "Bank Transfer", percent: 60 },
  { method: "Cash", percent: 35 },
  { method: "UPI", percent: 5 },
];

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">Manage your photography business</p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 bg-pink-600 text-white px-4 sm:px-5 py-2 rounded-md hover:bg-pink-700 transition">
          <FaPlus /> Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-semibold mb-2">Total Revenue</h3>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">₹125,000</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">This month</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-semibold mb-2">Pending Payments</h3>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">₹155,000</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Outstanding</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-semibold mb-2">Total Invoices</h3>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">3</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">This month</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 font-semibold mb-2">Collection Rate</h3>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">78%</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Payment success</p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex gap-4 sm:gap-8 border-b border-gray-300 text-gray-700 font-semibold text-sm sm:text-base">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "invoices"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaFileInvoiceDollar /> Invoices
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "payments"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaHistory /> Payment History
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "reports"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaChartLine /> Financial Reports
        </button>
      </nav>

      {/* Content */}
      <div className="mt-6">
        {/* ===== Invoices Tab ===== */}
        {activeTab === "invoices" && (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {invoicesData.map((inv) => (
                <div key={inv.invoiceNo} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{inv.invoiceNo}</span>
                    <span
                      className={`font-semibold ${
                        inv.status === "paid"
                          ? "text-green-600"
                          : inv.status === "partial"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{inv.client}</p>
                  <p className="text-sm text-gray-500">{inv.event}</p>
                  <p className="mt-2">
                    Amount: <span className="font-semibold">₹{inv.amount.toLocaleString()}</span>
                  </p>
                  <p>Paid: ₹{inv.paid.toLocaleString()}</p>
                  <p>Due: {inv.dueDate}</p>
                  <button
                    className="mt-3 flex items-center gap-2 text-pink-600 hover:underline"
                    onClick={() => alert(`Viewing invoice ${inv.invoiceNo}`)}
                  >
                    <FaEye /> View
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md p-4">
              <table className="min-w-full table-auto text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Paid</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoicesData.map((inv) => (
                    <tr
                      key={inv.invoiceNo}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-mono">{inv.invoiceNo}</td>
                      <td className="py-3 px-4">{inv.client}</td>
                      <td className="py-3 px-4">{inv.event}</td>
                      <td className="py-3 px-4">₹{inv.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">₹{inv.paid.toLocaleString()}</td>
                      <td className="py-3 px-4">{inv.dueDate}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          inv.status === "paid"
                            ? "text-green-600"
                            : inv.status === "partial"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {inv.status}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="flex items-center gap-2 text-pink-600 hover:underline"
                          onClick={() => alert(`Viewing invoice ${inv.invoiceNo}`)}
                        >
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ===== Payment History Tab ===== */}
        {activeTab === "payments" && (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {paymentsData.map((pmt, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{pmt.date}</span>
                    <span
                      className={`font-semibold ${
                        pmt.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {pmt.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{pmt.client}</p>
                  <p className="text-sm text-gray-500">Invoice: {pmt.invoiceNo}</p>
                  <p>Amount: ₹{pmt.amount.toLocaleString()}</p>
                  <p>Method: {pmt.method}</p>
                  <p className="text-xs text-gray-500">Txn ID: {pmt.transactionId}</p>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md p-4">
              <table className="min-w-full table-auto text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsData.map((payment, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">{payment.client}</td>
                      <td className="py-3 px-4 font-mono">{payment.invoiceNo}</td>
                      <td className="py-3 px-4">₹{payment.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">{payment.method}</td>
                      <td className="py-3 px-4 font-mono">{payment.transactionId}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          payment.status === "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {payment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ===== Reports Tab ===== */}
        {activeTab === "reports" && (
          <div className="space-y-8">
            {/* Monthly Revenue Trend */}
            <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Monthly Revenue Trend</h3>
              <ul className="space-y-3">
                {revenueTrendData.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.month}</span>
                    <span className="font-semibold">
                      ₹{item.revenue.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Payment Methods Distribution */}
            <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
              <ul className="space-y-4">
                {paymentMethodsData.map((method, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-pink-600 h-5"
                        style={{ width: `${method.percent}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{method.method}</span>
                    <span className="ml-auto text-gray-600">{method.percent}%</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
