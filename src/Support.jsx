import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";
import "./Support.css";

function Support() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const userId = 1; // later from token

  // LOAD TICKETS
  useEffect(() => {
    axios
      .get(`http://localhost:8088/support/tickets/${userId}`)
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  // SUBMIT TICKET
  const submitTicket = async () => {
    if (submitting) return;

    if (!subject || !message) {
      alert("Please fill subject and message");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:8088/support/ticket", {
        userId,
        subject,
        message
      });

      //  SUCCESS ALERT
      alert("✅ Your ticket has been raised successfully");

      setSubject("");
      setMessage("");

      // Reload tickets
      const res = await axios.get(
        `http://localhost:8088/support/tickets/${userId}`
      );
      setTickets(res.data);
    } catch (err) {
      alert("❌ Error submitting ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="support-container">
      {/* CREATE TICKET */}
      <Card className="support-card">
        <CardContent>
          <Typography className="support-title">
            Support Ticket
          </Typography>

          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <Button
            className="support-btn"
            fullWidth
            disabled={submitting}
            onClick={submitTicket}
          >
            {submitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </CardContent>
      </Card>

      {/* TICKET TABLE */}
      <div className="support-table-wrapper">
        <table className="support-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td colSpan="3" className="no-ticket">
                  No tickets raised yet
                </td>
              </tr>
            )}

            {tickets.map(t => (
              <tr key={t.id}>
                <td>{t.subject}</td>
                <td>{t.message}</td>
                <td>
                  <span
                    className={`ticket-status-badge ${
                      t.status === "OPEN"
                        ? "ticket-open"
                        : t.status === "CLOSED"
                        ? "ticket-closed"
                        : "ticket-progress"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

export default Support;
