export interface Transaction {
  id: string;
  user_id: string;
  type: Type;
  amount: number;
  description: string;
  category: string;
  created_at: Date;
  profiles: Profiles;
}

export interface Profiles {
  full_name: string;
  avatar_url: string;
}

export enum Type {
  Expense = "expense",
  Income = "income",
}

export interface TransactionFormValues {
  type: Type;
  amount: number;
  description: string;
  category: string;
}
