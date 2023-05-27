import { CREATE, DELETE, READ, UPDATE, type Action } from "./Action";

export abstract class AccessControlRequest {
  protected abstract query(
    action: Action,
    resource: string,
    ownership: boolean,
  ): Promise<boolean>;

  public create(resource: string, ownership = false) {
    return this.query(CREATE, resource, ownership);
  }

  public createAny(resource: string) {
    return this.create(resource, false);
  }

  public createOwn(resource: string) {
    return this.create(resource, true);
  }

  public read(resource: string, ownership = false) {
    return this.query(READ, resource, ownership);
  }

  public readAny(resource: string) {
    return this.read(resource, false);
  }

  public readOwn(resource: string) {
    return this.read(resource, true);
  }

  public update(resource: string, ownership = false) {
    return this.query(UPDATE, resource, ownership);
  }

  public updateAny(resource: string) {
    return this.update(resource, false);
  }

  public updateOwn(resource: string) {
    return this.update(resource, true);
  }

  public delete(resource: string, ownership = false) {
    return this.query(DELETE, resource, ownership);
  }

  public deleteAny(resource: string) {
    return this.delete(resource, false);
  }

  public deleteOwn(resource: string) {
    return this.delete(resource, true);
  }
}
