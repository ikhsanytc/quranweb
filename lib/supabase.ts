import { LinkNavbarPlus } from "@/types/main";
import { createClient, User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function checkUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function addBookmarks(
  userData: User,
  surat: string,
  setDrawerOpen?: Dispatch<SetStateAction<boolean>>,
  setIsBookmarks?: Dispatch<SetStateAction<boolean>>
) {
  try {
    const { data: dataCheck, error: errorCheck } = await supabase
      .from("bookmarks")
      .select()
      .eq("userId", userData.id)
      .eq("surat", surat);
    if (dataCheck?.length !== 0) {
      if (confirm("Data sudah ada, apa kamu ingin menghapusnya?")) {
        const { error: errorDelete } = await supabase
          .from("bookmarks")
          .delete()
          .eq("userId", userData.id)
          .eq("surat", surat);
        if (errorDelete) {
          toast.error(errorDelete.message);
          return;
        }
        toast.success("Sukses menghapus surat ini dari bookmarks!");
        if (setIsBookmarks) {
          setIsBookmarks(false);
        }
      }
      if (setDrawerOpen) {
        setDrawerOpen(false);
      }
      return;
    }
    if (errorCheck) {
      toast.error(errorCheck.message);
      return;
    }
    const { error: errorInsert } = await supabase.from("bookmarks").insert({
      userId: userData.id,
      surat,
    });
    if (errorInsert) {
      toast.error(errorInsert.message);
      return;
    }
    toast.success("Sukses tambah ke bookmarks!");
    if (setIsBookmarks) {
      setIsBookmarks(true);
    }
  } catch (err) {
    console.error(err);
  }
}
