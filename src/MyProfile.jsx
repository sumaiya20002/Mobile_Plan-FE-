import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";
import "./MyProfile.css";

function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const userId = 1; // later take from token

  useEffect(() => {
    axios
      .get(`http://localhost:8088/users/${userId}`)
      .then(res => {
        setProfile({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8088/users/update/${userId}`, profile);
      alert("Profile updated successfully");
    } catch {
      alert("Error updating profile");
    }
  };

  return (
    <Box className="profile-container">
      <Card className="profile-card">
        <CardContent>
          <Typography className="profile-title">
            My Profile
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={profile.name}
            onChange={e =>
              setProfile({ ...profile, name: e.target.value })
            }
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={profile.email}
            disabled
          />

          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={profile.phone}
            onChange={e =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />

          <Button
            className="profile-btn"
            fullWidth
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyProfile;
