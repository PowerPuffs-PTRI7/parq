import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.scss";
import logo from "../assets/blueParq.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@mui/material/TextField";
import Maps from "./Map.jsx";
import ParkingSpot from "./ParkingSpot.jsx";
import { useEffect, useState } from "react";
import LoginPopup from "./LoginPopup.jsx";
import AboutPage from "./About.jsx";
import Host from "./Host.jsx";
import ParkingSpotTest from "./ParkingSpotTest.jsx";
import UserBookings from "./UserBookings.jsx";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocation } from "react-router";

const images = [
  {
    url: 'https://codesmith-iteration-project.s3.us-west-1.amazonaws.com/jorgina-nkosi-jeQz9ULm8iE-unsplash.jpg',
    title: 'Bookings',
    width: '100%',
    link: '/userbookings'
  },
  {
    url: 'https://codesmith-iteration-project.s3.us-west-1.amazonaws.com/raban-haaijk-wftNpcjCHT4-unsplash.jpg',
    title: 'Hostings',
    width: '100%',
    link: '/userhostings'
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '50%',
  width: 1700,
  [theme.breakpoints.down('sm')]: {
    height: '50%',
    width: 500
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

// above is all of our button styling ^^

export default function LoggedinPage(state) {
  const useStyles = makeStyles(() => ({
    textField: {
      width: "98%",
      height: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500,
      borderRadius: 0,
    },
    overrides: {
      border: 0,
      borderRadius: 20,
    },
    input: {
      color: "white",
    },
  }));

  const classes = useStyles();
  const location = useLocation();

  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(3);
  const [data, setData] = useState({
    lat: 39.8097343,
    lng:  -98.5556199,
    listings: [],
  });

  const props = {
    data: data,
    isVisible: true,
    zoom: zoom,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/all", {
        address: address,
      })
      .then((res) => {
        setData(res.data);
        setZoom(13);
      })
      .catch((err) => {
        console.log(`Error occured in useEffect: ${err}`);
      });
  };

  useEffect(
    () => {
      setData(location.data ? location.data : data);
      setZoom(3
        );
    },[]
  );

  const listings = data.listings;
  console.log('the listings are', listings)

  const spotElems = listings.map((ele, i) => {
    // convert latitude to longitude of the search to radians
    const radLatSearch = (Math.PI * data.lat) / 180;
    const radLngSearch = (Math.PI * data.lng) / 180;

    // convert latitude to longitude of the parking spot to radians
    const radLatSpot = (Math.PI * ele.coordinates.lat) / 180;
    const radLngSpot = (Math.PI * ele.coordinates.lng) / 180;

    // calculate the great circle
    var R = 6371; // km
    var dLat = radLatSpot - radLatSearch;
    var dLon = radLngSpot - radLngSearch;

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(radLatSearch) *
        Math.cos(radLatSpot);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    // check if the distance is within 5 miles
    if (d > 8.04672) {
      props.isVisible = false;
    } else {
      props.isVisible = true;
    }

    // only return spots with isVisible set to true
    if (props.isVisible) {
      return <ParkingSpotTest key={i} info={ele} {...props} />;
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="filterBar"
        style={{ height: "40px" }}
        sx={{ flexGrow: 1 }}
      >
        <div
          className="leftFilter"
          style={{ width: "30%", float: "left", marginLeft: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-search"
              variant="outlined"
              label="city, state, zip code"
              className={classes.textField}
              value={address}
              size="small"
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#B9D8D8" }} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </form>
        </div>

        <div className="rightFilter" style={{ width: "60%", float: "right" }}>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              price
            </Typography>
          </Button>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              size
            </Typography>
          </Button>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              type
            </Typography>
          </Button>
        </div>
      </div>
      <div className="mapAndTiles" style={{ height: `calc( 100vh - 145px )` }}>
        <div
          className="leftMap"
          style={{ width: "49%", height: "100%", float: "left" }}
        >
          <Maps className="map" {...props} />
        </div>
        <div
          className="rightTiles"
          style={{ display: "flex", width: "50%", height: "100%", float: "right" }}
        >
           <Box sx={{ flexWrap: 'wrap', minWidth: 400, height: '100%', width: '100%'}}>
      {images.map((image) => (
        <>
        <ImageButton 
          component={Link}
          to={image.link}
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        </>
      ))}
    </Box>
          </div>
        </div>
      </div>
  );
}
