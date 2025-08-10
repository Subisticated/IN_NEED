import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

export function useProtectedRoute(allowedRoles?: string[]) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || (allowedRoles && !allowedRoles.includes(user?.role)))) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, user, allowedRoles, router]);
}
