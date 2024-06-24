import { Card, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSpring, animated } from "react-spring";
import "../../animations/wave.css";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 80,
    config: { mass: 2, tension: 70 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

export const HomeCard = ({ itemFour, itemThree, itemTwo, itemOne }) => {
  const shadowSetting = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} lg={3}>
       <Card
          sx={{
            height: "100px",
            borderRadius: "10px",
            boxShadow: shadowSetting,
            borderRight: "7px solid #ffd344",
            mt: 2,
          }}
        >
          <div className="wave--wrapper">
            <div className="wave-animation yellow"></div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 2,
                  zIndex: 1,
                }}
              >
                <Typography variant="subtitle2">Total User</Typography>
                <Stack direction="row">
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, width: "100px" }}
                  >
                    <Number n={itemOne} />
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // ml: -10,
                  // mt: 1,
                  mr: 2,
                  mt: 2,
                  zIndex: 1,
                }}
              >
                <img
                  src="/image/home/people.png"
                  alt="image-home-people"
                  style={{ width: "65px" }}
                />
                {/* <Canvas>
                  <mesh>
                  <React.Suspense fallback={null}>
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    <directionalLight position={[2, 2, 2]} intensity={2} />
                    <OrbitControls
                      maxDistance={20}
                      minDistance={20}
                    />
                    <Planet />
                  </React.Suspense>
                  </mesh>
                </Canvas> */}
              </Stack>
            </Box>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            height: "100px",
            borderRadius: "10px",
            boxShadow: shadowSetting,
            borderRight: "7px solid hsl(208, 100%, 63%)",
            mt: 2,
          }}
        >
          <div className="wave--wrapper">
            <div className="wave-animation blue"></div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                xs={7}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 2,
                  zIndex: 1,
                }}
              >
                <Typography variant="subtitle2">Daily Active User</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <Number n={itemTwo} />
                </Typography>
              </Stack>
              <Stack
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mr: 2,
                  mt: 2,
                  zIndex: 1,
                }}
              >
                <img
                  src="/image/home/dialy-people.png"
                  alt="image-home-dialy-people"
                  style={{ width: "65px" }}
                />
              </Stack>
            </Box>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            height: "100px",
            borderRadius: "10px",
            boxShadow: shadowSetting,
            borderRight: "7px solid hsl(4, 100%, 63%)",
            mt: 2,
          }}
        >
          <div className="wave--wrapper">
            <div className="wave-animation red"></div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                xs={7}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 2,
                  zIndex: 1,
                }}
              >
                <Typography variant="subtitle2">Redeem User</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <Number n={itemThree} />
                </Typography>
              </Stack>
              <Stack
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mr: 2,
                  mt: 2,
                  zIndex: 1,
                }}
              >
                <img
                  src="/image/home/3163799.png"
                  alt="image-home-3163799"
                  style={{ width: "65px" }}
                />
              </Stack>
            </Box>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            height: "100px",
            borderRadius: "10px",
            boxShadow: shadowSetting,
            borderRight: "7px solid hsl(165, 100%, 63%)",
            mt: 2,
          }}
        >
          <div className="wave--wrapper">
            <div className="wave-animation mint"></div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                xs={7}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 2,
                  zIndex: 1,
                }}
              >
                <Typography variant="subtitle2">Earn Point User</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <Number n={itemFour} />
                </Typography>
              </Stack>
              <Stack
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mr: 2,
                  mt: 2,
                  zIndex: 1,
                }}
              >
                <img
                  src="/image/home/4585144.png"
                  alt="image-home-4585144"
                  style={{ width: "65px" }}
                />
              </Stack>
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};
