import clerkClient from "@clerk/clerk-sdk-node";

export const getUsers = async (ids: string[]) => {
  const users = await clerkClient.users.getUserList({
    userId: ids,
  });

  return Object.fromEntries(
    users.map((user) => [
      user.id,
      {
        id: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileImageUrl: user.profileImageUrl,
      },
    ]),
  );
};
