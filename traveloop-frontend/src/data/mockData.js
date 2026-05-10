export const MOCK_DATA = {
  users: [
    {
      id: "admin@traveloop.in",
      password: "password123",
      name: "Pratham Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pratham",
      plan: "Premium",
      location: "New Delhi, India"
    },
    {
      id: "shakti@traveloop.in",
      password: "shakti_pass",
      name: "Shakti Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shakti",
      plan: "Pro",
      location: "Mumbai, India"
    }
  ],
  trips: [
    { 
      id: 1, 
      name: "Goa Beach Bash", 
      dates: "Dec 20 – Dec 28", 
      location: "Goa 🏖️", 
      status: "upcoming", 
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600",
      budget: "₹45,000",
      activities: 12
    },
    { 
      id: 2, 
      name: "Kerala Backwaters", 
      dates: "Jan 15 – Jan 22", 
      location: "Alleppey 🛶", 
      status: "planning", 
      img: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?q=80&w=600",
      budget: "₹32,000",
      activities: 8
    },
    { 
      id: 3, 
      name: "Manali Snow Trip", 
      dates: "Nov 5 – Nov 12", 
      location: "Himachal 🏔️", 
      status: "completed", 
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600",
      budget: "₹28,000",
      activities: 15
    },
    { 
      id: 4, 
      name: "Rajasthan Heritage", 
      dates: "Feb 10 – Feb 18", 
      location: "Jaipur 🏰", 
      status: "upcoming", 
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600",
      budget: "₹55,000",
      activities: 20
    }
  ],
  destinations: [
    { city: "Leh", country: "Ladakh", image: "⛰️", price: "₹45,000", rating: "4.9" },
    { city: "Munnar", country: "Kerala", image: "🍵", price: "₹25,000", rating: "4.8" },
    { city: "Rishikesh", country: "Uttarakhand", image: "🧘", price: "₹15,000", rating: "4.7" },
    { city: "Hampi", country: "Karnataka", image: "🛕", price: "₹20,000", rating: "4.6" },
  ],
  itinerary: [
    { day: 1, date: "Saturday, Dec 20", activities: [
      { id: 1, time: "10:00 AM", title: "Arrival at Dabolim Airport", location: "Goa", type: "transport", duration: "1h" },
      { id: 2, time: "02:00 PM", title: "Check-in at Taj Exotica", location: "Benaulim", type: "stay", duration: "30m" },
      { id: 3, time: "05:00 PM", title: "Sunset at Colva Beach", location: "South Goa", type: "sight", duration: "2h" },
    ]},
    { day: 2, date: "Sunday, Dec 21", activities: [
      { id: 4, time: "09:00 AM", title: "Scuba Diving in Grande Island", location: "Vasco", type: "adventure", duration: "4h" },
      { id: 5, time: "02:00 PM", title: "Lunch at Thalassa", location: "Vagator", type: "food", duration: "2h" },
    ]},
  ]
};
