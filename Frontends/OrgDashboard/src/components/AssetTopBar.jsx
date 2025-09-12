import React from "react";
import { useNavigate } from "react-router-dom";
import { FiRefreshCw, FiMap, FiPlus, FiDownload, FiUpload } from "react-icons/fi";
import "../styles/AssetTopBar.css"; // Import the CSS file

const AssetTopBar = ({ fetchAssets, onBulkUpload, onExport, onMapView }) => {
  // This effect will run when window gets focus — auto refresh
  React.useEffect(() => {
    const handleFocus = () => {
      if (fetchAssets) fetchAssets();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchAssets]);

  const navigate = useNavigate();

  const handleAddAsset = () => {
    console.log("Add Asset button clicked");
    try {
      navigate("/add-asset");
      console.log("Navigation successful");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleExport = () => {
    // Placeholder: Integrate actual export logic here
    // For example: exportAssets("csv") from parent component
    console.log("Export clicked");
    if (onExport) onExport();
  };

  const handleMapView = () => {
    // Placeholder: Integrate map view logic here
    // For example: setShowMap(true) from parent component
    console.log("Map View clicked");
    if (onMapView) onMapView();
  };

  const handleBulkUpload = () => {
    // Placeholder: Integrate bulk upload logic here
    // For example: setShowBulkUpload(true) from parent component
    console.log("Bulk Upload clicked");
    if (onBulkUpload) onBulkUpload();
  };

  return (
    <div className="asset-topbar">
      {/* Left side: Title and subtitle */}
      <div className="topbar-left">
        <h1 className="title">Asset Management</h1>
        <p className="subtitle">
          Manage and monitor your carbon credit generating assets
        </p>
      </div>

      {/* Right side: Action buttons */}
      <div className="topbar-actions">
        {/* Refresh */}
        <button className="btn" onClick={fetchAssets} disabled={!fetchAssets}>
          <FiRefreshCw className="icon" />
          <span>Refresh</span>
        </button>

        {/* Map View */}
        <button className="btn" onClick={handleMapView}>
          <FiMap className="icon" />
          <span>Map View</span>
        </button>

        {/* Bulk Upload */}
        <button className="btn" onClick={handleBulkUpload}>
          <FiUpload className="icon" />
          <span>Bulk Upload</span>
        </button>

        {/* Export */}
        <button className="btn" onClick={handleExport}>
          <FiDownload className="icon" />
          <span>Export</span>
        </button>

        {/* Add Asset */}
        <button className="btn btn-primary" onClick={handleAddAsset}>
          <FiPlus className="icon" />
          <span>Add Asset</span>
        </button>
      </div>
    </div>
  );
};

export default AssetTopBar;