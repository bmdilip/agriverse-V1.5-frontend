import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Download, 
  Bell, 
  BellOff, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarCheck,
  ExternalLink
} from 'lucide-react';

const ROICalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Sample ROI events
  const roiEvents = [
    {
      id: 1,
      title: "Organic Wheat Farm #127",
      date: new Date(2025, 0, 15),
      amount: "$450",
      type: "AgriYield",
      status: "upcoming",
      reminderSet: true
    },
    {
      id: 2,
      title: "Teak Forest Plantation #89",
      date: new Date(2025, 0, 28),
      amount: "$600",
      type: "AgriFarms",
      status: "upcoming",
      reminderSet: false
    },
    {
      id: 3,
      title: "Premium Dairy Cattle Farm",
      date: new Date(2025, 0, 10),
      amount: "$320",
      type: "Livestock",
      status: "claimed",
      reminderSet: false
    },
    {
      id: 4,
      title: "Free-Range Poultry Farm",
      date: new Date(2025, 1, 5),
      amount: "$180",
      type: "Livestock",
      status: "upcoming",
      reminderSet: true
    },
    {
      id: 5,
      title: "Sustainable Goat Farming",
      date: new Date(2024, 11, 28),
      amount: "$210",
      type: "Livestock",
      status: "overdue",
      reminderSet: false
    }
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 md:h-24"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const eventsOnDay = roiEvents.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === month && 
        event.date.getFullYear() === year
      );
      
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`h-12 md:h-24 border border-agri-border rounded-lg p-1 md:p-2 transition-all duration-200 cursor-pointer hover:border-agri-primary/50 hover:bg-agri-primary/5 ${
            isToday ? 'bg-agri-primary/10 border-agri-primary/30' : 
            isSelected ? 'bg-agri-primary/20 border-agri-primary/50' : 
            'bg-agri-card'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${isToday ? 'text-agri-primary font-medium' : 'text-agri-text'}`}>
              {day}
            </span>
            {eventsOnDay.length > 0 && (
              <div className="hidden md:flex space-x-1">
                {eventsOnDay.map((event) => (
                  <div 
                    key={event.id}
                    className={`w-2 h-2 rounded-full ${
                      event.status === 'claimed' ? 'bg-agri-primary' :
                      event.status === 'overdue' ? 'bg-red-400' :
                      'bg-agri-accent'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Show event indicators on mobile */}
          {eventsOnDay.length > 0 && (
            <div className="md:hidden mt-1">
              <div className={`text-xs px-1 rounded ${
                eventsOnDay[0].status === 'claimed' ? 'text-agri-primary' :
                eventsOnDay[0].status === 'overdue' ? 'text-red-400' :
                'text-agri-accent'
              }`}>
                {eventsOnDay.length} ROI
              </div>
            </div>
          )}
          
          {/* Show event details on desktop */}
          <div className="hidden md:block mt-1 space-y-1 overflow-hidden">
            {eventsOnDay.map((event, idx) => (
              <div 
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${
                  event.status === 'claimed' ? 'bg-agri-primary/20 text-agri-primary' :
                  event.status === 'overdue' ? 'bg-red-400/20 text-red-400' :
                  'bg-agri-accent/20 text-agri-accent'
                }`}
              >
                {event.amount}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return roiEvents.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const toggleReminder = (eventId) => {
    // In a real app, this would update the state and possibly make an API call
    console.log(`Toggling reminder for event ${eventId}`);
  };

  const exportCalendar = (format) => {
    // In a real app, this would generate and download a calendar file
    console.log(`Exporting calendar in ${format} format`);
  };

  const addToGoogleCalendar = (event) => {
    // In a real app, this would open Google Calendar with pre-filled event details
    console.log(`Adding event ${event.id} to Google Calendar`);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-light text-agri-text">ROI Calendar</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={prevMonth}
              className="p-2 bg-agri-card border border-agri-border rounded-lg text-agri-text hover:border-agri-primary hover:text-agri-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-agri-text font-medium min-w-[150px] text-center">
              {formatMonth(currentMonth)}
            </div>
            <button 
              onClick={nextMonth}
              className="p-2 bg-agri-card border border-agri-border rounded-lg text-agri-text hover:border-agri-primary hover:text-agri-primary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToToday}
            className="px-4 py-2 bg-agri-primary/10 border border-agri-primary/30 text-agri-primary rounded-lg hover:bg-agri-primary/20 transition-colors"
          >
            Today
          </button>
          <div className="relative group">
            <button className="px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-agri-card border border-agri-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                <button 
                  onClick={() => exportCalendar('ics')}
                  className="w-full text-left px-3 py-2 text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 rounded-lg transition-colors"
                >
                  Export as .ics
                </button>
                <button 
                  onClick={() => exportCalendar('csv')}
                  className="w-full text-left px-3 py-2 text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 rounded-lg transition-colors"
                >
                  Export as .csv
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-agri-card border border-agri-border rounded-2xl p-4 md:p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-agri-text/70 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-agri-primary rounded-full"></div>
          <span className="text-agri-text/70 text-sm">Claimed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-agri-accent rounded-full"></div>
          <span className="text-agri-text/70 text-sm">Upcoming</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span className="text-agri-text/70 text-sm">Overdue</span>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-6"
        >
          <h3 className="text-xl font-medium text-agri-text mb-4">
            ROI Events for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {getEventsForSelectedDate().length > 0 ? (
            <div className="space-y-4">
              {getEventsForSelectedDate().map((event) => (
                <div 
                  key={event.id}
                  className={`p-4 border rounded-xl ${
                    event.status === 'claimed' ? 'bg-agri-primary/10 border-agri-primary/30' :
                    event.status === 'overdue' ? 'bg-red-500/10 border-red-500/30' :
                    'bg-agri-accent/10 border-agri-accent/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-agri-text font-medium">{event.title}</h4>
                        <span className="px-2 py-0.5 bg-agri-secondary/50 text-agri-text/70 rounded text-xs">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1 text-sm">
                        <div className="flex items-center text-agri-text/70">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg text-sm hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-medium ${
                        event.status === 'claimed' ? 'text-agri-primary' :
                        event.status === 'overdue' ? 'text-red-400' :
                        'text-agri-accent'
                      }`}>
                        {event.amount}
                      </div>
                      <div className="text-agri-text/70 text-sm">
                        {event.status === 'claimed' ? 'Claimed' :
                         event.status === 'overdue' ? 'Overdue' :
                         'Upcoming'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => toggleReminder(event.id)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm ${
                        event.reminderSet
                          ? 'bg-agri-primary/20 text-agri-primary'
                          : 'bg-agri-secondary/50 text-agri-text'
                      }`}
                    >
                      {event.reminderSet ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      <span>{event.reminderSet ? 'Reminder Set' : 'Set Reminder'}</span>
                    </button>
                    
                    {event.status === 'upcoming' && (
                      <button
                        onClick={() => addToGoogleCalendar(event)}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary transition-colors"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        <span>Add to Calendar</span>
                      </button>
                    )}
                    
                    {event.status === 'upcoming' && (
                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-agri-primary/20 text-agri-primary rounded-lg text-sm hover:bg-agri-primary/30 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        <span>Claim ROI</span>
                      </button>
                    )}
                    
                    {event.status === 'overdue' && (
                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                        <AlertCircle className="w-4 h-4" />
                        <span>Claim Overdue</span>
                      </button>
                    )}
                    
                    {event.status === 'claimed' && (
                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Transaction</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-agri-text/30 mx-auto mb-4" />
              <p className="text-agri-text/70">No ROI events scheduled for this date</p>
              <button className="mt-4 px-4 py-2 bg-agri-primary/10 border border-agri-primary/30 text-agri-primary rounded-lg hover:bg-agri-primary/20 transition-colors">
                <Plus className="w-4 h-4 mr-2 inline" />
                Add Custom Reminder
              </button>
            </div>
          )}
        </motion.div>
      )}
        {/* Export Options */}
        <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-6 mt-8">
          <h3 className="text-xl font-medium text-agri-text mb-4">📅 Export Calendar</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => exportCalendar('ics')}
              className="flex items-center space-x-2 px-4 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Google Calendar (.ics)</span>
            </button>
            <button
              onClick={() => exportCalendar('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Excel (.csv)</span>
            </button>
          </div>
        </div>


      {/* Upcoming ROI Summary */}
      <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-6">
        <h3 className="text-xl font-medium text-agri-text mb-4">Upcoming ROI Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-agri-card border border-agri-border rounded-xl p-4">
            <div className="text-agri-text/70 text-sm mb-1">This Month</div>
            <div className="text-2xl font-light text-agri-primary">$1,230</div>
            <div className="text-agri-text/70 text-sm">From 3 investments</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4">
            <div className="text-agri-text/70 text-sm mb-1">Next Month</div>
            <div className="text-2xl font-light text-agri-accent">$850</div>
            <div className="text-agri-text/70 text-sm">From 2 investments</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4">
            <div className="text-agri-text/70 text-sm mb-1">Total Upcoming</div>
            <div className="text-2xl font-light text-agri-primary">$3,450</div>
            <div className="text-agri-text/70 text-sm">Next 6 months</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalendar;