// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Box,
//   Typography,
//   Collapse,
//   Tabs,
//   Tab,
//   MenuItem,
//   ThemeProvider,
//   Stack,
//   Pagination,
// } from "@mui/material";
// import {
//   FilterList,
//   ExpandMore,
//   ExpandLess,
//   Search,
// } from "@mui/icons-material";
// import moment from "moment";
// import { getCreditRequests } from "@/features/agent/credit-request/apis/service";
// import { CustomPaginationSelect } from "@/components/custom/CustomPaginationSelect";
// import { CustomSearchInput } from "@/components/custom/CustomSearchInput";
// import { PaginationTheme } from "@/components/custom/PaginationTheme";

// const CreditRequestList = () => {
//   const [selectedTab, setSelectedTab] = useState<any>("ALL");
//   const [creditRequests, setCreditRequests] = useState([]);

//   const [limit, setLimit] = useState(10);
//   const [pageNo, setPageNo] = useState(1);
//   const [pageCount, setPageCount] = useState(0);
//   const [expanded, setExpanded] = useState(null);
//   const [searchData, setSearchData] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const query = {
//         page: pageNo,
//         limit: limit,
//         requestStatus: selectedTab,
//       };

//       const {
//         data: { payload },
//       } = await getCreditRequests(query);

//       setSearchData(payload.data);
//       setCreditRequests(payload.data);
//       setPageCount(payload?.meta?.totalPages);
//     })();
//   }, [selectedTab, limit, pageNo]);

//   const handleExpandClick = (id: any) => {
//     setExpanded((prev) => (prev === id ? null : id));
//   };

//   const handleTabChange = (e: any, value: any) => {
//     setSelectedTab(value);
//   };

//   const handelSearchItems = (e: any) => {
//     const searchInput = e.target.value;
//     if (searchInput !== "") {
//       const filterData = creditRequests.filter((item) => {
//         return Object.values(item)
//           .join("")
//           .toLowerCase()
//           .includes(searchInput.toLowerCase());
//       });
//       setSearchData(filterData);
//     } else if (searchInput === "") {
//       setSearchData(creditRequests);
//     }
//   };

//   const handlePageChange = (event: any, value: any) => {
//     setPageNo(value);
//   };

//   const handlePage = (value: any) => {
//     setLimit(value);
//   };

//   // const handlePrint = () => {
//   //   window.print();
//   // };

//   return (
//     <Box>
//       <Box
//         sx={{
//           padding: "16px",
//           backgroundColor: "#FFFFFF",
//           borderRadius: "12px",
//         }}
//       >
//         <Tabs
//           value={selectedTab}
//           onChange={handleTabChange}
//           sx={{
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#A56EB4",
//               height: "4px",
//               borderRadius: "2px",
//             },
//           }}
//         >
//           <Tab
//             label="ALL"
//             value={"ALL"}
//             sx={{
//               textTransform: "none",
//               fontWeight: selectedTab === 0 ? "semiBold" : "normal",
//               color: selectedTab === 0 ? "#6E6996" : "#B4B4CD",
//               "&.Mui-selected": {
//                 color: "#6E6996",
//                 fontSize: "15px",
//               },
//             }}
//           />
//           <Tab
//             label="Pending"
//             value={"PENDING"}
//             sx={{
//               textTransform: "none",
//               fontWeight: selectedTab === 1 ? "semiBold" : "normal",
//               color: selectedTab === 1 ? "#6E6996" : "#B4B4CD",
//               "&.Mui-selected": {
//                 color: "#6E6996",
//                 fontSize: "15px",
//               },
//             }}
//           />
//           <Tab
//             label="Approved"
//             value={"APPROVED"}
//             sx={{
//               textTransform: "none",
//               fontWeight: selectedTab === 0 ? "semiBold" : "normal",
//               color: selectedTab === 0 ? "#6E6996" : "#B4B4CD",
//               "&.Mui-selected": {
//                 color: "#6E6996",
//                 fontSize: "15px",
//               },
//             }}
//           />
//           <Tab
//             label="Rejected"
//             value={"REJECTED"}
//             sx={{
//               textTransform: "none",
//               fontWeight: selectedTab === 2 ? "semiBold" : "normal",
//               color: selectedTab === 2 ? "#6E6996" : "#B4B4CD",
//               "&.Mui-selected": {
//                 color: "#6E6996",
//                 fontSize: "15px",
//               },
//             }}
//           />
//         </Tabs>

