import { BarChart3, TrendingUp, Users, Package, Edit2, Trash2, Plus, DollarSign, MapPin, Eye, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { registerAdmin } from '../services/authService';

interface AdminDashboardProps {
  user: any;
  darkMode: boolean;
}

// Mock analytics data
const salesData = [
  { month: 'Jan', sales: 45000, bookings: 32 },
  { month: 'Feb', sales: 52000, bookings: 38 },
  { month: 'Mar', sales: 61000, bookings: 45 },
  { month: 'Apr', sales: 58000, bookings: 41 },
  { month: 'May', sales: 71000, bookings: 52 },
  { month: 'Jun', sales: 83000, bookings: 61 }
];

const hotSpotData = [
  { name: 'Mount Kinabalu', visitors: 245, revenue: 318000 },
  { name: 'Semporna Islands', visitors: 312, revenue: 562000 },
  { name: 'Kinabatangan River', visitors: 187, revenue: 234000 },
  { name: 'Tunku Abdul Rahman Park', visitors: 298, revenue: 421000 }
];

const satisfactionData = [
  { rating: '5 Stars', count: 312, color: '#1b4332' },
  { rating: '4 Stars', count: 187, color: '#2d6a4f' },
  { rating: '3 Stars', count: 45, color: '#40916c' },
  { rating: '2 Stars', count: 12, color: '#95d5b2' },
  { rating: '1 Star', count: 5, color: '#d8f3dc' }
];

const mockPackages = [
  {
    id: 1,
    name: 'Mount Kinabalu Summit Trek',
    location: 'Kota Kinabalu',
    price: 1299,
    duration: '3D/2N',
    maxPax: 8,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Semporna Island Hopping',
    location: 'Tawau/Semporna',
    price: 899,
    duration: '2D/1N',
    maxPax: 15,
    status: 'Active'
  }
];

export function AdminDashboard({ user, darkMode }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'packages' | 'admins'>('analytics');
  const [packages, setPackages] = useState(mockPackages);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalBookings = salesData.reduce((sum, item) => sum + item.bookings, 0);
  const avgSatisfaction = 4.4;
  const isSuperAdmin = user.roleLevel === 'SuperAdmin';
  console.log('User object:', user, 'RoleLevel:', user.RoleLevel, 'isSuperAdmin:', isSuperAdmin);

  const handleDeletePackage = (id: number) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleEditPackage = (pkg: any) => {
    setEditingPackage(pkg);
    setShowPackageModal(true);
  };

  const handleAddPackage = () => {
    setEditingPackage(null);
    setShowPackageModal(true);
  };

  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminData.password !== newAdminData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const result = await registerAdmin(
        newAdminData.username,
        newAdminData.password,
        'standard'
      );

      if (result.success) {
        alert(`Admin "${newAdminData.username}" registered successfully!`);
        setShowAdminModal(false);
        setNewAdminData({ username: '', password: '', confirmPassword: '' });
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      alert(`Error registering admin: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}>Admin Dashboard</h1>
          <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#000000]'}>Welcome back, {user.username}</p>
          {isSuperAdmin && (
            <p className={`mt-1 text-sm ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#52b788]'}`}>
              🔑 SuperAdmin Access Granted
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#52b788] text-white shadow-lg'
                : darkMode
                  ? 'bg-[oklch(0.35_0.05_160)] text-[oklch(0.9_0.03_160)] border-2 border-[oklch(0.4_0.05_160)] hover:bg-[oklch(0.4_0.05_160)]'
                  : 'bg-white text-[#1b4332] border-2 border-[#95d5b2] hover:bg-[#f0f9f4]'
            }`}
          >
            <BarChart3 className="w-5 h-5 inline mr-2" />
            Analytics & Reports
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'packages'
                ? 'bg-[#52b788] text-white shadow-lg'
                : darkMode
                  ? 'bg-[oklch(0.35_0.05_160)] text-[oklch(0.9_0.03_160)] border-2 border-[oklch(0.4_0.05_160)] hover:bg-[oklch(0.4_0.05_160)]'
                  : 'bg-white text-[#1b4332] border-2 border-[#95d5b2] hover:bg-[#f0f9f4]'
            }`}
          >
            <Package className="w-5 h-5 inline mr-2" />
            Package Management
          </button>
          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'admins'
                  ? 'bg-[#52b788] text-white shadow-lg'
                  : darkMode
                    ? 'bg-[oklch(0.35_0.05_160)] text-[oklch(0.9_0.03_160)] border-2 border-[oklch(0.4_0.05_160)] hover:bg-[oklch(0.4_0.05_160)]'
                    : 'bg-white text-[#1b4332] border-2 border-[#95d5b2] hover:bg-[#f0f9f4]'
              }`}
            >
              <UserPlus className="w-5 h-5 inline mr-2" />
              Admin Management
            </button>
          )}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-[#52b788]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className={`text-sm mb-1 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#000000]'}`}>Total Sales</p>
                <p className={`text-2xl ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>RM {totalSales.toLocaleString()}</p>
              </div>

              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-[#52b788]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className={`text-sm mb-1 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#000000]'}`}>Total Bookings</p>
                <p className={`text-2xl ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>{totalBookings}</p>
              </div>

              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-8 h-8 text-[#52b788]" />
                  <Eye className="w-5 h-5 text-[#52b788]" />
                </div>
                <p className={`text-sm mb-1 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#000000]'}`}>Top Destination</p>
                <p className={`text-xl ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Semporna</p>
              </div>

              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-8 h-8 text-[#52b788]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className={`text-sm mb-1 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#000000]'}`}>Avg Satisfaction</p>
                <p className={`text-2xl ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>{avgSatisfaction}/5</p>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend */}
              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Sales Trend (6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#95d5b2" />
                    <XAxis dataKey="month" stroke={darkMode ? '#c0c0c0' : '#000000'} />
                    <YAxis stroke={darkMode ? '#c0c0c0' : '#000000'} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#52b788" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Booking Trend */}
              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Booking Trend (6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#95d5b2" />
                    <XAxis dataKey="month" stroke={darkMode ? '#c0c0c0' : '#000000'} />
                    <YAxis stroke={darkMode ? '#c0c0c0' : '#000000'} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" fill="#52b788" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tourism Hot Spots */}
              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Tourism Hot Spots</h3>
                <div className="space-y-3">
                  {hotSpotData.map((spot, index) => (
                    <div key={spot.name} className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#f0f9f4]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#52b788] text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}>{spot.name}</p>
                          <p className={`text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>{spot.visitors} visitors</p>
                        </div>
                      </div>
                      <p className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}>RM {spot.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className={`rounded-xl p-6 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}>
                <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Customer Satisfaction</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.rating}: ${entry.count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Analysis Report */}
            <div className={`rounded-xl p-6 shadow-xl border-2 ${
              darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
            }`}>
              <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>AI-Powered Business Insights</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-l-4 border-[#52b788] ${
                  darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#d8f3dc]'
                }`}>
                  <p className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}><strong>Trend Analysis:</strong></p>
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>Sales have increased by 84% over the last 6 months, with peak demand in June. The upward trend suggests strong market interest in adventure tourism.</p>
                </div>
                <div className={`p-4 rounded-lg border-l-4 border-[#52b788] ${
                  darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#d8f3dc]'
                }`}>
                  <p className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}><strong>Top Performer:</strong></p>
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>Semporna Islands packages generate the highest revenue (RM 562,000) with 312 visitors, indicating strong market demand for diving and island experiences.</p>
                </div>
                <div className={`p-4 rounded-lg border-l-4 border-[#52b788] ${
                  darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#d8f3dc]'
                }`}>
                  <p className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}><strong>Satisfaction Insight:</strong></p>
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>55% of customers rate their experience 5 stars (312 reviews), with 89% positive ratings overall. Consider promoting high-rated packages more aggressively.</p>
                </div>
                <div className={`p-4 rounded-lg border-l-4 border-[#40916c] ${
                  darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#d8f3dc]'
                }`}>
                  <p className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}><strong>Recommendation:</strong></p>
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>Focus marketing efforts on diving packages during peak season (May-June). Consider expanding capacity for Semporna tours to meet growing demand.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Package Management Tab */}
        {activeTab === 'packages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}>Tour Package Management</h2>
              <button
                onClick={handleAddPackage}
                className="px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-all shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Package
              </button>
            </div>

            <div className={`rounded-xl shadow-xl border-2 overflow-hidden ${
              darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
            }`}>
              <table className="w-full">
                <thead className={darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#f0f9f4]'}>
                  <tr>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Package Name</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Location</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Price</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Duration</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Max Pax</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Status</th>
                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className={darkMode ? 'border-b border-[oklch(0.4_0.05_160)]' : 'border-b border-[#d8f3dc]'}>
                      <td className={`py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>{pkg.name}</td>
                      <td className={`py-4 px-6 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{pkg.location}</td>
                      <td className={`py-4 px-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>RM {pkg.price}</td>
                      <td className={`py-4 px-6 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{pkg.duration}</td>
                      <td className={`py-4 px-6 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{pkg.maxPax}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-[#b7e4c7] text-[#1b4332] rounded-full text-sm">
                          {pkg.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPackage(pkg)}
                            className="p-2 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-2 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin Management Tab (SuperAdmin Only) */}
        {activeTab === 'admins' && isSuperAdmin && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}>Admin Management</h2>
              <button
                onClick={() => setShowAdminModal(true)}
                className="px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-all shadow-lg flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Register New Admin
              </button>
            </div>

            <div className={`rounded-xl p-8 shadow-xl border-2 ${
              darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <UserPlus className="w-12 h-12 text-[#52b788]" />
                <div>
                  <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>SuperAdmin Privileges</h3>
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>
                    As SuperAdmin, you can register new admin accounts to help manage the platform.
                  </p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border-l-4 border-[#52b788] ${
                darkMode ? 'bg-[oklch(0.4_0.05_160)]' : 'bg-[#d8f3dc]'
              }`}>
                <p className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}><strong>Current Registered Admins:</strong></p>
                <ul className={`list-disc list-inside space-y-1 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>
                  <li>SuperAdmin (You)</li>
                  <li>AdminUser1</li>
                  <li>AdminUser2</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Package Modal (Add/Edit) */}
        {showPackageModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl border-2 ${
              darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
            }`}>
              <h3 className={`mb-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Package Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    defaultValue={editingPackage?.name}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Location</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    defaultValue={editingPackage?.location}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Price (RM)</label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    defaultValue={editingPackage?.price}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Duration</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    defaultValue={editingPackage?.duration}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors">
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="px-6 py-3 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Registration Modal (SuperAdmin Only) */}
        {showAdminModal && isSuperAdmin && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl max-w-md w-full p-8 relative shadow-2xl border-2 ${
              darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
            }`}>
              <h3 className={`mb-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#000000]'}`}>Register New Admin</h3>
              <form onSubmit={handleRegisterAdmin} className="space-y-4">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Username</label>
                  <input
                    type="text"
                    value={newAdminData.username}
                    onChange={(e) => setNewAdminData({ ...newAdminData, username: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Password</label>
                  <input
                    type="password"
                    value={newAdminData.password}
                    onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Confirm Password</label>
                  <input
                    type="password"
                    value={newAdminData.confirmPassword}
                    onChange={(e) => setNewAdminData({ ...newAdminData, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
                  >
                    Register Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminModal(false);
                      setNewAdminData({ username: '', password: '', confirmPassword: '' });
                    }}
                    className="flex-1 px-6 py-3 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
