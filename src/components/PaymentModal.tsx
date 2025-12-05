import { X, CreditCard, Calendar, Users, DollarSign, Shield, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  packageData: any;
  onClose: () => void;
  onSuccess: () => void;
  darkMode?: boolean;
}

export function PaymentModal({ packageData, onClose, onSuccess, darkMode = false }: PaymentModalProps) {
  const [step, setStep] = useState<'booking' | 'payment' | 'success'>('booking');
  const [bookingData, setBookingData] = useState({
    numPax: 1,
    travelDate: '',
    specialRequests: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit_card'
  });

  const totalAmount = (packageData.Price || packageData.price) * bookingData.numPax;
  const serviceFee = totalAmount * 0.05; // 5% service fee
  const grandTotal = totalAmount + serviceFee;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl border-2 border-[#95d5b2]">
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

        <div className="p-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'booking' ? 'text-[#52b788]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'booking' ? 'bg-[#52b788] text-white' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  1
                </div>
                <span className="text-[#1b4332]">Booking</span>
              </div>
              <div className="w-16 h-1 bg-[#d8f3dc]"></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#52b788]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' || step === 'success' ? 'bg-[#52b788] text-white' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  2
                </div>
                <span className="text-[#1b4332]">Payment</span>
              </div>
              <div className="w-16 h-1 bg-[#d8f3dc]"></div>
              <div className={`flex items-center gap-2 ${step === 'success' ? 'text-[#52b788]' : 'text-[#95d5b2]'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'success' ? 'bg-[#52b788] text-white' : 'bg-[#d8f3dc] text-[#1b4332]'}`}>
                  3
                </div>
                <span className="text-[#1b4332]">Confirm</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          {step === 'booking' && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1b4332] mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Travelers *
                  </label>
                  <select
                    value={bookingData.numPax}
                    onChange={(e) => setBookingData({ ...bookingData, numPax: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                    required
                  >
                    {[...Array(packageData.maxPax)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1b4332] mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.travelDate}
                    onChange={(e) => setBookingData({ ...bookingData, travelDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1b4332] mb-2">Special Requests (Optional)</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                  rows={4}
                  placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                />
              </div>

              {/* Price Summary */}
              <div className="bg-[#f0f9f4] rounded-xl p-6 border-2 border-[#95d5b2]">
                <h4 className="text-[#1b4332] mb-4">Price Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-[#2d6a4f]">
                    <span>Package Price (RM {packageData.price} × {bookingData.numPax})</span>
                    <span>RM {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#2d6a4f]">
                    <span>Service Fee (5%)</span>
                    <span>RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-[#95d5b2] pt-2 mt-2">
                    <div className="flex justify-between text-[#1b4332]">
                      <strong>Total Amount</strong>
                      <strong>RM {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-all shadow-lg"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-[#1b4332] mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'credit_card' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'credit_card'
                        ? 'border-[#52b788] bg-[#f0f9f4]'
                        : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className="text-[#1b4332] text-sm">Credit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'debit_card' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'debit_card'
                        ? 'border-[#52b788] bg-[#f0f9f4]'
                        : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className="text-[#1b4332] text-sm">Debit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'online_banking' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentData.paymentMethod === 'online_banking'
                        ? 'border-[#52b788] bg-[#f0f9f4]'
                        : 'border-[#95d5b2] bg-white'
                    }`}
                  >
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-[#52b788]" />
                    <p className="text-[#1b4332] text-sm">Online Banking</p>
                  </button>
                </div>
              </div>

              {(paymentData.paymentMethod === 'credit_card' || paymentData.paymentMethod === 'debit_card') && (
                <>
                  <div>
                    <label className="block text-[#1b4332] mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#1b4332] mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1b4332] mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#1b4332] mb-2">CVV *</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 bg-[#f0f9f4] border border-[#95d5b2] rounded-lg text-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Security Notice */}
              <div className="bg-[#d8f3dc] rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#52b788] flex-shrink-0 mt-1" />
                <div className="text-sm text-[#1b4332]">
                  <p className="mb-1"><strong>Secure Payment</strong></p>
                  <p className="text-[#2d6a4f]">Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
                </div>
              </div>

              {/* Total */}
              <div className="bg-[#f0f9f4] rounded-xl p-4 border-2 border-[#95d5b2]">
                <div className="flex justify-between items-center">
                  <span className="text-[#1b4332]">Total to Pay</span>
                  <span className="text-[#1b4332]">RM {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('booking')}
                  className="flex-1 px-6 py-4 bg-white text-[#1b4332] rounded-lg border-2 border-[#95d5b2] hover:bg-[#f0f9f4] transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-all shadow-lg"
                >
                  Complete Payment
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
                <p className="text-[#2d6a4f] mb-2">Booking Reference</p>
                <p className="text-[#1b4332]">YST-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
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