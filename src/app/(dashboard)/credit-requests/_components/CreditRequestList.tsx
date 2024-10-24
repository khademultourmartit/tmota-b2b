"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  Collapse,
  Tabs,
  Tab,
  MenuItem,
  ThemeProvider,
  Stack,
  Pagination,
} from "@mui/material";
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Search,
  RestartAlt,
} from "@mui/icons-material";
import { getCreditRequests } from "@/features/agent/credit-request/apis/service";
import { CustomPaginationSelect } from "@/components/custom/CustomPaginationSelect";
import { CustomSearchInput } from "@/components/custom/CustomSearchInput";
import { PaginationTheme } from "@/components/custom/PaginationTheme";
import { useRouter } from "next/navigation";
import moment from "moment";

const CreditRequestList = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<any>("ALL");
  const [creditRequests, setCreditRequests] = useState([]);

  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    (async () => {
      const query = {
        page: pageNo,
        limit: limit,
        requestStatus: selectedTab,
      };

      const {
        data: { payload },
      } = await getCreditRequests(query);

      setSearchData(payload.data);
      setCreditRequests(payload.data);
      setPageCount(payload?.meta?.totalPages);
    })();
  }, [selectedTab, limit, pageNo]);

  const handleExpandClick = (id: any) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleTabChange = (e: any, value: any) => {
    setSelectedTab(value);
  };

  const handelSearchItems = (e: any) => {
    const searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = creditRequests.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchData(filterData);
    } else if (searchInput === "") {
      setSearchData(creditRequests);
    }
  };

  const handlePageChange = (event: any, value: any) => {
    setPageNo(value);
  };

  const handlePage = (value: any) => {
    setLimit(value);
  };

  return (
    <Box>
      <Box className="main-box">
        {/* Tab Section */}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          className="tabs-container"
        >
          <Tab
            label="ALL"
            value="ALL"
            className={`all-tab ${selectedTab === 0 ? "selected" : ""}`}
          />
          <Tab
            label="Pending"
            value="PENDING"
            className={`pending-tab ${selectedTab === 1 ? "selected" : ""}`}
          />
          <Tab
            label="Approved"
            value="APPROVED"
            className={`approved-tab ${selectedTab === 2 ? "selected" : ""}`}
          />
          <Tab
            label="Rejected"
            value="REJECTED"
            className={`rejected-tab ${selectedTab === 3 ? "selected" : ""}`}
          />
        </Tabs>

        {/* Top Bar Section */}
        <Box className="topbar-container">
          <Box className="search-section">
            <Box className="placeholderColor">
              <Search className="search-icon" />
              <CustomSearchInput
                type="text"
                placeholder="Quick Search"
                onChange={handelSearchItems}
                className="custom-search-input"
              />
            </Box>

            <Box className="pagination-section">
              <Typography className="typography">View</Typography>
              <CustomPaginationSelect
                className="custom-pagination-select"
                onChange={(e) => handlePage(e.target.value)}
                defaultValue={10}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </CustomPaginationSelect>
            </Box>

            <Box className="filter-section">
              <Typography className="typography">Filter</Typography>
              <FilterList className="filter-icon" />
            </Box>

            <Box className="reset-section">
              <Typography className="typography">Reset</Typography>
              <RestartAlt className="reset-icon" />
            </Box>
          </Box>

          <Box className="button-section">
            <button
              className="add-button"
              onClick={() => router.push("/credit-requests/create")}
            >
              Add Request
            </button>
          </Box>
        </Box>

        {/* Table Section */}
        <TableContainer className="table-container">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell" />
                <TableCell className="table-header-cell">Date</TableCell>
                <TableCell className="table-header-cell">Amount</TableCell>
                <TableCell className="table-header-cell">Due Date</TableCell>
                <TableCell className="table-header-cell">User Notes</TableCell>
                <TableCell className="table-header-cell">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(searchData || []).map((creditReq: any) => (
                <React.Fragment key={creditReq.id}>
                  <TableRow
                    className={
                      expanded === creditReq.id ? "expand-row" : "collapsed-row"
                    }
                  >
                    <TableCell className="table-body-cell">
                      <IconButton
                        size="small"
                        className="collapsed-icon-button"
                        onClick={() => handleExpandClick(creditReq.id)}
                      >
                        {expanded === creditReq.id ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell className="table-body-cell">
                      {moment(creditReq.createdDateTime).format("DD-MMM-YYYY")}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {(+creditReq.amount).toFixed(2)}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {moment(creditReq.dueDateTime).format(
                        "DD-MMM-YYYY hh:mm A"
                      )}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {creditReq.userNotes}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {creditReq.requestStatus}
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row */}
                  <TableRow className="expand-row">
                    <TableCell colSpan={12} className="expand-cell">
                      <Collapse
                        in={expanded === creditReq.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box className="expand-content">
                          <Typography className="typography">
                            Created By:{" "}
                            {`${creditReq.createdByUser?.firstname} ${creditReq.createdByUser?.lastname}`}
                          </Typography>

                          <Typography className="typography">
                            Updated By:{" "}
                            {creditReq.updatedByUser
                              ? `${creditReq.updatedByUser.firstname} ${creditReq.updatedByUser.lastname}`
                              : "N/A"}
                          </Typography>

                          {creditReq.requestStatus === "ACC_APPROVED" && (
                            <Typography className="typography">
                              Acc Approved By:{" "}
                              {creditReq.approvedByAccountUser
                                ? `${creditReq.approvedByAccountUser.firstname} ${creditReq.approvedByAccountUser.lastname}`
                                : "N/A"}
                            </Typography>
                          )}

                          {creditReq.requestStatus === "KAM_APPROVED" && (
                            <Typography className="typography">
                              Kam Approved By:{" "}
                              {creditReq.approvedByKamUser
                                ? `${creditReq.approvedByKamUser.firstname} ${creditReq.approvedByKamUser.lastname}`
                                : "N/A"}
                            </Typography>
                          )}

                          {creditReq.requestStatus === "REJECTED" && (
                            <>
                              <Typography className="typography">
                                Rejected By:{" "}
                                {creditReq.updatedByUser
                                  ? `${creditReq.updatedByUser.firstname} ${creditReq.updatedByUser.lastname}`
                                  : "N/A"}
                              </Typography>
                              <Typography className="typography">
                                Rejection Reason: {creditReq.adminRemarks}
                              </Typography>
                            </>
                          )}

                          <Typography className="typography">
                            Created Date:{" "}
                            {moment(creditReq.createdDateTime).format(
                              "DD-MMM-YYYY h:mm A"
                            )}
                          </Typography>

                          <Typography className="typography">
                            Updated Date:{" "}
                            {moment(creditReq.updatedDateTime).format(
                              "DD-MMM-YYYY h:mm A"
                            )}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {creditRequests.length ? (
        <Box className="pagination-container">
          <ThemeProvider theme={PaginationTheme}>
            <Stack spacing={2}>
              <Pagination
                color="primary"
                count={pageCount}
                onChange={handlePageChange}
              />
            </Stack>
          </ThemeProvider>
        </Box>
      ) : null}
    </Box>
  );
};

export default CreditRequestList;
