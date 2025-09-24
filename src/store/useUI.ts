/**
 * UI State Management Hook
 * Manages global UI state like modals, loading states, etc.
 */

import { useState, useCallback } from "react";

interface UseUIState {
  // Modal states
  isPreviewModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isExportModalOpen: boolean;

  // Loading states
  isSaving: boolean;
  isExporting: boolean;
  isUploading: boolean;

  // Other UI states
  previewDevice: "desktop" | "mobile" | "full";
  sidebarCollapsed: boolean;

  // Actions
  openPreviewModal: () => void;
  closePreviewModal: () => void;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  openExportModal: () => void;
  closeExportModal: () => void;
  setPreviewDevice: (device: "desktop" | "mobile" | "full") => void;
  toggleSidebar: () => void;
  setLoading: (
    type: "saving" | "exporting" | "uploading",
    loading: boolean
  ) => void;
}

export const useUI = (): UseUIState => {
  // Modal states
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Other UI states
  const [previewDevice, setPreviewDeviceState] = useState<
    "desktop" | "mobile" | "full"
  >("desktop");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modal actions
  const openPreviewModal = useCallback(() => setIsPreviewModalOpen(true), []);
  const closePreviewModal = useCallback(() => setIsPreviewModalOpen(false), []);
  const openSettingsModal = useCallback(() => setIsSettingsModalOpen(true), []);
  const closeSettingsModal = useCallback(
    () => setIsSettingsModalOpen(false),
    []
  );
  const openExportModal = useCallback(() => setIsExportModalOpen(true), []);
  const closeExportModal = useCallback(() => setIsExportModalOpen(false), []);

  // Device preview
  const setPreviewDevice = useCallback(
    (device: "desktop" | "mobile" | "full") => {
      setPreviewDeviceState(device);
    },
    []
  );

  // Sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Loading states
  const setLoading = useCallback(
    (type: "saving" | "exporting" | "uploading", loading: boolean) => {
      switch (type) {
        case "saving":
          setIsSaving(loading);
          break;
        case "exporting":
          setIsExporting(loading);
          break;
        case "uploading":
          setIsUploading(loading);
          break;
      }
    },
    []
  );

  return {
    // States
    isPreviewModalOpen,
    isSettingsModalOpen,
    isExportModalOpen,
    isSaving,
    isExporting,
    isUploading,
    previewDevice,
    sidebarCollapsed,

    // Actions
    openPreviewModal,
    closePreviewModal,
    openSettingsModal,
    closeSettingsModal,
    openExportModal,
    closeExportModal,
    setPreviewDevice,
    toggleSidebar,
    setLoading,
  };
};
