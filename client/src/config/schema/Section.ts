import type { Resource } from "./Resource";

export interface Section {
  _id: string;
  title: string;
  resources: Resource[];
}
