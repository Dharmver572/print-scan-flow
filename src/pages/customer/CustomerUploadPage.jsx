
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Upload,
  FileText,
  X,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/api";

const createDefaultSettings = () => ({
  printSides: "SINGLE_SIDE",
  colorMode: "BLACK_WHITE",
  copies: 1,
});

export function CustomerUploadPage() {
  const [searchParams] = useSearchParams();

  const shopToken = searchParams.get("shop");

  const [customerName, setCustomerName] = useState("");
  const [files, setFiles] = useState([]);
  const [printSettings, setPrintSettings] = useState([]);
  const [uploading, setUploading] = useState(false);

  // =========================
  // FILE SELECT
  // =========================

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (!selectedFiles.length) {
      return;
    }

    const newSettings = selectedFiles.map(() =>
      createDefaultSettings()
    );

    setFiles((previousFiles) => [
      ...previousFiles,
      ...selectedFiles,
    ]);

    setPrintSettings((previousSettings) => [
      ...previousSettings,
      ...newSettings,
    ]);

    event.target.value = "";
  };

  // =========================
  // REMOVE FILE
  // =========================

  const removeFile = (index) => {
    setFiles((previousFiles) =>
      previousFiles.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );

    setPrintSettings((previousSettings) =>
      previousSettings.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );
  };

  // =========================
  // UPDATE PRINT SETTINGS
  // =========================

  const updatePrintSetting = (
    index,
    field,
    value
  ) => {
    setPrintSettings((previousSettings) =>
      previousSettings.map((settings, settingsIndex) =>
        settingsIndex === index
          ? {
              ...settings,
              [field]: value,
            }
          : settings
      )
    );
  };

  // =========================
  // UPLOAD
  // =========================

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!shopToken) {
      toast.error("Invalid shop QR code.");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!files.length) {
      toast.error("Please select at least one file.");
      return;
    }

    if (printSettings.length !== files.length) {
      toast.error(
        "Print settings are missing for some files."
      );
      return;
    }

    try {
      setUploading(true);

      await api.uploadDocuments({
        shopToken,
        customerName: customerName.trim(),
        files,
        printSettings,
      });

      toast.success(
        "Documents uploaded successfully!"
      );

      setCustomerName("");
      setFiles([]);
      setPrintSettings([]);
    } catch (error) {
      toast.error(
        error?.message ||
          "Failed to upload documents."
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // INVALID SHOP
  // =========================

  if (!shopToken) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-xl px-4 py-16">
          <div className="rounded-xl border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold">
              Invalid QR Code
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              This upload link does not contain a valid
              shop token.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">
            Upload Documents
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Select your documents and choose your
            printing preferences.
          </p>
        </div>

        <form
          onSubmit={handleUpload}
          className="space-y-6"
        >

          {/* CUSTOMER NAME */}
          <div className="rounded-xl border bg-card p-6">
            <div className="space-y-2">
              <Label htmlFor="customerName">
                Your Name
              </Label>

              <Input
                id="customerName"
                placeholder="Enter your name"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                disabled={uploading}
                required
              />
            </div>
          </div>

          {/* FILE SELECT */}
          <div className="rounded-xl border bg-card p-6">
            <Label>Documents</Label>

            <label
              htmlFor="files"
              className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition hover:bg-muted/50"
            >
              <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">
                Click to select documents
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                You can select multiple files
              </p>

              <Input
                id="files"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>

          {/* FILES */}
          {files.length > 0 && (
            <div className="space-y-4">

              <div>
                <h2 className="text-lg font-semibold">
                  Print Settings
                </h2>

                <p className="text-sm text-muted-foreground">
                  Configure printing options for each
                  document.
                </p>
              </div>

              {files.map((file, index) => {
                const settings =
                  printSettings[index];

                return (
                  <div
                    key={`${file.name}-${index}`}
                    className="rounded-xl border bg-card p-5"
                  >

                    {/* FILE HEADER */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {file.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(
                              2
                            )}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeFile(index)
                        }
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* SETTINGS */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">

                      {/* SIDES */}
                      <div className="space-y-2">
                        <Label>
                          Print Sides
                        </Label>

                        <select
                          value={
                            settings?.printSides ||
                            "SINGLE_SIDE"
                          }
                          onChange={(event) =>
                            updatePrintSetting(
                              index,
                              "printSides",
                              event.target.value
                            )
                          }
                          disabled={uploading}
                          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        >
                          <option value="SINGLE_SIDE">
                            Single Side
                          </option>

                          <option value="DOUBLE_SIDE">
                            Double Side
                          </option>
                        </select>
                      </div>

                      {/* COLOR */}
                      <div className="space-y-2">
                        <Label>
                          Color Mode
                        </Label>

                        <select
                          value={
                            settings?.colorMode ||
                            "BLACK_WHITE"
                          }
                          onChange={(event) =>
                            updatePrintSetting(
                              index,
                              "colorMode",
                              event.target.value
                            )
                          }
                          disabled={uploading}
                          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        >
                          <option value="BLACK_WHITE">
                            Black & White
                          </option>

                          <option value="COLOR">
                            Color
                          </option>
                        </select>
                      </div>

                      {/* COPIES */}
                      <div className="space-y-2">
                        <Label>
                          Copies
                        </Label>

                        <div className="relative">
                          <Copy className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={
                              settings?.copies || 1
                            }
                            onChange={(event) =>
                              updatePrintSetting(
                                index,
                                "copies",
                                Math.max(
                                  1,
                                  Number(
                                    event.target.value
                                  ) || 1
                                )
                              )
                            }
                            disabled={uploading}
                            className="pl-9"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={
              uploading ||
              !customerName.trim() ||
              files.length === 0
            }
          >
            {uploading
              ? "Uploading Documents..."
              : `Upload ${
                  files.length
                    ? `${files.length} Document${
                        files.length > 1
                          ? "s"
                          : ""
                      }`
                    : "Documents"
                }`}
          </Button>

        </form>
      </div>
    </div>
  );
}

