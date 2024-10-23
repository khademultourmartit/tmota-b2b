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
//   Menu,
//   MenuItem as MuiMenuItem,
//   Tabs,
//   Tab,
//   Pagination,
//   Stack,
//   ThemeProvider,
// } from "@mui/material";
// import {
//   FilterList,
//   ExpandMore,
//   ExpandLess,
//   Search,
// } from "@mui/icons-material";
// import moment from "moment";
// import { useRouter } from "next/router";
// import { PaginationTheme } from "../../components/PaginationTheme";
// import { CustomSearchInput } from "../../components/CustomSearchInput";
// import { CustomPaginationSelect } from "../../components/CustomPaginationSelect";
// import {
//   deleteAlert,
//   errorAlert,
//   successAlert,
//   rejectedAlert,
//   approveAlert,
// } from "../../utils/alerts";
// import {
//   approveCreditRequest,
//   deleteCreditRequest,
//   getCreditRequests,
// } from "../../services/agent/credit-request";
// import styles from "./CreditRequestList.module.scss";

// const CreditRequestList: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query as { id: string };

//   const [data, setData] = useState<any>({});
//   const [show, setShow] = useState<Record<string, boolean>>({});
//   const [selectedTab, setSelectedTab] = useState<string>(
//     router.query.selectedTab || "ALL"
//   );
//   const [creditRequests, setCreditRequests] = useState<any[]>([]);
//   const [limit, setLimit] = useState<number>(10);
//   const [pageNo, setPageNo] = useState<number>(1);
//   const [pageCount, setPageCount] = useState<number>(0);
//   const [expanded, setExpanded] = useState<number | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [searchData, setSearchData] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchCreditRequests = async () => {
//       const query = {
//         page: pageNo,
//         limit: limit,
//         requestStatus: selectedTab,
//       };

//       if (id !== "all") query.b2bUserId = id;

//       const {
//         data: { payload },
//       } = await getCreditRequests(query);

//       setSearchData(payload.data);
//       setCreditRequests(payload.data);
//       setPageCount(payload.meta.totalPages);
//     };

//     fetchCreditRequests();
//   }, [selectedTab, limit, pageNo, id]);

//   const handleExpandClick = (id: number) => {
//     setExpanded((prev) => (prev === id ? null : id));
//   };

//   const handleTabChange = (_: React.SyntheticEvent, value: string) => {
//     setSelectedTab(value);
//   };

//   const handleSearchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchInput = e.target.value;
//     const filteredData = creditRequests.filter((item) =>
//       Object.values(item)
//         .join("")
//         .toLowerCase()
//         .includes(searchInput.toLowerCase())
//     );
//     setSearchData(searchInput ? filteredData : creditRequests);
//   };

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPageNo(value);
//   };

//   const handleLimitChange = (e: React.ChangeEvent<{ value: unknown }>) => {
//     setLimit(e.target.value as number);
//   };

//   const handlePrint = () => window.print();

//   return (
//     <Box className={styles.container}>
//       <Tabs
//         value={selectedTab}
//         onChange={handleTabChange}
//         className={styles.tabs}
//       >
//         {["ALL", "PENDING", "KAM_APPROVED", "ACC_APPROVED", "REJECTED"].map(
//           (status) => (
//             <Tab
//               key={status}
//               label={status}
//               value={status}
//               className={`${styles.tab} ${
//                 selectedTab === status ? "selected" : ""
//               }`}
//             />
//           )
//         )}
//       </Tabs>

//       <Box className={styles.topBar}>
//         <Box>
//           <Search />
//           <CustomSearchInput
//             onChange={handleSearchItems}
//             className={styles.searchInput}
//             placeholder="Quick Search"
//           />
//         </Box>
//         <img
//           src="/assets/image/PrintButton.svg"
//           alt="Print"
//           className={styles.iconButton}
//           onClick={handlePrint}
//         />
//       </Box>

//       <TableContainer className={styles.tableContainer}>
//         <Table className={styles.table}>
//           <TableHead>
//             <TableRow className={styles.headerRow}>
//               <TableCell className={styles.headerCell}>Date</TableCell>
//               <TableCell className={styles.headerCell}>Amount</TableCell>
//               <TableCell className={styles.headerCell}>Agent Name</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {searchData.map((req) => (
//               <TableRow key={req.id} className={styles.row}>
//                 <TableCell className={styles.cell}>
//                   {moment(req.createdDateTime).format("DD-MMM-YYYY")}
//                 </TableCell>
//                 <TableCell className={styles.cell}>{req.amount}</TableCell>
//                 <TableCell className={styles.cell}>
//                   {req.b2bUser?.companyName}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {creditRequests.length > 0 && (
//         <Box className={styles.pagination}>
//           <ThemeProvider theme={PaginationTheme}>
//             <Stack spacing={2}>
//               <Pagination count={pageCount} onChange={handlePageChange} />
//             </Stack>
//           </ThemeProvider>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default CreditRequestList;
