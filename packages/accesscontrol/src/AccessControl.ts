import {
  UserAccessControlRequest,
  type UserAccessControlRequestOptions,
} from "./UserAccessControlRequest";

export type AccessControlOptions<User, Context> =
  UserAccessControlRequestOptions<User, Context>;

export class AccessControl<User, Context> {
  private options: AccessControlOptions<User, Context>;

  constructor(options: AccessControlOptions<User, Context>) {
    this.options = options;
  }

  public can(user: User) {
    return new UserAccessControlRequest(user, this.options);
  }
}
