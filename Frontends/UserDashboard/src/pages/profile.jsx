
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://profile-service-ls8g.onrender.com/api";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const uId = storedUser?.u_id;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    pro_id: "",
  });

  const [addresses, setAddresses] = useState([]);

  // Fetch user data
  const fetchUserData = async () => {
    setFetchError(null);
    try {
      // Profile data
      const res = await axios.get(`${API_BASE}/users/byuid/${uId}`);
      const profile = res.data;

      setFormData({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        phone: profile.phone_num || "",
        dateOfBirth: profile.dob ? profile.dob.split("T")[0] : "",
        pro_id: profile.pro_id,
      });

      // Addresses
     const addrRes = await axios.get(`${API_BASE}/address/all/${profile.pro_id}`);

      setAddresses(
        addrRes.data.length > 0
          ? addrRes.data
          : [
              {
                address_id: Date.now(),
                area: "",
                city: "",
                state: "",
                country: "",
                pin_code: "",
                isNew: true,
              },
            ]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError("Failed to load user data.");
    }
  };

  useEffect(() => {
    if (uId) fetchUserData();
  }, [uId]);

  // Input handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.address_id === id ? { ...addr, [field]: value } : addr
      )
    );
  };

  // Address controls
  const addNewAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        address_id: Date.now(),
        area: "",
        city: "",
        state: "",
        country: "",
        pin_code: "",
        isNew: true,
      },
    ]);
  };

  const removeAddress = (id) => {
    if (addresses.length > 1) {
      setAddresses((prev) => prev.filter((addr) => addr.address_id !== id));
    }
  };

  // Save profile & addresses
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const profilePayload = {
        u_id: uId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_num: formData.phone,
        dob: formData.dateOfBirth,
      };

      const res = await axios.post(`${API_BASE}/users/save`, profilePayload);
      const pro_id = res.data.pro_id;

      for (const addr of addresses) {
        const addrPayload = {
          pro_id,
          area: addr.area,
          city: addr.city,
          state: addr.state,
          country: addr.country,
          pin_code: addr.pin_code,
          label: addr.label || "",
        };

        if (addr.isNew || !addr.address_id) {
          await axios.post(`${API_BASE}/address/create`, addrPayload);
        } else {
          await axios.put(`${API_BASE}/address/${addr.address_id}`, addrPayload);
        }
      }

      alert("Profile & addresses saved successfully!");
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error("Error saving:", error);
      setSaveError("Failed to save. Please try again.");
    }

    setIsSaving(false);
  };

  // Display first address for header
  const primaryAddress = addresses[0] || {};

  return (
    
    <div className="container">
      <h1>
        {formData.firstName} {formData.lastName}
      </h1>
      <p>
        {primaryAddress.city || "---"}, {primaryAddress.state || "---"}
      </p>
      <p>
        {formData.phone.length === 10
          ? `+1 (${formData.phone.slice(0, 3)}) ${formData.phone.slice(3, 6)}-${formData.phone.slice(6)}`
          : "Phone not available"}
      </p>
      <button
        onClick={() => {
          if (isEditing) {
            fetchUserData();
            setSaveError(null);
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>

      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

      <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 20 }}>
        <h2>Personal Information</h2>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          disabled={!isEditing}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          disabled={!isEditing}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          disabled={!isEditing}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
            handleInputChange("phone", val);
          }}
          required
        />
        <input
          type="date"
          value={formData.dateOfBirth}
          disabled={!isEditing}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          required
        />

        <h2>Addresses</h2>
        {addresses.map((addr) => (
          <div
            key={addr.address_id}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
          >
            <input
              type="text"
              placeholder="Area"
              value={addr.area}
              disabled={!isEditing}
              onChange={(e) => handleAddressChange(addr.address_id, "area", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={addr.city}
              disabled={!isEditing}
              onChange={(e) => handleAddressChange(addr.address_id, "city", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={addr.state}
              disabled={!isEditing}
              onChange={(e) => handleAddressChange(addr.address_id, "state", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={addr.country}
              disabled={!isEditing}
              onChange={(e) => handleAddressChange(addr.address_id, "country", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Pin Code"
              value={addr.pin_code || ""}
              disabled={!isEditing}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                handleAddressChange(addr.address_id, "pin_code", val);
              }}
              required
            />
            {isEditing && addresses.length > 1 && (
              <button type="button" onClick={() => removeAddress(addr.address_id)}>
                Remove Address
              </button>
            )}
          </div>
        ))}

        {isEditing && (
          <>
            <button type="button" onClick={addNewAddress}>
              Add Address
            </button>
            <button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}

        {saveError && <p style={{ color: "red" }}>{saveError}</p>}
      </form>
<style jsx>{`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap");

  .container {
    min-height: 100vh;
    background: linear-gradient(135deg, #fefdfb 0%, #f6f8f6 50%, #faf9fb 100%);
    padding: 32px 16px;
    font-family: "Poppins", "Inter", system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 36px;
    font-weight: 600;
    color: #363d49;
    margin: 8px 0;
  }

  p {
    color: #737b8c;
    margin: 4px 0;
  }

  button {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #cdd5cd;
    border-radius: 12px;
    padding: 12px 32px;
    color: #363d49;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    margin-top: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  button:hover {
    background: rgba(246, 248, 246, 0.8);
    border-color: #a7bba7;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  form {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
    border-radius: 24px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 32px;
    margin-top: 32px;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  form h2 {
    font-size: 24px;
    font-weight: 600;
    color: #363d49;
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="tel"],
  input[type="date"] {
    width: 100%;
    height: 56px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #cdd5cd;
    border-radius: 12px;
    font-size: 16px;
    color: #363d49;
    transition: all 0.2s ease;
    outline: none;
    font-family: inherit;
  }

  input:focus {
    border-color: #e9d5ff;
    box-shadow: 0 0 0 3px rgba(233, 213, 255, 0.1);
  }

  input:disabled {
    background: rgba(246, 248, 246, 0.5);
    color: #737b8c;
    cursor: not-allowed;
  }

  .address-card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #f6f8f6;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .address-card:hover {
    border-color: #cdd5cd;
  }

  .address-card button {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 8px 16px;
    color: #dc2626;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .address-card button:hover {
    background: #fee2e2;
    border-color: #fca5a5;
  }

  .container p:last-of-type {
    margin-top: 32px;
    font-size: 14px;
    color: #737b8c;
  }

  @media (max-width: 768px) {
    form {
      padding: 24px;
    }

    h1 {
      font-size: 28px;
    }

    input {
      height: 48px;
    }
  }
`}</style>

      <p>Your information is secure and encrypted.</p>
    </div>
    
  );
};

export default UserProfile;