//         <Box
//           sx={{
//             height: "2px",
//             backgroundColor: "#A56EB4",
//             borderRadius: "2px",
//             marginTop: "16px",
//             marginBottom: "16px",
//           }}
//         />
//         {/* Top Bar */}
//         <Box
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderRadius: "12px",
//           }}
//           mb={2}
//         >
//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               position: "relative",
//             }}
//           >
//             <Box
//               style={{ position: "relative" }}
//               className={"placeholderColor"}
//             >
//               <Search
//                 style={{
//                   position: "absolute",
//                   top: "7px",
//                   left: "5px",
//                   color: "#B4B4CD",
//                   zIndex: 1,
//                 }}
//               />
//               <CustomSearchInput
//                 onChange={handelSearchItems}
//                 type="text"
//                 placeholder="Quick Search"
//                 style={{
//                   padding: "0px 0px",
//                   boxSizing: "border-box",
//                   backgroundColor: "#F2F0F9",
//                 }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#F2F0F9",
//                 borderRadius: "4px",
//                 padding: "5px 5px",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontFamily: "Outfit",
//                   fontWeight: 400,
//                   fontSize: "14px",
//                   color: "#B4B4CD",
//                   padding: "0px 4px",
//                   paddingRight: "10px",
//                 }}
//               >
//                 View
//               </Typography>

//               <CustomPaginationSelect
//                 defaultValue={20}
//                 onChange={(e) => handlePage(e.target.value)}
//                 sx={{
//                   backgroundColor: "#FFFFFF",
//                   height: "25px",
//                   border: "none",
//                   color: "#B4B4CD",
//                   padding: "0px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//                 <MenuItem value={100}>100</MenuItem>
//               </CustomPaginationSelect>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#F2F0F9",
//                 borderRadius: "4px",
//                 padding: "5px 5px",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontFamily: "Outfit",
//                   fontWeight: 400,
//                   fontSize: "14px",
//                   color: "#B4B4CD",
//                   padding: "0px 4px",
//                   paddingRight: "10px",
//                 }}
//               >
//                 Filter
//               </Typography>
//               <FilterList
//                 sx={{
//                   color: "#B4B4CD",
//                   backgroundColor: "#FFFFFF",
//                   padding: "2px 4px",
//                   fontSize: "22px",
//                   borderRadius: "5px",
//                 }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#F2F0F9",
//                 borderRadius: "4px",
//                 padding: "5px 5px",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontFamily: "Outfit",
//                   fontWeight: 400,
//                   fontSize: "14px",
//                   color: "#B4B4CD",
//                   padding: "0px 4px",
//                   paddingRight: "10px",
//                 }}
//               >
//                 Reset
//               </Typography>
//               {/* <img
//                 src={ResetIcon}
//                 alt="Reset"
//                 style={{
//                   width: "16px",
//                   height: "16px",
//                   backgroundColor: "#FFFFFF",
//                   padding: "6px 6px",
//                   borderRadius: "5px",
//                 }}
//               /> */}
//             </Box>
//           </Box>

//           <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             {/* <img
//               onClick={handlePrint}
//               src={PrintIcon}
//               alt="Print"
//               style={{ height: "37px" }}
//             /> */}
//           </Box>
//         </Box>

//         {/* Table Section */}

