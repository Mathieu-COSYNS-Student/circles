import {
  CREATE,
  NETWORK_INVITE,
  NETWORK_MEMBERS,
  NETWORK_ROLES,
  READ,
  type Permission,
} from "@acme/accesscontrol";

export type PermissionSettingCategory = "Circles" | "Roles" | "Members";

export type PermissionSettingItem = {
  name: string;
  enabledTips: string;
  disabledTips: string;
  permission: Permission;
};

export type PermissionSetting = {
  category: PermissionSettingCategory;
  data: PermissionSettingItem[];
};

export const permissionsSettings: PermissionSetting[] = [
  {
    category: "Members",
    data: [
      {
        name: "View all members",
        enabledTips: "Can view all members in the network",
        disabledTips: "Can not view all members in the network",
        permission: {
          action: READ,
          resource: NETWORK_MEMBERS,
        },
      },
      {
        name: "Create network invite",
        enabledTips: "Can create invites to add more people in the network",
        disabledTips: "Can not create invites",
        permission: {
          action: CREATE,
          resource: NETWORK_INVITE,
        },
      },
    ],
  },
  {
    category: "Roles",
    data: [
      {
        name: "View all roles",
        enabledTips: "Can view all roles in the network",
        disabledTips: "Can not view all roles in the network",
        permission: {
          action: READ,
          resource: NETWORK_ROLES,
        },
      },
    ],
  },
  {
    category: "Circles",
    data: [
      {
        name: "View all circles",
        enabledTips: "Can view all circles in the network",
        disabledTips: "Can not view all circles in the network",
        permission: {
          action: READ,
          resource: NETWORK_ROLES,
        },
      },
      {
        name: "Create circles",
        enabledTips: "Can create an new circle in the network",
        disabledTips: "Can not create new circles",
        permission: {
          action: READ,
          resource: NETWORK_ROLES,
        },
      },
    ],
  },
];
