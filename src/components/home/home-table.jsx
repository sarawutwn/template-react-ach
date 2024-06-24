import { Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React from "react";

export const HomeTable = ({ dataTable }) => {
  return (
    <MUIDataTable
      data={dataTable}
      title={<Typography variant="h6"><b>รายการล่าสุด</b></Typography>}
      sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px" }}
      options={{
        viewColumns: false,
        filter: true,
        print: false,
        download: false,
        selectableRows: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 20],
        textLabels: {
          body: {
            noMatch: "ไม่พบข้อมูล",
          },
        },
      }}
      columns={[
        {
          name: "crm_customers",
          label: "ชื่อผู้รับคะแนน",
          options: {
            customBodyRender: (value) => <b>{value.crm_customer_fullname}</b>,
          },
        },
        {
          name: "crm_customer_point_type",
          label: "ประเภท",
          options: {
            customBodyRender: (value) => (
              <Typography
                variant="subtitle2"
                sx={{
                  color: value === "จัดการคะแนน (เพิ่ม)" || value === "รับคะแนน" ? "green" : "red",
                }}
              >
                <b>{value}</b>
              </Typography>
            ),
          },
        },
        {
          name: "crm_customer_point_sum",
          label: "จำนวน",
          options: {
            customBodyRender: (value) => `${value} คะแนน`,
          },
        },
      ]}
    />
  );
};
