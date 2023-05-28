import { CREATE, DELETE, READ, UPDATE } from "./Action";
import { type Permission } from "./Permission";
import { type Resource } from "./Resource";

export abstract class AccessControlRequest {
  protected abstract query(permission: Permission): boolean | Promise<boolean>;

  public create(resource: Resource, ownership = false) {
    return this.query({ action: CREATE, resource, ownership });
  }

  public createAny(resource: Resource) {
    return this.create(resource, false);
  }

  public createOwn(resource: Resource) {
    return this.create(resource, true);
  }

  public read(resource: Resource, ownership = false) {
    return this.query({ action: READ, resource, ownership });
  }

  public readAny(resource: Resource) {
    return this.read(resource, false);
  }

  public readOwn(resource: Resource) {
    return this.read(resource, true);
  }

  public update(resource: Resource, ownership = false) {
    return this.query({ action: UPDATE, resource, ownership });
  }

  public updateAny(resource: Resource) {
    return this.update(resource, false);
  }

  public updateOwn(resource: Resource) {
    return this.update(resource, true);
  }

  public delete(resource: Resource, ownership = false) {
    return this.query({ action: DELETE, resource, ownership });
  }

  public deleteAny(resource: Resource) {
    return this.delete(resource, false);
  }

  public deleteOwn(resource: Resource) {
    return this.delete(resource, true);
  }
}
