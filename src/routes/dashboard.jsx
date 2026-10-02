import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [loadingShop, setLoadingShop] = useState(true);

  const [showCreateShop, setShowCreateShop] = useState(false);
  const [shopName, setShopName] = useState("");
  const [creatingShop, setCreatingShop] = useState(false);

  const [qrUrl, setQrUrl] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    try {
      setLoadingShop(true);

      const response = await api.getMyShop();

      setShop(response?.data ?? null);
    } catch (error) {
      console.log("Shop not loaded:", error.message);
      setShop(null);
    } finally {
      setLoadingShop(false);
    }
  };

  const handleCreateShop = async (e) => {
    e.preventDefault();

    if (!shopName.trim()) {
      toast.error("Please enter shop name.");
      return;
    }

    try {
      setCreatingShop(true);

      const response = await api.createShop({
        shopName: shopName.trim(),
      });

      setShop(response?.data ?? null);
      setShopName("");
      setShowCreateShop(false);

      toast.success("Shop created successfully");
    } catch (error) {
      toast.error(
        error?.message || "Failed to create shop"
      );
    } finally {
      setCreatingShop(false);
    }
  };

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  };

  const handleLoadQr = async () => {
    try {
      setLoadingQr(true);

      const blob = await api.getShopQr();

      const url = URL.createObjectURL(blob);

      setQrUrl(url);
    } catch (error) {
      toast.error(
        error?.message || "Failed to load QR code"
      );
    } finally {
      setLoadingQr(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
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

        {/* Account */}
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

        {/* Shop */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">
              Shop
            </h2>

            {!loadingShop && !shop && (
              <Button
                onClick={() =>
                  setShowCreateShop(true)
                }
              >
                Create Shop
              </Button>
            )}
          </div>

          {/* Loading */}
          {loadingShop && (
            <p className="mt-4 text-sm text-muted-foreground">
              Loading shop...
            </p>
          )}

          {/* Shop exists */}
          {!loadingShop && shop && (
            <div className="mt-4 space-y-3 text-sm">
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
              //qr button 
              <div className="pt-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleLoadQr}
                  disabled={loadingQr}
                >
                  {loadingQr ? "Loading QR..." : "View QR Code"}
                </Button>

                {qrUrl && (
                  <a
                    href={qrUrl}
                    download="printeasy-shop-qr.png"
                  >
                    <Button>
                      Download QR
                    </Button>
                  </a>
                )}
              </div>

              {qrUrl && (
                <div className="mt-6 flex justify-center">
                  <div className="rounded-xl border bg-white p-4">
                    <img
                      src={qrUrl}
                      alt="PrintEasy Shop QR Code"
                      className="h-64 w-64"
                    />
                  </div>
                </div>
              )}
              <div className="pt-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate("/shop")
                  }
                >
                  Manage Shop
                </Button>
              </div>
            </div>
          )}

          {/* No shop */}
          {!loadingShop &&
            !shop &&
            !showCreateShop && (
              <p className="mt-4 text-sm text-muted-foreground">
                No shop found. Create your shop to
                start using PrintEasy.
              </p>
            )}

          {/* Create shop form */}
          {!loadingShop &&
            !shop &&
            showCreateShop && (
              <form
                onSubmit={handleCreateShop}
                className="mt-6 max-w-md space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="shopName">
                    Shop Name
                  </Label>

                  <Input
                    id="shopName"
                    placeholder="My Print Shop"
                    value={shopName}
                    onChange={(e) =>
                      setShopName(e.target.value)
                    }
                    disabled={creatingShop}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={creatingShop}
                  >
                    {creatingShop
                      ? "Creating..."
                      : "Create Shop"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={creatingShop}
                    onClick={() => {
                      setShowCreateShop(false);
                      setShopName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}