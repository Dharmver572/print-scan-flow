import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [loadingShop, setLoadingShop] = useState(true);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const response = await api.getMyShop();
        setShop(response?.data ?? null);
      } catch (error) {
        console.log("Shop not loaded:", error.message);
      } finally {
        setLoadingShop(false);
      }
    };

    loadShop();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              PrintEasy Dashboard
            </p>

            <h1 className="text-3xl font-bold">
              Welcome, {user?.name}
            </h1>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">
            Account
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>Email:</strong>{" "}
              {user?.email}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">
            Shop
          </h2>

          {loadingShop ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Loading shop...
            </p>
          ) : shop ? (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Name:</strong>{" "}
                {shop.shopName}
              </p>

              <p>
                <strong>Code:</strong>{" "}
                {shop.shopCode}
              </p>

              <p>
                <strong>Token:</strong>{" "}
                {shop.shopToken}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {shop.status}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No shop found. Create your shop next.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}