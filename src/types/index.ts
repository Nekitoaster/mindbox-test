export interface TaskI {
  id: string;
  body: string;
  checked: boolean;
}
export type FilterT = "all" | "progress" | "completed";
