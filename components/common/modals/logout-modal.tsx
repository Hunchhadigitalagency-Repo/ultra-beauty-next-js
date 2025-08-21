"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { logout } from "@/lib/api/auth/auth-api";
import { handleError } from "@/lib/error-handler";
import { resetAuthentication } from "@/redux/features/authentication-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface LogoutModalProps {
  showLogoutModal: boolean;
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>;
}

const LogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
}: LogoutModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector(
    (state) => state.authentication
  );

  const handleLogout = async () => {
    try {
      const response = await logout(accessToken, refreshToken);
      if (response.status === 205) {
        toast.success("Logged Out Successfully!");
        dispatch(resetAuthentication())
        router.push("/");
      }
    } catch (err) {
      handleError(err, toast);
    }
  };

  return (
    <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign out of your account?</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out? You&apos;ll need to sign in again
            to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
