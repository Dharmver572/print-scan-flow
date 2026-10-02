import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  QrCode,
  Download,
  Store,
  Copy,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export function ShopPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [shopName, setShopName] = useState("");
  const [saving, setSaving] = useState(false);

  const [qrUrl, setQrUrl] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const [copied, setCopied] = useState("");

  useEffect(() => {
    loadShop();

    return () => {
      if (qrUrl) {
        URL.revokeObjectURL(qrUrl);
      }
    };
  }, []);

  const loadShop = async () => {
    try {
      setLoading(true);

      const response = await api.getMyShop();

      const shopData = response?.data ?? null;

      setShop(shopData);
      setShopName(shopData?.shopName || "");
    } catch (error) {
      toast.error(
        error?.message || "Failed to load shop"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();

    const trimmedName = shopName.trim();

    if (!trimmedName) {
      toast.error("Please enter shop name.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.updateShop({
        shopName: trimmedName,
      });

      const updatedShop = response?.data ?? null;

      setShop(updatedShop);

      if (updatedShop?.shopName) {
        setShopName(updatedShop.shopName);
      }

      setEditing(false);

      toast.success("Shop updated successfully");
    } catch (error) {
      toast.error(
        error?.message || "Failed to update shop"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLoadQr = async () => {
    try {
      setLoadingQr(true);

      if (qrUrl) {
        URL.revokeObjectURL(qrUrl);
        setQrUrl(null);
      }

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

  const handleDownloadQr = () => {
    if (!qrUrl) {
      toast.error("Please load QR code first.");
      return;
    }

    const link = document.createElement("a");

    link.href = qrUrl;
    link.download = "printeasy-shop-qr.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async (value, type) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      toast.success(
        `${type === "code" ? "Shop code" : "Shop token"} copied`
      );

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Loading shop...
          </p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mt-8 rounded-xl border bg-card p-8 text-center">
            <Store className="mx-auto h-10 w-10 text-muted-foreground" />

            <h1 className="mt-4 text-2xl font-bold">
              No shop found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your shop from the dashboard first.
            </p>

            <Button
              className="mt-6"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-3 -ml-3"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Store className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Shop Management
                </h1>

                <p className="text-sm text-muted-foreground">
                  Manage your PrintEasy shop
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Shop Information */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6">

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Shop Information
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your public shop details
                </p>
              </div>

              {!editing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>

            {editing ? (
              <form
                onSubmit={handleUpdateShop}
                className="mt-6 space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="shopName">
                    Shop Name
                  </Label>

                  <Input
                    id="shopName"
                    value={shopName}
                    onChange={(e) =>
                      setShopName(e.target.value)
                    }
                    placeholder="My Print Shop"
                    disabled={saving}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={saving}
                  >
                    <Save className="mr-2 h-4 w-4" />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={saving}
                    onClick={() => {
                      setShopName(
                        shop.shopName || ""
                      );

                      setEditing(false);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-6 space-y-5">

                {/* Shop Name */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Shop Name
                  </p>

                  <p className="mt-1 text-base font-medium">
                    {shop.shopName}
                  </p>
                </div>

                {/* Shop Code */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Shop Code
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-mono text-sm font-medium">
                      {shop.shopCode}
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleCopy(
                          shop.shopCode,
                          "code"
                        )
                      }
                    >
                      {copied === "code" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Shop Token */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Shop Token
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <p className="max-w-full break-all font-mono text-xs text-muted-foreground">
                      {shop.shopToken}
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() =>
                        handleCopy(
                          shop.shopToken,
                          "token"
                        )
                      }
                    >
                      {copied === "token" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>

                  <div className="mt-2">
                    <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                      {shop.status}
                    </span>
                  </div>
                </div>

                {/* Owner */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Owner
                  </p>

                  <p className="mt-1 text-sm">
                    {user?.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* QR Card */}
          <div className="rounded-xl border bg-card p-6">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <QrCode className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Shop QR Code
                </h2>

                <p className="text-xs text-muted-foreground">
                  Customer upload access
                </p>
              </div>
            </div>

            {!qrUrl ? (
              <div className="mt-8 text-center">

                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border border-dashed">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>

                <Button
                  className="mt-5 w-full"
                  onClick={handleLoadQr}
                  disabled={loadingQr}
                >
                  <QrCode className="mr-2 h-4 w-4" />

                  {loadingQr
                    ? "Loading..."
                    : "View QR Code"}
                </Button>
              </div>
            ) : (
              <div className="mt-6">

                <div className="flex justify-center rounded-xl bg-white p-4">
                  <img
                    src={qrUrl}
                    alt="PrintEasy Shop QR Code"
                    className="h-52 w-52"
                  />
                </div>

                <Button
                  className="mt-4 w-full"
                  onClick={handleDownloadQr}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR
                </Button>

                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={handleLoadQr}
                  disabled={loadingQr}
                >
                  Refresh QR
                </Button>
              </div>
            )}

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Customers can scan this QR code to
              access your PrintEasy upload page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

