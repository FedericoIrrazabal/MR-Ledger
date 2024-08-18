// app/actions/transactionActions.ts
"use server";

import { TransactionFormValues } from "@/interfaces/transaction";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTransaction(data: TransactionFormValues) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error getting user:", userError);
    return null;
  }

  const userId = userData?.user?.id;
  if (!userId) {
    console.error("User not authenticated");
    return null;
  }

  const transactionData = {
    ...data,
    user_id: userId,
  };

  const { data: insertData, error: insertError } = await supabase
    .from("transactions")
    .insert([transactionData]);

  if (insertError) {
    console.error("Error creating transaction:", insertError);
    return null;
  }

  revalidatePath("/admin/trasactions");

  return insertData;
}

export async function updateTransaction(
  id: string,
  data: Partial<TransactionFormValues>
) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error getting user:", userError);
    return null;
  }

  const userId = userData?.user?.id;
  if (!userId) {
    console.error("User not authenticated");
    return null;
  }

  const { data: transaction, error: fetchError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching transaction:", fetchError);
    return null;
  }

  if (!transaction) {
    console.error("Transaction not found or does not belong to the user");
    return null;
  }

  const { data: updateData, error: updateError } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating transaction:", updateError);
    return null;
  }

  revalidatePath("/admin/trasactions");

  return updateData;
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error getting user:", userError);
    return null;
  }

  const userId = userData?.user?.id;
  if (!userId) {
    console.error("User not authenticated");
    return null;
  }

  const { data: transaction, error: fetchError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching transaction:", fetchError);
    return null;
  }

  if (!transaction) {
    console.error("Transaction not found or does not belong to the user");
    return null;
  }

  const { data: deleteData, error: deleteError } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (deleteError) {
    console.error("Error deleting transaction:", deleteError);
    return null;
  }

  revalidatePath("/admin/trasactions");

  return deleteData;
}
