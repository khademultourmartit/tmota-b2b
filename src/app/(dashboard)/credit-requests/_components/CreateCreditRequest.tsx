"use client";

import React, { useState, FormEvent } from "react";
import { createCreditRequest } from "@/features/agent/credit-request/apis/service";
import { handleApiErrors } from "@/utils/api-utils/hanle-api-error";
import { SuccessAlert } from "@/components/alerts/SuccessAlert";
import { Grid, Box, Typography, Button } from "@mui/material";
import { CustomInput } from "@/components/custom/CustomInput";
import { ErrorAlert } from "@/components/alerts/ErrorAlert";
import { useRouter } from "next/navigation";

const CreateCreditRequest: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({});

  const handleChange = ({ target }: any) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newData = { ...formData };

    if (newData.dueDateTime)
      newData.dueDateTime = new Date(newData.dueDateTime).toISOString();

    try {
      const result = await createCreditRequest(formData);
      if (result.data) {
        SuccessAlert("Request submitted successfully");
        router.push("/credit-requests");
      }
    } catch (error) {
      const errorMessage = handleApiErrors(error);
      ErrorAlert(errorMessage);
    }
  };

  return (
    <Box className="container">
      <Box className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <Typography className="form-title">Create Cedit Request</Typography>
          <Grid container spacing={2} rowSpacing={3}>
            <Grid item xs={12} md={4}>
              <label className="form-label">
                <span className="form-required">*</span> Amount
              </label>
              <CustomInput
                required
                type="number"
                name="amount"
                onChange={handleChange}
                placeholder="Enter Amount"
                value={formData.amount || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <label className="form-label">Due Date Time</label>
              <CustomInput
                name="dueDateTime"
                type="datetime-local"
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                value={formData.dueDateTime}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <label className="form-label">Notes</label>
              <CustomInput
                name="userNotes"
                onChange={handleChange}
                placeholder="Enter Notes"
                value={formData.userNotes || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateCreditRequest;
