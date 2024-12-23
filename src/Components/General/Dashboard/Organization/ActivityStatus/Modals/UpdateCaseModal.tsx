import apiClient from "@/services/api-client";
import { CaseInfo, UpdateCaseModalProps } from "@/Types/Organization/CaseTypes";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const UpdateCaseModal: React.FC<UpdateCaseModalProps> = ({
  isOpen,
  toggle,
  caseData,
  onSave,
}) => {
  const [formData, setFormData] = useState<CaseInfo>(caseData);

  useEffect(() => {
    setFormData(caseData);
  }, [caseData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await apiClient.put(`/cases/${caseData.alias}/`, formData);
      onSave();
      toggle();
    } catch (error) {
      console.error("Error updating case:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Update Case</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="case_category">Case Category</Label>
            <Input
              type="select"
              name="case_category"
              id="case_category"
              value={formData?.case_category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="MORTGAGE">Mortgage</option>
              <option value="PROTECTION">Protection</option>
              <option value="GENERAL_INSURANCE">General Insurance</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="applicant_type">Applicant Type</Label>
            <Input
              type="select"
              name="applicant_type"
              id="applicant_type"
              value={formData?.applicant_type}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="SINGLE">Single</option>
              <option value="JOINT">Joint</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="case_status">Case Status</Label>
            <Input
              type="select"
              name="case_status"
              id="case_status"
              value={formData?.case_status}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="NEW_LEAD">New Lead</option>
              <option value="CALL_BACK">Call Back</option>
              <option value="MEETING">Meeting</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="case_stage">Case Stage</Label>
            <Input
              type="select"
              name="case_stage"
              id="case_stage"
              value={formData?.case_stage}
              onChange={handleInputChange}
            >
              <option value="">Select Stage</option>
              <option value="INQUIRY">Inquiry</option>
              <option value="FACT_FIND">Fact Find</option>
              <option value="RESEARCH_COMPLIANCE_CHECK">
                Research and Compliance Check
              </option>
              <option value="DECISION_IN_PRINCIPLE">
                Decision in Principle
              </option>
              <option value="FULL_MORTGAGE_APPLICATION">
                Full Mortgage Application
              </option>
              <option value="OFFER_FROM_BANK">Offer From Bank</option>
              <option value="LEGAL">Legal</option>
              <option value="COMPLETION">Completion</option>
              <option value="FUTURE_OPPORTUNITY">Future Opportunity</option>
              <option value="NOT_PROCEED">Not Proceed</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateCaseModal;