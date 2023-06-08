export interface HashWorkerInterface {
  getHash(value: string): string;
  comparePasswords(password: string, hashPassword: string): boolean;
}
