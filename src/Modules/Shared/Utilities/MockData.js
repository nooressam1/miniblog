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
      userName: "David Kim",
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
  export function getMockPosts() {
    return mockPosts;
  }