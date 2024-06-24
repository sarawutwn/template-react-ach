import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { HomeCard } from "../components/home/home-card";
import { HomeChartPie } from "../components/home/home-chart-pie";
import HomeChartArea from "../components/home/home-chart-area";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HailIcon from "@mui/icons-material/Hail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import store from "../redux/store";
import axios from "axios";
import moment from "moment";
import { hostname } from "../hostname";
import HomeChartUserYear from "../components/home/home-year-chart";
import BarChart from "../utils/apex-chart/bar-chart";
import BarChart2 from "../utils/apex-chart/bar-chart-2";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StoreIcon from "@mui/icons-material/Store";
import * as XLSX from "xlsx";

function getRandomColor() {
  const colors = ["#F44336", "#E91E63", "#9c27b0", "#673AB7"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
}

function Home() {
  const divSeeMore = useRef(null);
  const [profile, setProfile] = useState({});
  const [cardData, setCardData] = useState({});
  const [seeMore, setSeeMore] = useState(false);
  const [typeSeeMore, setTypeSeeMore] = useState("today");
  const [seeMoreData, setSeeMoreData] = useState({
    label: [],
    gender: 0,
    age: 0,
    frequency: 0,
  });
  const [genderChart, setGenderChart] = useState({
    label: ["ชาย", "หญิง"],
    data: [],
  });
  const [newMember, setNewMember] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [yearChart, setYearChart] = useState([]);
  const [ageChart, setAgeChart] = useState({
    label: [
      "0-20 ปี",
      "21-30 ปี",
      "31-40 ปี",
      "41-50 ปี",
      "51-60 ปี",
      "มากกว่า 60 ปี",
    ],
    data: [],
  });
  const [yearMenu, setYearMenu] = useState([
    moment(new Date()).format("YYYY"),
    moment(new Date()).subtract(1, "years").format("YYYY"),
    moment(new Date()).subtract(2, "years").format("YYYY"),
  ]);
  const [selectYear, setSelectYear] = useState(
    moment(new Date()).format("YYYY")
  );

  const getTrxReport = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/report/get-trx-month`);
      if (data.status === "success") {
        let jsonData = [];
        for (let item of data.result) {
          jsonData.push({
            ["วันที่"]: moment().format("DD-MM-YYYY HH:mm"),
            ["เบอร์โทรศัพท์"]: item.crm_customer.crm_customer_phone,
            ["ประเภทการให้คะแนน"]:
              item.crm_point_transaction_type === "EARN"
                ? "คะแนนสะสมจากบิล"
                : "คะแนนผู้ใช้งานใหม่",
            ["จำนวน"]: Number(item.crm_point_transaction_total_point),
            ["สาขาที่ใช้บริการ"]: item.crm_branchs.crm_branch_name,
          });
        }
        const worksheet = await XLSX.utils.json_to_sheet(jsonData);
        const workbook = await XLSX.utils.book_new();
        await XLSX.utils.book_append_sheet(workbook, worksheet);
        await XLSX.writeFile(workbook, "point-transaction.xlsx");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProfile = async () => {
    try {
      setProfile(JSON.parse(localStorage.getItem("USER_PROFILE")));
      getTransaction();
    } catch (err) {
      console.log(err);
    }
  };

  const getTransaction = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/report/home-transaction`
      );
      if (data.status === "success") {
        setCardData({
          customerAll: data.result.customerAll,
          activeToday: data.result.activeToday,
          redeemReward: data.result.redeemReward,
          incomePoint: data.result.incomePoint,
        });
        const month = await data.result.month.filter(
          (item) => item.value !== 0
        );
        setYearChart(month);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlerUserYearChange = async (value) => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/report/user-year/${value}`
      );
      if (data.status === "success") {
        setYearChart(data.result.filter((item) => item.value !== 0));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlerReport = async () => {
    try {
      let param = typeSeeMore === "custom" ? selectYear : typeSeeMore;
      const { data } = await axios.get(
        `${hostname}/api/report/get-report/by-type/${param}`
      );
      if (data.status === "success") {
        let campaign = [];
        for (let item of data.quotaResult) {
          if (item.crm_quota.length !== 0) {
            let data = [];
            await data.push(item.crm_quota.length);
            await campaign.push({
              name: item.crm_reward_name,
              data,
              colors: getRandomColor(),
            });
          }
        }
        let result = {
          gender: data.gender,
          age: data.birthOfDate,
          frequency: data.frequencyOfUsage,
          label: data.label,
          burn: data.burn,
          earn: data.earn,
          newUser: data.newUser,
          campaign,
        };
        setSeeMoreData(result);
        setSeeMore(true);
        divSeeMore.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReport = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/report/home-report`);
      if (data.status === "success") {
        setCardData(data.result);
        setNewMember(data.newMember);
        setTransaction(data.result.transaction);
        setGenderChart({ ...genderChart, ["data"]: data.result.gender });
        setAgeChart({ ...ageChart, ["data"]: data.result.age });
        let branchChartResponse = [];
        let color = 1.0;
        for (let item of data.result.branchs) {
          await branchChartResponse.push({
            name: `${item.crm_branch_company.split(" ")[1]} ${
              item.crm_branch_name
            }`,
            value: item._count.crm_customer_points,
            color: `rgba(4, 52, 120, ${color})`,
          });
          color -= 0.055;
        }
        setBranchChart({ data: branchChartResponse });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container sx={{ mt: { xs: 2, md: 0 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: -2.5,
          maxWidth: "1300px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={12}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Typography variant="h6">ระบบจัดการคะแนนผู้ใช้งาน</Typography>
                <Typography variant="body2">
                  ผู้ใช้งาน :{" "}
                  {`${profile?.crm_user_firstname} ${profile?.crm_user_lastname} (${profile?.crm_user_code})`}
                </Typography>
                <Typography variant="body2">
                  สิทธิ์การใช้งาน :{" "}
                  {`${store?.getState().role.crm_role_display_name}`}
                </Typography>
              </Stack>
              <Stack>
                {/* <Link to="/report" style={{ textDecoration: "none" }}> */}
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ boxShadow: 0, borderRadius: "3px", mt: 2 }}
                  onClick={() => getTrxReport()}
                >
                  <>ไปที่หน้ารายงาน</>
                </Button>
                {/* </Link> */}
              </Stack>
            </Stack>
            <HomeCard
              itemOne={cardData?.customerAll}
              itemTwo={cardData?.activeToday}
              itemThree={cardData?.redeemReward}
              itemFour={cardData?.incomePoint}
            />
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    borderRadius: "8px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    mt: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Stack direction="column" sx={{ m: 3 }}>
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <EventAvailableIcon
                          sx={{ color: "hsl(165, 100%, 63%)", mt: 0.2 }}
                          fontSize="medium"
                        />
                        <Typography variant="h6">
                          <>Monthly Active Users</>
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" sx={{ ml: 3 }}>
                        Number of unique user access the platform including New
                        User
                      </Typography>
                    </Stack>
                    <TextField
                      defaultValue={moment(new Date()).format("YYYY")}
                      color="warning"
                      size="small"
                      select
                      sx={{ minWidth: "85px", mt: 4, mr: 5 }}
                      onChange={(e) => handlerUserYearChange(e.target.value)}
                    >
                      {yearMenu.map((item) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Stack>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      m: { md: 5, xs: 0.3 },
                      mt: 1,
                    }}
                  >
                    <HomeChartUserYear json={yearChart} />
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            <Grid container>
              <Card
                sx={{
                  mt: 2,
                  bgcolor: "#FFF",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: { xs: "110px", md: "60px" },
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "8px",
                }}
              >
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Box
                      display="flex"
                      sx={{
                        justifyContent: { md: "start", xs: "center" },
                        ml: { md: 0, xs: -10 },
                        mb: { xs: 1, md: 0 },
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{ display: "flex", alignItems: "center", mt: 1.6 }}
                      >
                        <AppsIcon sx={{ color: "orange", ml: 2 }} />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 0.7,
                            pr: 2,
                            borderRight: "1px solid rgba(0,0,0,.2)",
                          }}
                        >
                          <>DASHBOARD</>
                        </Typography>
                        {seeMore === false ? (
                          <Button
                            sx={{ boxShadow: 0, borderRadius: "3px", ml: 2.4 }}
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={handlerReport}
                          >
                            <>See More</>
                          </Button>
                        ) : (
                          <Button
                            sx={{ boxShadow: 0, borderRadius: "3px", ml: 2.4 }}
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={handlerReport}
                          >
                            <>search</>
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      display="flex"
                      sx={{ justifyContent: { md: "end", xs: "center" } }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1.25,
                          mr: 1,
                        }}
                      >
                        <FormControl size="small" sx={{ width: "170px" }}>
                          <Select
                            value={typeSeeMore}
                            defaultValue="today"
                            onChange={(e) => {
                              setTypeSeeMore(e.target.value);
                            }}
                          >
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="yesterday">Yesterday</MenuItem>
                            <MenuItem value="7Days">Last 7 Days</MenuItem>
                            <MenuItem value="30Days">Last 30 Days</MenuItem>
                            <MenuItem value="custom">Select Year</MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                      {typeSeeMore === "custom" && (
                        <TextField
                          defaultValue={moment(new Date()).format("YYYY")}
                          color="warning"
                          size="small"
                          select
                          sx={{ minWidth: "85px", mt: 1.25, mr: 1 }}
                          onChange={(e) => setSelectYear(e.target.value)}
                        >
                          {yearMenu.map((item) => {
                            return (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      )}
                    </Box>
                    {/* <Box
                      display="flex"
                      sx={{ justifyContent: { md: "end", xs: "center" } }}
                    >
                      <Stack
                        direction="row"
                        sx={{ display: "flex", alignItems: "center", mt: 1.6 }}
                        spacing={0.3}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="วันที่เริ่มต้น"
                            inputFormat="MM/DD/YYYY"
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                sx={{ width: "170px", ml: 0 }}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="วันที่สิ้นสุด"
                            inputFormat="MM/DD/YYYY"
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                sx={{ width: "170px", pr: 0.5 }}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Box> */}
                  </Grid>
                </Grid>
              </Card>
              {seeMore ? (
                <Grid container sx={{ mt: 1.5 }} spacing={1} ref={divSeeMore}>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#FFFF",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <AccessibilityNewIcon
                          sx={{ mb: -0.6, mr: 1 }}
                          color="info"
                        />
                        <>New Users</>
                        <HomeChartArea
                          json={{
                            label: seeMoreData.label,
                            data: seeMoreData.newUser,
                          }}
                        />
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#FFFF",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <AttachMoneyIcon
                          sx={{ mb: -0.6, mr: 1 }}
                          color="primaryCustom"
                        />
                        <>Earn Point</>
                        <HomeChartArea
                          json={{
                            label: seeMoreData.label,
                            data: seeMoreData.earn,
                          }}
                        />
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#FFFF",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <WhatshotIcon sx={{ mb: -0.6, mr: 1 }} color="danger" />
                        <>Burn Point</>
                        <HomeChartArea
                          json={{
                            label: seeMoreData.label,
                            data: seeMoreData.burn,
                          }}
                        />
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#FFFF",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <TransgenderIcon
                          sx={{ mb: -0.6, mr: 1 }}
                          color="info"
                        />
                        <>Member Profile: Gender</>
                      </Typography>
                      <HomeChartPie
                        data={{
                          label: ["FEMALE", "MALE", "OTHER"],
                          data: seeMoreData.gender,
                        }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <HailIcon sx={{ mb: -0.6, mr: 1 }} color="info" />
                        <>Member Profile: Age</>
                      </Typography>
                      <HomeChartPie
                        data={{
                          label: [
                            "1-20",
                            "21-30",
                            "31-40",
                            "41-50",
                            "51-60",
                            "60++",
                          ],
                          data: seeMoreData.age,
                        }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <PeopleAltIcon sx={{ mb: -0.6, mr: 1 }} color="info" />
                        <>Frequency of Usage by User</>
                      </Typography>
                      <HomeChartPie
                        data={{
                          label: ["1-2 ครั้ง", "3-5 ครั้ง", "มากกว่า 5"],
                          data: seeMoreData.frequency,
                        }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <EmojiEventsIcon
                          sx={{ mb: -0.6, mr: 1 }}
                          color="warning"
                        />
                        <>Campaign / Reward redemption</>
                      </Typography>
                      <Stack sx={{ p: 2.5 }}>
                        <BarChart data={seeMoreData.campaign} />
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #EDEDED",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ mt: 1, ml: 1, mb: -5 }}>
                        <StoreIcon sx={{ mb: -0.6, mr: 1 }} color="warning" />
                        <>Branch / Terminal Activity</>
                      </Typography>
                      <Stack sx={{ p: 2.5 }}>
                        <BarChart2 />
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              ) : null}
              {/* {seeMore ? (
                <Grid item xs={12} md={12}>
                  <Card
                    sx={{
                      borderRadius: "5px",
                      boxShadow:
                        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
                      m: 6,
                      mt: -2,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="h6"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                          mb: 0,
                        }}
                      >
                        <>transaction ของสาขา</>
                      </Typography>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          m: 1.5,
                        }}
                      >
                        <HomeChartBranch chartData={branchChart?.data} />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
