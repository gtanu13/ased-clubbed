import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  role: null, 
  isAuthenticated: false,
  
  login: (userData) => set({ 
    user: {
      ...userData,
      // Default CV Data for the mock student
      bio: "Computer Science undergrad passionate about frontend development and UI/UX design. Looking to collaborate on cool projects!",
      skills: ["React", "Tailwind CSS", "Figma", "JavaScript"],
      achievements: ["1st Place - RVU Hackathon 2025", "Published an app on PlayStore"],
      portfolio: "github.com/" + userData.email.split('@')[0]
    }, 
    isAuthenticated: true, 
    role: userData.role || 'student' 
  }),
  
  updateProfile: (updatedData) => set((state) => ({
    user: { ...state.user, ...updatedData }
  })),

  logout: () => set({ user: null, isAuthenticated: false, role: null }),
}));