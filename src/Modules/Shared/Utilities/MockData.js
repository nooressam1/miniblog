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
export const mockMessages = [
  {
    messageId: "msg1",
    senderId: "alex123",
    receiverId: "sarah456",
    text: "Hey Sarah! How’s your latest frontend project going?",
    timestamp: "2025-06-14T10:15:00Z",
  },
  {
    messageId: "msg2",
    senderId: "sarah456",
    receiverId: "alex123",
    text: "Hi Alex! Pretty good, just finished a new React component. How about you?",
    timestamp: "2025-06-14T10:17:00Z",
  },
  {
    messageId: "msg3",
    senderId: "michael789",
    receiverId: "emily321",
    text: "Emily, did you get a chance to review the latest blog draft?",
    timestamp: "2025-06-13T16:40:00Z",
  },
  {
    messageId: "msg4",
    senderId: "emily321",
    receiverId: "michael789",
    text: "Yes Michael, looks great! Just a few minor edits.",
    timestamp: "2025-06-13T16:45:00Z",
  },
  {
    messageId: "msg5",
    senderId: "david654",
    receiverId: "alex123",
    text: "Alex, want to join me on a hike this weekend?",
    timestamp: "06-12",
  },
  {
    messageId: "msg6",
    senderId: "alex123",
    receiverId: "david654",
    text: "Sounds awesome, David! Count me in.",
    timestamp: "06-12",
  },
];

  export function getMockPosts() {
    return mockPosts;
  }
    export function getMockMessages() {
    return mockMessages;
  }
    export function getMockUsers() {
    return mockUsers;
  }