//         <TableContainer
//           sx={{
//             backgroundColor: "#FFFFFF",
//           }}
//         >
//           <Table
//             sx={{
//               minWidth: "900px",
//               tableLayout: "auto",
//               backgroundColor: "#fff",
//             }}
//           >
//             <TableHead>
//               <TableRow
//                 sx={{
//                   backgroundColor: "#C3A0CD",
//                   color: "#FFFFFF",
//                   fontWeight: "500",
//                 }}
//               >
//                 <TableCell sx={{ padding: "4px", textAlign: "center" }} />
//                 <TableCell
//                   sx={{
//                     color: "#FFFFFF",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     padding: "4px",
//                     fontWeight: 400,
//                     fontFamily: "Outfit",
//                   }}
//                 >
//                   Date
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "#FFFFFF",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     padding: "4px",
//                     fontWeight: 400,
//                     fontFamily: "Outfit",
//                   }}
//                 >
//                   Amount
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "#FFFFFF",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     padding: "4px",
//                     fontWeight: 400,
//                     fontFamily: "Outfit",
//                   }}
//                 >
//                   Due Date Time
//                 </TableCell> 
//                 <TableCell
//                   sx={{
//                     color: "#FFFFFF",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     padding: "4px",
//                     fontWeight: 400,
//                     fontFamily: "Outfit",
//                   }}
//                 >
//                   User Notes
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "#FFFFFF",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     padding: "4px",
//                     fontWeight: 400,
//                     fontFamily: "Outfit",
//                   }}
//                 >
//                   Status
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {searchData?.map((creditReq: any) => (
//                 <React.Fragment key={creditReq.id}>
//                   <TableRow
//                     sx={{
//                       backgroundColor:
//                         expanded === creditReq.id ? "#F2F0F9" : "#FFFFFF",
//                     }}
//                   >
//                     <TableCell sx={{ textAlign: "center", padding: "4px" }}>
//                       <IconButton
//                         sx={{
//                           color: "#B4B4CD",
//                           border: "solid #B4B4CD 1px",
//                           width: "18px",
//                           height: "18px",
//                         }}
//                         size="small"
//                         onClick={() => handleExpandClick(creditReq.id)}
//                       >
//                         {expanded === creditReq.id ? (
//                           <ExpandLess fontSize="small" />
//                         ) : (
//                           <ExpandMore fontSize="small" />
//                         )}
//                       </IconButton>
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         textAlign: "center",
//                         fontWeight: 500,
//                         fontSize: "12px",
//                         color: "#6E6996",
//                         cursor: "pointer",
//                         fontFamily: "Outfit",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         padding: "4px",
//                       }}
//                     >
//                       {creditReq.createdDateTime
//                         ? moment(creditReq.createdDateTime).format(
//                             "DD-MMM-YYYY"
//                           )
//                         : null}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         textAlign: "center",
//                         fontWeight: 500,
//                         fontSize: "12px",
//                         color: "#6E6996",
//                         cursor: "pointer",
//                         fontFamily: "Outfit",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         padding: "4px",
//                       }}
//                     >
//                       {(+creditReq.amount).toFixed(2)}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         textAlign: "center",
//                         fontWeight: 500,
//                         fontSize: "12px",
//                         color: "#6E6996",
//                         cursor: "pointer",
//                         fontFamily: "Outfit",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         padding: "4px",
//                       }}
//                     >
//                       {creditReq.dueDateTime
//                         ? moment(creditReq.dueDateTime).format(
//                             "DD-MMM-YYYY hh:mm A"
//                           )
//                         : null}
//                     </TableCell> 
//                     <TableCell
//                       sx={{
//                         textAlign: "center",
//                         fontWeight: 500,
//                         fontSize: "12px",
//                         color: "#6E6996",
//                         cursor: "pointer",
//                         fontFamily: "Outfit",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         padding: "4px",
//                       }}
//                     >
//                       {creditReq.userNotes}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         textAlign: "center",
//                         fontWeight: 500,
//                         fontSize: "12px",
//                         color: "#6E6996",
//                         cursor: "pointer",
//                         fontFamily: "Outfit",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                         overflow: "hidden",
//                         padding: "4px",
//                       }}
//                     >
//                       {creditReq.requestStatus}
//                     </TableCell>
//                   </TableRow>

//                   <TableRow>
//                     <TableCell
//                       style={{
//                         paddingBottom: 0,
//                         paddingTop: 0,
//                         backgroundColor: "#F2F0F9",
//                       }}
//                       colSpan={12}
//                     >
//                       <Collapse
//                         in={expanded === creditReq.id}
//                         timeout="auto"
//                         unmountOnExit
//                       >
//                         <Box margin={1}>
//                           <Box
//                             sx={{
//                               borderRadius: "4px",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "10px",
//                             }}
//                           >
//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontFamily: "Outfit",
//                                 fontWeight: 400,
//                               }}
//                             >
//                               Created By:{" "}
//                               {`${creditReq.createdByUser?.firstname} ${creditReq.createdByUser?.lastname}`}
//                             </Typography>

//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontFamily: "Outfit",
//                                 fontWeight: 400,
//                               }}
//                             >
//                               Updated By:{" "}
//                               {creditReq.updatedByUser
//                                 ? `${creditReq.updatedByUser?.firstname} ${creditReq.updatedByUser?.lastname}`
//                                 : "N/A"}
//                             </Typography>

//                             {creditReq.requestStatus === "ACC_APPROVED" && (
//                               <Typography
//                                 sx={{
//                                   fontSize: "12px",
//                                   fontFamily: "Outfit",
//                                   fontWeight: 400,
//                                 }}
//                               >
//                                 Acc Approved By:{" "}
//                                 {creditReq.approvedByAccountUser
//                                   ? `${creditReq.approvedByAccountUser?.firstname} ${creditReq.approvedByAccountUser?.lastname}`
//                                   : "N/A"}
//                               </Typography>
//                             )}

//                             {creditReq.requestStatus === "KAM_APPROVED" && (
//                               <Typography
//                                 sx={{
//                                   fontSize: "12px",
//                                   fontFamily: "Outfit",
//                                   fontWeight: 400,
//                                 }}
//                               >
//                                 Kam Approved By:{" "}
//                                 {creditReq.approvedByKamUser
//                                   ? `${creditReq.approvedByKamUser?.firstname} ${creditReq.approvedByKamUser?.lastname}`
//                                   : "N/A"}
//                               </Typography>
//                             )}

//                             {creditReq.requestStatus === "REJECTED" && (
//                               <>
//                                 <Typography
//                                   sx={{
//                                     fontSize: "12px",
//                                     fontFamily: "Outfit",
//                                     fontWeight: 400,
//                                   }}
//                                 >
//                                   Rejected By:{" "}
//                                   {creditReq.updatedByUser
//                                     ? `${creditReq.updatedByUser?.firstname} ${creditReq.updatedByUser?.lastname}`
//                                     : "N/A"}
//                                 </Typography>

//                                 <Typography
//                                   sx={{
//                                     fontSize: "12px",
//                                     fontFamily: "Outfit",
//                                     fontWeight: 400,
//                                   }}
//                                 >
//                                   Rejection Reason: {creditReq.adminRemarks}
//                                 </Typography>
//                               </>
//                             )}

//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontFamily: "Outfit",
//                                 fontWeight: 400,
//                               }}
//                             >
//                               Created Date:{" "}
//                               {creditReq.createdDateTime
//                                 ? moment(creditReq.createdDateTime).format(
//                                     "DD-MMM-YYYY h:mm A"
//                                   )
//                                 : "N/A"}
//                             </Typography>

//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontFamily: "Outfit",
//                                 fontWeight: 400,
//                               }}
//                             >
//                               Updated Date:{" "}
//                               {creditReq.updatedDateTime
//                                 ? moment(creditReq.updatedDateTime).format(
//                                     "DD-MMM-YYYY h:mm A"
//                                   )
//                                 : "N/A"}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       {creditRequests.length ? (
//         <Box
//           sx={{
//             my: 3,
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <ThemeProvider theme={PaginationTheme}>
//             <Stack spacing={2}>
//               <Pagination
//                 color="primary"
//                 count={pageCount}
//                 onChange={handlePageChange}
//               />
//             </Stack>
//           </ThemeProvider>
//         </Box>
//       ) : null}
//     </Box>
//   );
// };

// export default CreditRequestList;
