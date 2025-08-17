import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Calendar, 
  Clock, 
  MapPin, 
  Bone as Drone, 
  Video, 
  Eye, 
  Star, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  Settings,
  Lock,
  DollarSign,
  TreePine,
  Leaf,
  Globe,
  Target,
  Users,
  Award
} from 'lucide-react';

const FarmLive = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState('drone');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const availableFarms = [
    {
      id: 1,
      name: "Organic Wheat Farm #127",
      location: "Punjab, India",
      type: "AgriYield",
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
      cameras: ['drone', 'dome', 'ground', 'vr360'],
      liveNow: true,
      rating: 4.8,
      bookings: 156,
      description: "Premium organic wheat cultivation with 24/7 monitoring",
      coordinates: { lat: 30.7333, lng: 76.7794 },
      userOwnsAsset: true,
      assetValue: 2500
    },
    {
      id: 2,
      name: "Teak Forest Plantation #89",
      location: "Kerala, India",
      type: "AgriFarms",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
      cameras: ['drone', 'dome', 'vr360'],
      liveNow: false,
      rating: 4.9,
      bookings: 89,
      description: "Sustainable teak plantation with aerial monitoring",
      coordinates: { lat: 10.8505, lng: 76.2711 },
      userOwnsAsset: true,
      assetValue: 5000
    },
    {
      id: 3,
      name: "Mango Orchard Estate #456",
      location: "Maharashtra, India",
      type: "AgriFarms",
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400",
      cameras: ['drone', 'ground', 'vr360'],
      liveNow: true,
      rating: 4.7,
      bookings: 234,
      description: "Premium mango orchard with fruit monitoring system",
      coordinates: { lat: 19.7515, lng: 75.7139 },
      userOwnsAsset: false,
      assetValue: 0
    },
    {
      id: 4,
      name: "Premium Dairy Cattle Farm",
      location: "Gujarat, India",
      type: "Livestock",
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400",
      cameras: ['drone', 'dome', 'ground'],
      liveNow: true,
      rating: 4.6,
      bookings: 178,
      description: "Premium dairy cattle with health monitoring",
      coordinates: { lat: 23.0225, lng: 72.5714 },
      userOwnsAsset: true,
      assetValue: 1800
    }
  ];

  const cameraTypes = [
    {
      id: 'drone',
      name: 'Drone Camera',
      icon: Drone,
      description: 'Aerial view with 360° rotation',
      features: ['4K Resolution', '360° View', 'Zoom 10x', 'Night Vision'],
      price: '50 AV/hour'
    },
    {
      id: 'dome',
      name: 'Dome Camera',
      icon: Video,
      description: 'Fixed dome with pan/tilt control',
      features: ['HD Resolution', 'Pan/Tilt', 'Zoom 5x', 'Weather Resistant'],
      price: '30 AV/hour'
    },
    {
      id: 'ground',
      name: 'Ground Camera',
      icon: Camera,
      description: 'Ground-level fixed position',
      features: ['HD Resolution', 'Fixed View', 'Zoom 3x', 'Motion Detection'],
      price: '20 AV/hour'
    },
    {
      id: 'vr360',
      name: '360° VR Camera',
      icon: Globe,
      description: 'Immersive 360° virtual reality experience',
      features: ['4K 360° Video', 'VR Headset Compatible', 'Immersive Audio', 'Real-time Streaming'],
      price: '75 AV/hour'
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const userTotalAssets = 9300; // Total value of user's assets
  const requiredAssetValue = 2000; // Required minimum asset value
  const canBook = userTotalAssets >= requiredAssetValue;

  const handleBookLiveNow = () => {
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleBooking = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    } else {
      // Complete booking
      alert('Booking confirmed! You will receive access details shortly.');
      setShowBookingModal(false);
      setBookingStep(1);
    }
  };

  const LiveStreamPlayer = ({ farm }) => (
    <div className="bg-agri-dark rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-agri-secondary/20">
        <img 
          src={farm.image} 
          alt={farm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-agri-dark/40 flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-agri-primary mx-auto mb-4" />
            <p className="text-agri-text">Live Stream Placeholder</p>
            <p className="text-agri-text/70 text-sm">Click to start viewing</p>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-medium">LIVE</span>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-agri-dark/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="p-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-agri-card border border-agri-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-light text-agri-text">📡 FarmLive Booking System</h2>
            <button
              onClick={() => setShowBookingModal(false)}
              className="text-agri-text/70 hover:text-agri-text"
            >
              ✕
            </button>
          </div>

          {/* Asset Eligibility Check */}
          <div className={`mb-8 p-6 rounded-2xl border ${
            canBook 
              ? 'bg-agri-primary/10 border-agri-primary/20' 
              : 'bg-agri-accent/10 border-agri-accent/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {canBook ? (
                  <CheckCircle className="w-6 h-6 text-agri-primary" />
                ) : (
                  <Lock className="w-6 h-6 text-agri-accent" />
                )}
                <div>
                  <h3 className={`text-lg font-medium ${canBook ? 'text-agri-primary' : 'text-agri-accent'}`}>
                    {canBook ? 'FarmLive Access Enabled' : 'Asset Requirement Not Met'}
                  </h3>
                  <p className="text-agri-text/70">
                    {canBook 
                      ? `You own $${userTotalAssets.toLocaleString()} in assets (Required: $${requiredAssetValue.toLocaleString()})`
                      : `You need at least $${requiredAssetValue.toLocaleString()} of assets to unlock real-time view. Current: $${userTotalAssets.toLocaleString()}`
                    }
                  </p>
                </div>
              </div>
              {!canBook && (
                <button className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors">
                  Buy AV Tokens
                </button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[
              { step: 1, title: 'Select Farm', icon: MapPin },
              { step: 2, title: 'Choose Camera', icon: Camera },
              { step: 3, title: 'Pick Time', icon: Clock },
              { step: 4, title: 'Confirm', icon: CheckCircle }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  bookingStep >= item.step 
                    ? 'border-agri-primary bg-agri-primary/20 text-agri-primary' 
                    : 'border-agri-border bg-agri-secondary/20 text-agri-text/50'
                }`}>
                  {bookingStep > item.step ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <item.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`font-medium ${bookingStep >= item.step ? 'text-agri-text' : 'text-agri-text/50'}`}>
                    {item.title}
                  </div>
                </div>
                {index < 3 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-4 ${
                    bookingStep > item.step ? 'bg-agri-primary' : 'bg-agri-border'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className={`${!canBook ? 'filter blur-sm pointer-events-none' : ''}`}>
            {bookingStep === 1 && (
              <div>
                <h3 className="text-2xl font-light text-agri-text mb-6">🗺 Select Farm Location</h3>
                
                {/* Interactive Map Placeholder */}
                <div className="bg-agri-secondary/20 border border-agri-border rounded-xl h-64 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-agri-primary/5 to-agri-accent/5" />
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-agri-primary mx-auto mb-4" />
                      <p className="text-agri-text/70">Interactive Map View</p>
                      <p className="text-agri-text/50 text-sm mt-2">Click farm pins to select location</p>
                    </div>
                  </div>
                  
                  {/* Farm Pins */}
                  {availableFarms.map((farm, idx) => (
                    <button
                      key={farm.id}
                      onClick={() => setSelectedFarm(farm)}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedFarm?.id === farm.id
                          ? 'bg-agri-primary text-agri-dark scale-125'
                          : farm.userOwnsAsset
                            ? 'bg-agri-primary/20 text-agri-primary hover:scale-110'
                            : 'bg-agri-secondary/50 text-agri-text/50'
                      }`}
                      style={{
                        top: `${20 + idx * 15}%`,
                        left: `${25 + idx * 20}%`
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Farm Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableFarms.map((farm) => (
                    <button
                      key={farm.id}
                      onClick={() => setSelectedFarm(farm)}
                      className={`p-6 border rounded-xl transition-all duration-300 text-left ${
                        selectedFarm?.id === farm.id
                          ? 'border-agri-primary bg-agri-primary/10'
                          : farm.userOwnsAsset
                            ? 'border-agri-border hover:border-agri-primary/50'
                            : 'border-agri-border opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!farm.userOwnsAsset}
                    >
                      <div className="flex items-start space-x-4">
                        <img 
                          src={farm.image} 
                          alt={farm.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-medium text-agri-text">{farm.name}</h4>
                            {farm.userOwnsAsset ? (
                              <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
                                Owned
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-agri-secondary/50 text-agri-text/70 rounded-full text-xs">
                                Not Owned
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-agri-text/70 text-sm mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {farm.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-agri-accent" />
                              <span className="text-agri-text">{farm.rating}</span>
                            </div>
                            {farm.userOwnsAsset && (
                              <div className="text-agri-primary text-sm font-medium">
                                ${farm.assetValue.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 2 && selectedFarm && (
              <div>
                <h3 className="text-2xl font-light text-agri-text mb-6">🎥 Select Camera Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cameraTypes.filter(camera => selectedFarm.cameras.includes(camera.id)).map((camera) => (
                    <button
                      key={camera.id}
                      onClick={() => setSelectedCamera(camera.id)}
                      className={`p-6 border rounded-xl transition-all duration-300 text-left ${
                        selectedCamera === camera.id
                          ? 'border-agri-primary bg-agri-primary/10'
                          : 'border-agri-border hover:border-agri-primary/50'
                      }`}
                    >
                      <camera.icon className={`w-8 h-8 mb-4 ${
                        selectedCamera === camera.id ? 'text-agri-primary' : 'text-agri-text/70'
                      }`} />
                      <h4 className="text-lg font-medium text-agri-text mb-2">{camera.name}</h4>
                      <p className="text-agri-text/70 text-sm mb-4">{camera.description}</p>
                      
                      {camera.id === 'vr360' && (
                        <div className="bg-agri-accent/10 border border-agri-accent/20 rounded-lg p-3 mb-4">
                          <div className="text-agri-accent text-sm font-medium">🥽 VR Experience</div>
                          <div className="text-agri-text/70 text-xs mt-1">Compatible with VR headsets</div>
                        </div>
                      )}
                      
                      <div className="space-y-1 mb-4">
                        {camera.features.map((feature, idx) => (
                          <div key={idx} className="text-agri-text/60 text-xs">• {feature}</div>
                        ))}
                      </div>
                      <div className="text-agri-primary font-medium">{camera.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <h3 className="text-2xl font-light text-agri-text mb-6">📅 Pick Date & Time</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-agri-text mb-4">Select Date</h4>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-agri-text mb-4">Select Time Slot</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border rounded-lg transition-all duration-300 ${
                            selectedTime === time
                              ? 'border-agri-primary bg-agri-primary/10 text-agri-primary'
                              : 'border-agri-border text-agri-text hover:border-agri-primary/50'
                          }`}
                        >
                          <div className="font-medium">{time}</div>
                          <div className="text-xs text-agri-text/70 mt-1">Available</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div>
                <h3 className="text-2xl font-light text-agri-text mb-6">✅ Confirm Booking</h3>
                <div className="bg-agri-secondary/20 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-agri-text mb-4">Booking Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-agri-text/70">Farm</span>
                          <span className="text-agri-text">{selectedFarm?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-agri-text/70">Camera Type</span>
                          <span className="text-agri-text">{cameraTypes.find(c => c.id === selectedCamera)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-agri-text/70">Date</span>
                          <span className="text-agri-text">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-agri-text/70">Time</span>
                          <span className="text-agri-text">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between border-t border-agri-border pt-3">
                          <span className="text-agri-text font-medium">Total Cost</span>
                          <span className="text-agri-primary font-medium">
                            {cameraTypes.find(c => c.id === selectedCamera)?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-agri-text mb-4">Asset Verification</h4>
                      <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <CheckCircle className="w-5 h-5 text-agri-primary" />
                          <div>
                            <div className="text-agri-text font-medium">Asset Ownership Verified</div>
                            <div className="text-agri-text/70 text-sm">You own {selectedFarm?.name}</div>
                          </div>
                        </div>
                        <div className="text-agri-primary font-medium">${selectedFarm?.assetValue.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Locked State Overlay */}
          {!canBook && (
            <div className="absolute inset-0 flex items-center justify-center bg-agri-dark/50 backdrop-blur-sm rounded-2xl">
              <div className="text-center p-8">
                <Lock className="w-16 h-16 text-agri-accent mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-agri-text mb-4">Asset Requirement Not Met</h3>
                <p className="text-agri-text/70 mb-6 max-w-md">
                  You need at least $2,000 of assets to unlock real-time farm monitoring.
                </p>
                <button className="px-8 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors">
                  Buy AV Tokens
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setBookingStep(Math.max(1, bookingStep - 1))}
              disabled={bookingStep === 1}
              className="px-6 py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleBooking}
              disabled={
                !canBook ||
                (bookingStep === 1 && !selectedFarm) ||
                (bookingStep === 2 && !selectedCamera) ||
                (bookingStep === 3 && (!selectedDate || !selectedTime))
              }
              className="px-8 py-3 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingStep === 4 ? 'Confirm Booking' : 'Next Step'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">FarmLive</span> Monitoring
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Book live camera access to monitor your farm investments in real-time. 
            Watch your crops grow with drone, dome, ground-level, and VR 360° cameras.
          </p>
        </motion.div>

        {/* Asset Eligibility Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mb-8 p-6 rounded-2xl border ${
            canBook 
              ? 'bg-agri-primary/10 border-agri-primary/20' 
              : 'bg-agri-accent/10 border-agri-accent/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {canBook ? (
                <CheckCircle className="w-6 h-6 text-agri-primary" />
              ) : (
                <AlertCircle className="w-6 h-6 text-agri-accent" />
              )}
              <div>
                <h3 className={`text-lg font-medium ${canBook ? 'text-agri-primary' : 'text-agri-accent'}`}>
                  {canBook ? 'FarmLive Access Enabled' : 'Asset Requirement Not Met'}
                </h3>
                <p className="text-agri-text/70">
                  {canBook 
                    ? `You own $${userTotalAssets.toLocaleString()} in assets (Required: $${requiredAssetValue.toLocaleString()})`
                    : `You need at least $${requiredAssetValue.toLocaleString()} of assets to access FarmLive booking`
                  }
                </p>
              </div>
            </div>
            {!canBook && (
              <button className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors">
                Buy Assets
              </button>
            )}
          </div>
        </motion.div>

        {/* Live Farms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-light text-agri-text">Available Farms</h2>
            <motion.button
              onClick={handleBookLiveNow}
              className={`px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                canBook
                  ? 'bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark hover:shadow-lg hover:shadow-agri-primary/25'
                  : 'bg-agri-secondary/50 text-agri-text/50 cursor-not-allowed'
              }`}
              whileHover={canBook ? { scale: 1.02 } : {}}
              whileTap={canBook ? { scale: 0.98 } : {}}
              disabled={!canBook}
            >
              📡 Book Live Now
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableFarms.map((farm, index) => (
              <motion.div
                key={farm.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={farm.image} 
                    alt={farm.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs font-medium">
                        {farm.type}
                      </span>
                      {farm.userOwnsAsset && (
                        <span className="px-3 py-1 bg-agri-accent/20 text-agri-accent rounded-full text-xs font-medium">
                          Owned
                        </span>
                      )}
                    </div>
                    {farm.liveNow && (
                      <div className="flex items-center space-x-1 bg-red-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-xs font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-agri-text font-medium text-lg mb-1">{farm.name}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-agri-text/70 text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {farm.location}
                      </div>
                      {farm.userOwnsAsset && (
                        <div className="text-agri-primary text-sm font-medium">
                          ${farm.assetValue.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-agri-text/70 font-light mb-4">{farm.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-agri-accent" />
                      <span className="text-agri-text">{farm.rating}</span>
                      <span className="text-agri-text/70 text-sm">({farm.bookings} bookings)</span>
                    </div>
                    <div className="flex space-x-1">
                      {farm.cameras.map((camera) => {
                        const CameraIcon = cameraTypes.find(c => c.id === camera)?.icon || Camera;
                        return (
                          <div key={camera} className="w-6 h-6 bg-agri-primary/20 rounded text-agri-primary flex items-center justify-center">
                            <CameraIcon className="w-3 h-3" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (farm.liveNow && farm.userOwnsAsset) {
                        setSelectedFarm(farm);
                      } else {
                        handleBookLiveNow();
                      }
                    }}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      farm.liveNow && farm.userOwnsAsset
                        ? 'bg-agri-primary text-agri-dark hover:bg-agri-primary/90'
                        : farm.userOwnsAsset
                          ? 'bg-agri-accent/20 border border-agri-accent text-agri-accent hover:bg-agri-accent/30'
                          : 'bg-agri-secondary/50 text-agri-text/50 cursor-not-allowed'
                    }`}
                    disabled={!farm.userOwnsAsset}
                  >
                    {farm.liveNow && farm.userOwnsAsset ? 'Watch Live' : 
                     farm.userOwnsAsset ? 'Book Session' : 
                     'Asset Required'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Drone className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Drone Monitoring</h3>
              <p className="text-agri-text/70 font-light">
                Aerial 4K footage with 360° rotation and 10x zoom capabilities.
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">VR 360° Experience</h3>
              <p className="text-agri-text/70 font-light">
                Immersive virtual reality experience compatible with VR headsets.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Asset Verification</h3>
              <p className="text-agri-text/70 font-light">
                Only verified asset owners can access live monitoring feeds.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">24/7 Access</h3>
              <p className="text-agri-text/70 font-light">
                Book monitoring sessions anytime with flexible scheduling.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Stream Modal */}
      {selectedFarm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-agri-card border border-agri-border rounded-2xl max-w-4xl w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-agri-text">{selectedFarm.name}</h2>
                <button
                  onClick={() => setSelectedFarm(null)}
                  className="text-agri-text/70 hover:text-agri-text"
                >
                  ✕
                </button>
              </div>
              <LiveStreamPlayer farm={selectedFarm} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default FarmLive;