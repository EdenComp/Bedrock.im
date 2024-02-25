import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { ZodSchema } from "zod";

export const objectToEncryptedBase64 = async (account: ETHAccount, content: unknown): Promise<string> => {
  return (await account.encrypt(Buffer.from(JSON.stringify(content)), account.publicKey)).toString("base64");
};

export const encryptedBase64ToObject = async <T>(
  account: ETHAccount,
  content: string,
  schema?: ZodSchema<T>,
): Promise<T> => {
  const decrypted = await account.decrypt(content);
  const json = JSON.parse(decrypted.toString());
  if (schema) return schema.parse(json);
  return json;
};

export const objectToBase64 = (content: unknown): string => {
  return Buffer.from(JSON.stringify(content)).toString("base64");
};

export const base64ToObject = <T>(content: string, schema?: ZodSchema<T>): T => {
  const json = JSON.parse(Buffer.from(content, "base64").toString());
  if (schema) return schema.parse(json);
  return json;
};
