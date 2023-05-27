import { AccessControlRequest } from "./AccessControlRequest";
import { type Action } from "./Action";

export type UserAccessControlRequestOptions<User, Context> = {
  grants: (data: {
    user: User;
    context?: Context;
    action: Action;
    resource: string;
    ownership: boolean;
  }) => Promise<boolean>;
};

export class UserAccessControlRequest<
  User,
  Context,
> extends AccessControlRequest {
  private _user: User;
  private _options: UserAccessControlRequestOptions<User, Context>;

  constructor(
    user: User,
    options: UserAccessControlRequestOptions<User, Context>,
  ) {
    super();
    this._user = user;
    this._options = options;
  }

  protected get user() {
    return this._user;
  }

  protected get options() {
    return this._options;
  }

  protected query(
    action: Action,
    resource: string,
    ownership: boolean,
  ): Promise<boolean> {
    return this.options.grants({
      user: this.user,
      action,
      resource,
      ownership,
    });
  }

  public in(context: Context) {
    return new UserInContextAccessControlRequest(
      this.user,
      context,
      this.options,
    );
  }
}

export class UserInContextAccessControlRequest<
  User,
  Context,
> extends UserAccessControlRequest<User, Context> {
  private _context: Context;

  constructor(
    user: User,
    context: Context,
    options: UserAccessControlRequestOptions<User, Context>,
  ) {
    super(user, options);
    this._context = context;
  }

  protected get context() {
    return this._context;
  }

  protected query(
    action: Action,
    resource: string,
    ownership: boolean,
  ): Promise<boolean> {
    return this.options.grants({
      user: this.user,
      context: this.context,
      action,
      resource,
      ownership,
    });
  }
}
