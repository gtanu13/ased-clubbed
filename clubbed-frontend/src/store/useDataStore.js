import { create } from 'zustand';

const initialClubs = [
  { id: '1', name: "HAPPY TAILS", category: "Nature", members: 120, src: "https://github.com/nandini973/CLUB-IMAGES/blob/main/happy%20tails.jpg?raw=true" },
  { id: '2', name: "Expressions RVU", category: "Arts", members: 85, src:"https://github.com/nandini973/CLUB-IMAGES/blob/main/expressions.jpg?raw=true" },
  { id: '3', name: "The Vibe Tribe", category: "Culture", members: 110, src: "https://github.com/nandini973/CLUB-IMAGES/blob/main/VIBE%20TRIBE%202.jpg?raw=true"},
  { id: '4', name: "TIFA", category: "Tech", members: 150, src: "https://github.com/nandini973/CLUB-IMAGES/blob/main/tifa.jpg?raw=true"},
  { id: '16', name: "Cybersec", category: "Tech", members: 210, src: "https://github.com/nandini973/CLUB-IMAGES/blob/main/cybersec.jpg?raw=true" },
  { id: '18', name: "GDG", category: "Tech", members: 300, src: "https://github.com/nandini973/CLUB-IMAGES/blob/main/gdg.jpg?raw=true"},
];

const initialEvents = [
  { 
    id: 'e1', 
    title: 'Cyber Security Workshop', 
    clubId: '16', 
    date: '2026-04-15', 
    totalSeats: 60,
    // Pre-filling 70% of seats as Occupied (1) for the demo
    seatMap: Array(60).fill(0).map(() => Math.random() < 0.7 ? 1 : 0),
    isRegistered: false 
  },
  { 
    id: 'e2', 
    title: 'GDG DevFest 2026', 
    clubId: '18', 
    date: '2026-04-20', 
    totalSeats: 100,
    seatMap: Array(100).fill(1), // Fully booked
    isRegistered: false 
  },
  { 
    id: 'e3', 
    title: 'Art Exhibition', 
    clubId: '2', 
    date: '2026-04-25', 
    totalSeats: 40,
    seatMap: Array(40).fill(0).map(() => Math.random() < 0.1 ? 1 : 0), // Mostly empty
    isRegistered: false 
  },
];

const initialVenues = [
  { id: 'v1', name: 'Main Auditorium', capacity: 500, status: 'available' },
  { id: 'v2', name: 'Seminar Hall A', capacity: 120, status: 'booked' },
  { id: 'v3', name: 'Open Air Theatre', capacity: 800, status: 'available' },
];

const initialMemberships = [
  { id: 'm1', userId: 'student@rvu.edu.in', userName: 'Alex Doe', clubId: '16', clubName: 'Cybersec', status: 'pending' },
];

export const useDataStore = create((set) => ({
  clubs: initialClubs,
  events: initialEvents,
  venues: initialVenues,
  memberships: initialMemberships,
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  // PVR Seating Logic
  registerForSeat: (eventId, seatIndex) => set((state) => ({
    events: state.events.map(event => {
      if (event.id === eventId && event.seatMap[seatIndex] === 0 && !event.isRegistered) {
        const newMap = [...event.seatMap];
        newMap[seatIndex] = 1; // Mark as occupied
        return { ...event, seatMap: newMap, isRegistered: true };
      }
      return event;
    })
  })),

  // Venue Logic
  bookVenue: (venueId) => set((state) => ({
    venues: state.venues.map(v => v.id === venueId ? { ...v, status: 'pending' } : v)
  })),
  approveVenue: (venueId, approved) => set((state) => ({
    venues: state.venues.map(v => v.id === venueId ? { ...v, status: approved ? 'booked' : 'available' } : v)
  })),

  // Membership Logic
  applyForMembership: (clubId, clubName, user) => set((state) => ({
    memberships: [...state.memberships, {
      id: `m${Date.now()}`,
      userId: user?.email || 'unknown',
      userName: user?.name || 'Student',
      clubId,
      clubName,
      status: 'pending'
    }]
  })),
  
  updateMembershipStatus: (membershipId, newStatus) => set((state) => ({
    memberships: state.memberships.map(m => m.id === membershipId ? { ...m, status: newStatus } : m)
  })),
}));