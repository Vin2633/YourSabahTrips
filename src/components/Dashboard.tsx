import { User, Calendar, DollarSign, Edit2, X, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  user: any;
  setUser: (user: any) => void;
  darkMode: boolean;
}

const mockBookings = [
  {
    id: 1,
    packageName: 'Mount Kinabalu Summit Trek',
    travelDate: '2025-12-15',
    status: 'Confirmed',
    totalCost: 1299,
    numPax: 2
  },
  {
    id: 2,
    packageName: 'Semporna Island Hopping & Diving',
    travelDate: '2026-01-20',
    status: 'Confirmed',
    totalCost: 1798,
    numPax: 2
  },
  {
    id: 3,
    packageName: 'Kinabatangan Wildlife Safari',
    travelDate: '2025-11-30',
    status: 'Completed',
    totalCost: 749,
    numPax: 1
  }
];

export function Dashboard({ user, setUser, darkMode }: DashboardProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bookings, setBookings] = useState(mockBookings);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNo: user.phoneNo
  });

  const handleProfileUpdate = () => {
    setUser({ ...user, ...editForm });
    setIsEditingProfile(false);
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'Cancellation Requested' }
        : booking
    ));
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Your account has been deleted. You will be logged out.');
      setUser(null);
      window.location.href = '/';
    }
    setShowDeleteModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-[#1b4332] bg-[#b7e4c7]';
      case 'Completed': return 'text-[#1b4332] bg-[#d8f3dc]';
      case 'Cancellation Requested': return 'text-[#2d6a4f] bg-[#f0f9f4]';
      default: return 'text-[#1b4332] bg-[#95d5b2]';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f0f9f4]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[#1b4332] mb-8">My Dashboard</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-xl border-2 border-[#95d5b2]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#52b788] rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-[#1b4332]">Profile Information</h2>
                <p className="text-[#2d6a4f]">User ID: {user.userId}</p>
              </div>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>First Name</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Last Name</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                    darkMode
                      ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                      : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                  }`}
                />
              </div>
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Phone Number</label>
                <input
                  type="tel"
                  value={editForm.phoneNo}
                  onChange={(e) => setEditForm({ ...editForm, phoneNo: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                    darkMode
                      ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                      : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                  }`}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleProfileUpdate}
                  className="flex items-center gap-2 px-6 py-2 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditingProfile(false);
                    setEditForm({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      phoneNo: user.phoneNo
                    });
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#2d6a4f] mb-1">Full Name</p>
                <p className="text-[#1b4332]">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="text-[#2d6a4f] mb-1">Email</p>
                <p className="text-[#1b4332]">{user.email}</p>
              </div>
              <div>
                <p className="text-[#2d6a4f] mb-1">Phone</p>
                <p className="text-[#1b4332]">{user.phoneNo}</p>
              </div>
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-[#95d5b2]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#52b788] rounded-full">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[#1b4332]">My Bookings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#95d5b2]">
                  <th className="text-left py-3 px-4 text-[#1b4332]">Package Name</th>
                  <th className="text-left py-3 px-4 text-[#1b4332]">Travel Date</th>
                  <th className="text-left py-3 px-4 text-[#1b4332]">Pax</th>
                  <th className="text-left py-3 px-4 text-[#1b4332]">Status</th>
                  <th className="text-left py-3 px-4 text-[#1b4332]">Total Cost</th>
                  <th className="text-left py-3 px-4 text-[#1b4332]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#d8f3dc]">
                    <td className="py-4 px-4 text-[#1b4332]">{booking.packageName}</td>
                    <td className="py-4 px-4 text-[#2d6a4f]">{booking.travelDate}</td>
                    <td className="py-4 px-4 text-[#2d6a4f]">{booking.numPax}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-[#1b4332]">
                        <DollarSign className="w-4 h-4" />
                        <span>RM {booking.totalCost.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-3 py-1 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-[#95d5b2] mx-auto mb-4" />
              <p className="text-[#2d6a4f]">No bookings yet. Start exploring our amazing tours!</p>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl p-6 mt-8 shadow-xl border-2 border-red-300">
          <h3 className="text-red-600 mb-4">Danger Zone</h3>
          <p className="text-[#2d6a4f] mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl border-2 border-red-300">
              <h3 className="text-red-600 mb-4">Confirm Account Deletion</h3>
              <p className="text-[#2d6a4f] mb-6">
                Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}