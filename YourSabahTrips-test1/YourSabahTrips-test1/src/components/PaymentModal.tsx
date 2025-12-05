import { X, CreditCard, Calendar, Users, DollarSign, Shield, Check, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PaymentModalProps {
  packageData: any;
  onClose: () => void;
  onSuccess: () => void;
  darkMode?: boolean;
}

interface Schedule {
  ScheduleId: number;
  ScheduleTime: string;
  AvailableSlots: number;
}

export function PaymentModal({ packageData, onClose, onSuccess, darkMode = false }: PaymentModalProps) {
  const [step, setStep] = useState<'booking' | 'payment' | 'success'>('booking');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    numPax: 1,
    travelDate: '',
    scheduleId: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit_card'
  });

  const totalAmount = packageData.price * bookingData.numPax;
  const serviceFee = totalAmount * 0.05; // 5% service fee
  const grandTotal = totalAmount + serviceFee;

  const fetchSchedules = async (pkgId: any) => {
    setLoadingSchedules(true);
    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost/YourSabahTrips-test1/YourSabahTrips-test1/api/bookings/get-schedules.php?packageId=${pkgId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSchedules(data.data);
        if (data.data.length > 0) {
          setBookingData((prev) => ({ ...prev, scheduleId: data.data[0].ScheduleId.toString() }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch schedules:', err);
      setErrorMessage('Failed to load schedules. Please try again later.');
    } finally {
      setLoadingSchedules(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    // Validate selected schedule has enough slots
    const selected = schedules.find(s => s.ScheduleId.toString() === bookingData.scheduleId);
    if (!selected) {
      setErrorMessage('Please select a valid schedule.');
      return;
    }
    if (selected.AvailableSlots < bookingData.numPax) {
      setErrorMessage(`Selected schedule only has ${selected.AvailableSlots} slots available.`);
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // Prepare payload
    const bookingPayload = {
      packageId: packageData.id,
      scheduleId: parseInt(bookingData.scheduleId),
      travelDate: bookingData.travelDate,
      numPax: bookingData.numPax
    };

    try {
      // Mock payment processing delay
      await new Promise((r) => setTimeout(r, 800));

      const res = await fetch('http://localhost/YourSabahTrips-test1/YourSabahTrips-test1/api/bookings/create-booking.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        // Handle specific error codes
        if (res.status === 409) {
          setErrorMessage(data.message || 'Not enough slots available.');
          // Refresh schedules to show updated availability
          await fetchSchedules(packageData.id);
          setStep('booking');
        } else {
          setErrorMessage(data.message || 'Booking failed. Please try again.');
        }
        return;
      }

      // On success, refresh schedules to reflect decremented slots
      await fetchSchedules(packageData.id);

      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err);
      setErrorMessage('Booking failed due to a network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set default scheduleId when package data is provided
  useEffect(() => {
    if (packageData && packageData.id) {
      fetchSchedules(packageData.id);
    }
  }, [packageData]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto ${darkMode ? 'bg-black/80' : 'bg-black/70'}`}>
      <div className={`rounded-2xl max-w-4xl w-full my-8 shadow-2xl border-2 ${
        darkMode
          ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]'
          : 'bg-white border-[#95d5b2]'
      }`}>
        {/* Header */}
        <div className="bg-[#52b788] p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-[#d8f3dc] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-white">
            {step === 'booking' && 'Booking Details'}
            {step === 'payment' && 'Payment Information'}
            {step === 'success' && 'Booking Confirmed!'}
          </h2>
          <p className="text-[#d8f3dc] mt-2">{packageData.name}</p>
        </div>

        <div className={`p-8 ${darkMode ? 'bg-[oklch(0.35_0.05_160)]' : 'bg-white'}`}>
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'booking' ? 'text-[#52b788]' : darkMode ? 'text-[oklch(0.6_0.03_160)]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'booking' ? 'bg-[#52b788] text-white' : darkMode ? 'bg-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  1
                </div>
                <span className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Booking</span>
              </div>
              <div className={`w-16 h-1 ${darkMode ? 'bg-[oklch(0.45_0.05_160)]' : 'bg-[#d8f3dc]'}`}></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#52b788]' : darkMode ? 'text-[oklch(0.6_0.03_160)]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' || step === 'success' ? 'bg-[#52b788] text-white' : darkMode ? 'bg-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  2
                </div>
                <span className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Payment</span>
              </div>
              <div className={`w-16 h-1 ${darkMode ? 'bg-[oklch(0.45_0.05_160)]' : 'bg-[#d8f3dc]'}`}></div>
              <div className={`flex items-center gap-2 ${step === 'success' ? 'text-[#52b788]' : darkMode ? 'text-[oklch(0.6_0.03_160)]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'success' ? 'bg-[#52b788] text-white' : darkMode ? 'bg-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  3
                </div>
                <span className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Confirm</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          {step === 'booking' && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 rounded mb-2 bg-red-100 text-red-800 border border-red-200">
                  {errorMessage}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Travelers *
                  </label>
                  <select
                    value={bookingData.numPax}
                    onChange={(e) => setBookingData({ ...bookingData, numPax: parseInt(e.target.value) })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required
                  >
                    {[...Array(packageData.maxPax)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.travelDate}
                    onChange={(e) => setBookingData({ ...bookingData, travelDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Schedule *
                  </label>
                  {loadingSchedules ? (
                    <div className={`w-full px-4 py-3 border rounded-lg ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}>
                      Loading schedules...
                    </div>
                  ) : (
                    <select
                      value={bookingData.scheduleId}
                      onChange={(e) => setBookingData({ ...bookingData, scheduleId: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                        darkMode
                          ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                          : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                      }`}
                      required
                    >
                      <option value="">Choose a time slot</option>
                      {schedules.length > 0 ? (
                        schedules.map((schedule) => (
                          <option key={schedule.ScheduleId} value={schedule.ScheduleId.toString()}>
                            {schedule.ScheduleTime} ({schedule.AvailableSlots} slots available)
                          </option>
                        ))
                      ) : (
                        <option value="">No schedules available</option>
                      )}
                    </select>
                  )}
                </div>
              </div>

              {/* Price Summary */}
              <div className={`rounded-xl p-6 border-2 ${
                darkMode
                  ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)]'
                  : 'bg-[#f0f9f4] border-[#95d5b2]'
              }`}>
                <h4 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Price Summary</h4>
                <div className="space-y-2">
                  <div className={`flex justify-between ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                    <span>Package Price (RM {packageData.price} × {bookingData.numPax})</span>
                    <span>RM {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                    <span>Service Fee (5%)</span>
                    <span>RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className={`border-t-2 pt-2 mt-2 ${darkMode ? 'border-[oklch(0.45_0.05_160)]' : 'border-[#95d5b2]'}`}>
                    <div className={`flex justify-between ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                      <strong>Total Amount</strong>
                      <strong>RM {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingSchedules || isSubmitting}
                className={`w-full px-6 py-4 rounded-lg transition-all shadow-lg ${loadingSchedules || isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#52b788] text-white hover:bg-[#40916c]'}`}
              >
                {isSubmitting ? 'Please wait...' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className={`block mb-3 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'credit_card' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'credit_card'
                        ? darkMode
                          ? 'border-[#52b788] bg-[oklch(0.4_0.05_160)]'
                          : 'border-[#52b788] bg-[#f0f9f4]'
                        : darkMode
                          ? 'border-[oklch(0.45_0.05_160)] bg-[oklch(0.35_0.05_160)]'
                          : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className={`text-sm ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Credit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'debit_card' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'debit_card'
                        ? darkMode
                          ? 'border-[#52b788] bg-[oklch(0.4_0.05_160)]'
                          : 'border-[#52b788] bg-[#f0f9f4]'
                        : darkMode
                          ? 'border-[oklch(0.45_0.05_160)] bg-[oklch(0.35_0.05_160)]'
                          : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className={`text-sm ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Debit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'online_banking' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'online_banking'
                        ? darkMode
                          ? 'border-[#52b788] bg-[oklch(0.4_0.05_160)]'
                          : 'border-[#52b788] bg-[#f0f9f4]'
                        : darkMode
                          ? 'border-[oklch(0.45_0.05_160)] bg-[oklch(0.35_0.05_160)]'
                          : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className={`text-sm ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Online Banking</p>
                  </button>
                </div>
              </div>

              {(paymentData.paymentMethod === 'credit_card' || paymentData.paymentMethod === 'debit_card') && (
                <>
                  <div>
                    <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Card Number *</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                        darkMode
                          ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                          : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Cardholder Name *</label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                        darkMode
                          ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                          : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                      }`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                          darkMode
                            ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                            : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>CVV *</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                          darkMode
                            ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]'
                            : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                        }`}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Security Notice */}
              <div className={`rounded-lg p-4 flex items-start gap-3 ${
                darkMode
                  ? 'bg-[oklch(0.4_0.05_160)] border border-[oklch(0.45_0.05_160)]'
                  : 'bg-[#d8f3dc]'
              }`}>
                <Shield className="w-5 h-5 text-[#52b788] flex-shrink-0 mt-1" />
                <div className={`text-sm ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>
                  <p className="mb-1"><strong>Secure Payment</strong></p>
                  <p className={darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}>Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
                </div>
              </div>

              {/* Total */}
              <div className={`rounded-xl p-4 border-2 ${
                darkMode
                  ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)]'
                  : 'bg-[#f0f9f4] border-[#95d5b2]'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Total to Pay</span>
                  <span className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>RM {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('booking')}
                  className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                    darkMode
                      ? 'bg-[oklch(0.35_0.05_160)] text-[oklch(0.9_0.03_160)] border-[oklch(0.45_0.05_160)] hover:bg-[oklch(0.4_0.05_160)]'
                      : 'bg-white text-[#1b4332] border-[#95d5b2] hover:bg-[#f0f9f4]'
                  }`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-4 rounded-lg transition-all shadow-lg ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#52b788] text-white hover:bg-[#40916c]'}`}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Payment'}
                </button>
              </div>
            </form>
          )}

          {/* Success Screen */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#52b788] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-[#1b4332] mb-4">Booking Confirmed!</h3>
              <p className="text-[#2d6a4f] mb-6 max-w-md mx-auto">
                Your booking has been confirmed. A confirmation email has been sent to your registered email address.
              </p>
              <div className="bg-[#f0f9f4] rounded-xl p-6 border-2 border-[#95d5b2] mb-6">
                <p className="text-[#2d6a4f] mb-2">Travel</p>
                <p className="text-[#1b4332]">
                  {bookingData.travelDate} 
                  {bookingData.scheduleId && schedules.length > 0 
                    ? ` at ${schedules.find(s => s.ScheduleId.toString() === bookingData.scheduleId)?.ScheduleTime}` 
                    : ''}
                </p>
                <div className="border-t border-[#95d5b2] mt-4 pt-4">
                  <p className="text-[#2d6a4f] mb-2">Booking Reference</p>
                  <p className="text-[#1b4332]">YST-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-all shadow-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}