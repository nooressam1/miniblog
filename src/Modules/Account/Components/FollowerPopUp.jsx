import React from "react";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import AccountBox from "./AccountBox";

const FollowerPopUp = ({ setOpenFollowers, switchOpenFollowers, userInfo }) => {
  const { user, backendUrl } = useAuth();
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const endpoint =
      switchOpenFollowers === "Followers"
        ? `${backendUrl}/api/account/allFollowersUsers/${userInfo._id}`
        : `${backendUrl}/api/account/allFollowingUsers/${userInfo._id}`;

    const response = await axios.get(endpoint);
    console.log("hm following", response.data);
    return response.data;
  };

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["followersorFollowing", switchOpenFollowers, user._id],
    queryFn: fetchUsers,
    enabled: !!user,
  });

  const removeUserMutation = useMutation({
    mutationFn: (userToRemove) =>
      axios.patch(
        `${backendUrl}/api/account/removePersonalFollower/${user._id}`,
        {
          _id: userToRemove._id,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["followersorFollowing", switchOpenFollowers, user._id],
      });
    },
    onError: (error) => {
      console.error("Failed to remove user:", error);
    },
  });

  const unfollowUserMutation = useMutation({
    mutationFn: (userToUnfollow) =>
      axios.put(
        `${backendUrl}/api/account/unfollowUser/${userToUnfollow.username}`,
        {
          unfollowerUsername: user.username,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["followersorFollowing", switchOpenFollowers, user._id],
      });
    },
    onError: (error) => {
      console.error("Failed to unfollow user:", error);
    },
  });

  const RemoveUser = (userToRemove) => {
    removeUserMutation.mutate(userToRemove);
  };

  const RemoveFollower = (userToUnfollow) => {
    unfollowUserMutation.mutate(userToUnfollow);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#090B14]  p-7 rounded-lg w-[90vw] md:w-[60vw] max-h-[95vh] overflow-y-auto">
          <div className="flex justify-between">
            <h1 className="text-[#E3DDF7] mb-2 font-medium text-2xl">
              {switchOpenFollowers === "Followers" ? "Followers" : "Following"}
            </h1>
            <button onClick={() => setOpenFollowers((prev) => !prev)}>
              <IconX stroke={2} color="white" />
            </button>
          </div>

          {isLoading && <p className="text-[#E3DDF7] mt-4">Loading users...</p>}
          {error && <p className="text-red-500 mt-4">Error loading users.</p>}
          {!isLoading && !error && users.length === 0 && (
            <p className="text-[#E3DDF7] mt-4">No users found.</p>
          )}

          {!isLoading &&
            !error &&
            users.length > 0 &&
            (switchOpenFollowers === "Followers"
              ? users.map((userItem, index) => (
                  <AccountBox
                    operation={() => RemoveUser(userItem)}
                    key={userItem._id || index}
                    User={userItem}
                  />
                ))
              : users.map((userItem, index) => (
                  <AccountBox
                    operation={() => RemoveFollower(userItem)}
                    key={userItem._id || index}
                    User={userItem}
                  />
                )))}
        </div>
      </div>
    </>
  );
};

export default FollowerPopUp;
