const mockPosts = [
    {
      id: 1,
      userName: "Alex Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      captionText: "Just finished my morning hike! The view was absolutely breathtaking today. #nature #outdoors",
      postType: "Photo",
      photoUrl: "https://images.unsplash.com/photo-1682686580391-615b4b82f6d6?w=600&auto=format&fit=crop" // Mountain landscape
    },
    {
      id: 2,
      userName: "Sarah Williams",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      captionText: "Working on a new project that I'm really excited about. Can't wait to share more details soon!",
      postType: "Text"
    },
    {
      id: 3,
      userName: "Michael Chen",
      profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
      captionText: "This is my favorite coffee place in town. Their cold brew is amazing!",
      postType: "Photo",
      photoUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop" // Coffee cup
    },
    {
      id: 4,
      userName: "Emily Rodriguez",
      profilePicture: "https://randomuser.me/api/portraits/women/63.jpg",
      captionText: "Just published my latest article on React hooks. Check it out if you're interested in frontend development!",
      postType: "Text"
    },
    {
      id: 5,
      userName: "David Kim",
      profilePicture: "https://randomuser.me/api/portraits/men/81.jpg",
      captionText: "Weekend getaway with friends. So much fun and great memories made!",
      postType: "Photo",
      photoUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&auto=format&fit=crop" // Friends at beach
    }
  ];
 export const mockUsers = [
  {
    userId: "alex123",
    userName: "Alex Johnson",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Hiker, photographer, and nature lover.",
    followers: 102,
    following: 180,
  },
  {
    userId: "sarah456",
    userName: "Sarah Williams",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Frontend dev and cat enthusiast.",
    followers: 250,
    following: 305,
  },
  {
    userId: "michael789",
    userName: "Michael Chen",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Coffee, code, repeat.",
    followers: 190,
    following: 220,
  },
  {
    userId: "emily321",
    userName: "Emily Rodriguez",
    profilePicture: "https://randomuser.me/api/portraits/women/63.jpg",
    description: "Writer and React developer.",
    followers: 340,
    following: 289,
  },
  {
    userId: "david654",
    userName: "David Kim",
    profilePicture: "https://randomuser.me/api/portraits/men/81.jpg",
    description: "Weekend adventurer and UX/UI designer.",
    followers: 410,
    following: 380,
  },
];
export const mockMessages = {
  alex123: [
    { fromSelf: true, text: "Hey Alex, ready for the hike this weekend?", timestamp: "2025-06-13T10:01:00Z" },
    { fromSelf: false, text: "Absolutely! Got my gear packed already.", timestamp: "2025-06-13T10:03:00Z" },
  ],
  sarah456: [
    { fromSelf: true, text: "Loved your recent UI post!", timestamp: "2025-06-12T14:20:00Z" },
    { fromSelf: false, text: "Aww thanks! That means a lot 🐱", timestamp: "2025-06-12T14:22:00Z" },
  ],
  michael789: [
    { fromSelf: false, text: "How many cups of coffee today? 😄", timestamp: "2025-06-13T08:30:00Z" },
    { fromSelf: true, text: "Only 3. I’m improving!", timestamp: "2025-06-13T08:31:00Z" },
  ],
  emily321: [
    { fromSelf: true, text: "Hey Emily, want to collab on the blog project?", timestamp: "2025-06-11T17:00:00Z" },
    { fromSelf: false, text: "Sure! React and writing? I’m in.", timestamp: "2025-06-11T17:02:00Z" },
  ],
  david654: [
    { fromSelf: false, text: "Sent you the new UI mockups!", timestamp: "2025-06-10T09:10:00Z" },
    { fromSelf: true, text: "Got them! Looks super clean 🔥", timestamp: "2025-06-10T09:12:00Z" },
  ],
};

  export function getMockPosts() {
    return mockPosts;
  }
    export function getMockMessages() {
    return mockMessages;
  }
    export function getMockUsers() {
    return mockUsers;
  }