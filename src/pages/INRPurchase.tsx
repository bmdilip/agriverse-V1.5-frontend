import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Banknote, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  IndianRupee,
  Wallet,
  Clock,
  Award,
  TrendingUp,
  Lock,
  Smartphone,
  Building2,
  Globe
} from 'lucide-react';

const INRPurchase = () => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [step, setStep] = useState(1);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  
  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Instant payment via UPI',
      fee: '0%',
      time: 'Instant'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'Direct bank transfer',
      fee: '0.5%',
      time: '2-5 minutes'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
      fee: '2%',
      time: 'Instant'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, PhonePe, GPay',
      fee: '1%',
      time: 'Instant'
    }
  ];

  const conversionRate = 83.25; // INR to USD
  const usdAmount = (selectedAmount / conversionRate).toFixed(2);
  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);
  const feeAmount = selectedAmount * (parseFloat(selectedPaymentMethod?.fee || '0') / 100);
  const totalAmount = selectedAmount + feeAmount;

  const handlePurchase = () => {
    setStep(2);
    // Simulate payment processing
    setTimeout(() => {
      setStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">INR</span> Purchase
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Purchase AV tokens with Indian Rupees. Support for UPI, Net Banking, 
            Cards, and Digital Wallets.
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Amount Selection */}
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h2 className="text-2xl font-light text-agri-text mb-6">Select Amount</h2>
              
              {/* Predefined Amounts */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      selectedAmount === amount
                        ? 'border-agri-primary bg-agri-primary/10 text-agri-primary'
                        : 'border-agri-border bg-agri-secondary/20 text-agri-text hover:border-agri-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="font-medium">{amount.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-agri-text/70 mb-2">Custom Amount (INR)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
                  <input
                    type="number"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                    placeholder="Enter amount"
                    min="100"
                    max="100000"
                  />
                </div>
              </div>

              {/* Conversion Info */}
              <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-agri-text/70">INR Amount</span>
                  <span className="text-agri-text font-medium">₹{selectedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-agri-text/70">USD Equivalent</span>
                  <span className="text-agri-text font-medium">${usdAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-agri-text/70">AV Tokens</span>
                  <span className="text-agri-primary font-medium">{selectedAmount} AV</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h2 className="text-2xl font-light text-agri-text mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                      selectedMethod === method.id
                        ? 'border-agri-primary bg-agri-primary/10'
                        : 'border-agri-border bg-agri-secondary/20 hover:border-agri-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'bg-agri-primary/20 text-agri-primary'
                            : 'bg-agri-secondary text-agri-text/70'
                        }`}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className={`font-medium ${
                            selectedMethod === method.id ? 'text-agri-primary' : 'text-agri-text'
                          }`}>
                            {method.name}
                          </div>
                          <div className="text-agri-text/70 text-sm">{method.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-agri-accent text-sm font-medium">{method.fee} fee</div>
                        <div className="text-agri-text/70 text-xs">{method.time}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-8 bg-agri-secondary/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-agri-text mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Amount</span>
                    <span className="text-agri-text">₹{selectedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Processing Fee</span>
                    <span className="text-agri-text">₹{feeAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-agri-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-agri-text font-medium">Total</span>
                      <span className="text-agri-primary font-medium">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handlePurchase}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Payment
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-agri-card border border-agri-border rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-agri-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-light text-agri-text mb-4">Processing Payment</h2>
            <p className="text-agri-text/70 mb-6">
              Please complete the payment on your {selectedPaymentMethod?.name} app or browser.
            </p>
            <div className="bg-agri-secondary/20 rounded-lg p-4">
              <div className="text-agri-primary font-medium text-lg">₹{totalAmount.toFixed(2)}</div>
              <div className="text-agri-text/70 text-sm">via {selectedPaymentMethod?.name}</div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-agri-card border border-agri-border rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-agri-primary" />
            </div>
            <h2 className="text-2xl font-light text-agri-text mb-4">Payment Successful!</h2>
            <p className="text-agri-text/70 mb-6">
              Your AV tokens have been added to your wallet.
            </p>
            <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-lg p-4 mb-6">
              <div className="text-agri-primary font-medium text-xl">{selectedAmount} AV Tokens</div>
              <div className="text-agri-text/70 text-sm">Added to your wallet</div>
            </div>
            <motion.button
              onClick={() => setStep(1)}
              className="w-full px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Make Another Purchase
            </motion.button>
          </motion.div>
        )}

        {/* Features Section */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Secure Payments</h3>
              <p className="text-agri-text/70 font-light">
                Bank-grade security with encrypted transactions and fraud protection.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Instant Processing</h3>
              <p className="text-agri-text/70 font-light">
                Most payments are processed instantly with immediate token delivery.
              </p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Best Rates</h3>
              <p className="text-agri-text/70 font-light">
                Competitive exchange rates with transparent fee structure.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default INRPurchase;