import apiClient from "@/services/api-client";
import { CaseInfo } from "@/Types/Organization/CaseTypes";
import { FetchLeadsProps } from "@/Types/Organization/LeadTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { Advisor } from "../../../AdvisorList/AdvisorListBody";
import "../../ActivityStatus.css";
import AddNewCaseModal from "../../Modals/AddNewCaseModal";

const CaseTable: React.FC<FetchLeadsProps> = ({
  setIsFetchedLead,
  isFetchedLead,
}) => {
  const [caseInfo, setCaseInfo] = useState<CaseInfo[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNewCaseModalOpen, setIsAddNewCaseModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage] = useState(10);
  const [showRemovedCases, setShowRemovedCases] = useState(false);

  const [filters, setFilters] = useState({
    created_by: "", // Employee ID should be a number
    case_category: "",
    applicant_type: "",
    case_status: "",
    case_stage: "",
    is_removed: "", // Boolean value for removed cases
  });

  const toggleRemovedCases = () => {
    setShowRemovedCases((prevState) => !prevState);
    handleFilterChange("is_removed", showRemovedCases ? "false" : "true");
  };

  const toggleAddNewCaseModal = () =>
    setIsAddNewCaseModalOpen(!isAddNewCaseModalOpen);
  const openAddNewCaseModal = () => {
    toggleAddNewCaseModal();
  };

  const fetchAdvisors = async () => {
    try {
      const response = await apiClient.get("/director/advisors/");
      const AdvisorsData = Array.isArray(response.data)
        ? response.data
        : response.data.advisors;
      setAdvisors(AdvisorsData || []);
    } catch (error) {
      console.error("Error fetching Advisors:", error);
      setAdvisors([]);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchCaseInfo = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters, // Ensure all filters are included
        search: searchQuery, // Add the search query to the API call
      });
      console.log("Filters applied:", filters, "Search query:", searchQuery); // Check filters and search query
      const response = await apiClient.get(`/cases?${queryParams.toString()}`);
      setCaseInfo(response.data || []);
    } catch (error) {
      console.error("Error Fetching Cases", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseInfo();
  }, [filters, searchQuery]); // Re-run the fetchCaseInfo function when filters change

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const filteredCases = caseInfo.slice(
    (currentPage - 1) * casesPerPage,
    currentPage * casesPerPage
  );

  const pageCount = Math.ceil(caseInfo.length / casesPerPage);

  return (
    <Card>
      <CardHeader>
        <Row className="flex justify-content-between">
          <Col md="3">
            <h3>All Cases</h3>
          </Col>
          <Col>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search Case ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupText className="bg-success rounded-start-0 border-start-0">
                <FaSearch />
              </InputGroupText>
            </InputGroup>
          </Col>
          <Col md="3" xs="12" className="text-md-end text-center mt-2 mt-md-0">
            <Button color="primary" onClick={openAddNewCaseModal}>
              Add New Case
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-0 m-0 mt-3">
        {/* Filter Options */}
        <Card className="shadow-lg rounded-1 p-3">
          <Row className="justify-content-center text-center g-3">
            {/* Employee Filter */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Input
                type="select"
                id="employeeFilter"
                className="py-1"
                onChange={(e) =>
                  handleFilterChange("created_by", e.target.value)
                }
              >
                <option value="">Select Employee</option>
                {advisors &&
                  advisors.map((advisor) => (
                    <option key={advisor.alias} value={advisor.user.id}>
                      {advisor.user.first_name} {advisor.user.last_name}
                    </option>
                  ))}
              </Input>
            </Col>

            {/* Case Category Filter */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Input
                type="select"
                id="caseCategory"
                className="py-1"
                onChange={(e) =>
                  handleFilterChange("case_category", e.target.value)
                }
              >
                <option value="">Select Categories</option>
                <option value="MORTGAGE">Mortgage</option>
                <option value="PROTECTION">Protection</option>
                <option value="GENERAL_INSURANCE">General Insurance</option>
              </Input>
            </Col>

            {/* Application Type Filter */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Input
                type="select"
                id="applicationType"
                className="py-1"
                onChange={(e) =>
                  handleFilterChange("applicant_type", e.target.value)
                }
              >
                <option value="">Select Types</option>
                <option value="SINGLE">Single</option>
                <option value="JOINT">Joint</option>
              </Input>
            </Col>

            {/* Case Status Filter */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Input
                type="select"
                id="caseStatus"
                className="py-1"
                onChange={(e) =>
                  handleFilterChange("case_status", e.target.value)
                }
              >
                <option value="">Select Status</option>
                <option value="NEW_LEAD">New Lead</option>
                <option value="CALL_BACK">Call Back</option>
                <option value="MEETING">Meeting</option>
              </Input>
            </Col>

            {/* Case Stage Filter */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Input
                type="select"
                id="caseStage"
                className="py-1"
                onChange={(e) =>
                  handleFilterChange("case_stage", e.target.value)
                }
              >
                <option value="">Select Stages</option>
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
            </Col>

            {/* Show Removed Cases Button */}
            <Col xs="12" sm="6" md="4" lg="2">
              <Button
                className={`btn w-100 ${
                  showRemovedCases ? "btn-success" : "btn-danger"
                }`}
                onClick={toggleRemovedCases}
              >
                {showRemovedCases ? "All Cases" : "Removed Cases"}
              </Button>
            </Col>
          </Row>
        </Card>
      </CardBody>
      {/* Card Body */}
      <CardBody className="p-0 m-0">
        <Table bordered hover responsive>
          <thead className="thead-light text-center">
            <tr>
              <th>Case Name</th>
              <th>Lead User</th>
              <th>Phone</th>
              <th>Case Category</th>
              <th>Applicant Type</th>
              <th>Case Status</th>
              <th>Case Stage</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner color="primary" />
                  </div>
                </td>
              </tr>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <tr key={caseItem.alias}>
                  <td>
                    <Link href={`/dashboard/organization/${caseItem.alias}`}>
                      <span className="text-black custom-hover">
                        {caseItem.name}
                      </span>
                    </Link>
                  </td>
                  <td>
                    {caseItem.lead_user
                      ? `${caseItem.lead_user.first_name} ${caseItem.lead_user.last_name}`
                      : "N/A"}
                  </td>
                  <td>{caseItem.lead_user.phone}</td>
                  <td>{caseItem.case_category}</td>
                  <td>{caseItem.applicant_type}</td>
                  <td>{caseItem.case_status}</td>
                  <td>
                    <span
                      className={`rounded-4 px-2 text-white ${
                        caseItem.case_stage === "INQUIRY"
                          ? "bg-success"
                          : caseItem.case_stage === "FACT_FIND"
                          ? "bg-warning"
                          : caseItem.case_stage === "RESEARCH_COMPLIANCE_CHECK"
                          ? "bg-dark"
                          : caseItem.case_stage === "DECISION_IN_PRINCIPLE"
                          ? "bg-info"
                          : caseItem.case_stage === "FULL_MORTGAGE_APPLICATION"
                          ? "bg-light"
                          : caseItem.case_stage === "OFFER_FROM_BANK"
                          ? "bg-dark"
                          : caseItem.case_stage === "LEGAL"
                          ? "bg-warning"
                          : caseItem.case_stage === "COMPLETION"
                          ? "bg-primary"
                          : caseItem.case_stage === "FUTURE_OPPORTUNITY"
                          ? "bg-info"
                          : caseItem.case_stage === "NOT_PROCEED"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {caseItem.case_stage}
                    </span>
                  </td>

                  <td>
                    {caseItem.created_by?.first_name}{" "}
                    {caseItem.created_by?.last_name}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        size="sm"
                        color="success"
                        title="Edit"
                        className="me-2"
                      >
                        <i className="icon-pencil-alt"></i>
                      </Button>
                      <Button size="sm" color="danger" title="Delete Case">
                        <i className="icon-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination className="d-flex justify-content-end p-2">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => setCurrentPage(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          {pageCount <= 5 ? (
            Array.from({ length: pageCount }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PaginationItem
                  key={pageNumber}
                  active={pageNumber === currentPage}
                >
                  <PaginationLink onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            )
          ) : (
            <>
              <PaginationItem active={currentPage === 1}>
                <PaginationLink onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && (
                <PaginationItem disabled>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              )}

              {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                .filter((page) => page > 1 && page < pageCount)
                .map((pageNumber) => (
                  <PaginationItem
                    key={pageNumber}
                    active={pageNumber === currentPage}
                  >
                    <PaginationLink onClick={() => setCurrentPage(pageNumber)}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {currentPage < pageCount - 2 && (
                <PaginationItem disabled>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem active={currentPage === pageCount}>
                <PaginationLink onClick={() => setCurrentPage(pageCount)}>
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem disabled={currentPage === pageCount}>
            <PaginationLink
              next
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === pageCount}>
            <PaginationLink last onClick={() => setCurrentPage(pageCount)} />
          </PaginationItem>
        </Pagination>
      </CardBody>

      {/* Modals */}
      <AddNewCaseModal
        isOpen={isAddNewCaseModalOpen}
        toggle={toggleAddNewCaseModal}
        isFetchedLead={isFetchedLead}
        setIsFetchedLead={setIsFetchedLead}
        onSave={() => fetchCaseInfo()}
      />
    </Card>
  );
};

export default CaseTable;
