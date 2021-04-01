import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../../axios";
import { UserContext } from "../../../UserContext";
import Loader from "../../Loader/Loader";
import AccordionQueue from "./AccordionQueue";
import PlusOneTwoToneIcon from "@material-ui/icons/PlusOneTwoTone";
import ExposureNeg1TwoToneIcon from "@material-ui/icons/ExposureNeg1TwoTone";

let cancelToken = "";
function Queue() {
  const [shopServices, setShopServices] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [selectOption, setSelectOption] = useState("");
  const [currentNumber, setCurrentNumber] = useState(null);
  const [totalNumber, setTotalNumber] = useState(null);
  const [queue, setQueue] = useState([]);

  // for pagination
  const [page, setPage] = useState(1);

  // to check if component is not unmounted
  //
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = Axios.CancelToken.source();
    cancelToken = source;
    axios
      .get(`/shops/services/${user.shop}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setShopServices([...res.data.data.services.serviceBy]);
      })
      .catch((err) => console.log(err));
    return () => {
      cancelToken.cancel();
      setIsUnmounted(true);
    };
  }, []);

  useEffect(() => {
    if (selectOption === "") return;
    cancelToken.cancel();
    setQueue([]);
    setPage(1);
    setNoMore(false);
    handleQueue();
  }, [selectOption]);

  const handleQueue = () => {
    setLoading(true);
    const source = Axios.CancelToken.source();
    cancelToken = source;
    axios
      .get(`/service/getQueue/${selectOption}?page=${page}&limit=10`, {
        cancelToken: source.token,
      })
      .then((res) => {
        console.log({ ...res.data.data.queue.queue });
        setCurrentNumber(res.data.data.queue.currentNumber);
        setTotalNumber(res.data.data.queue.totalNumber);
        if (res.data.data.queue.queue.length === 0) setNoMore(true);
        else {
          if (!res.data.data.queue.queue.user) {
            res.data.data.queue.queue.user = {
              name: res.data.data.queue.queue.userName,
            };
            alert(res.data.data.queue.queue.user);
          }
          setQueue([...queue, ...res.data.data.queue.queue]);
          setPage(page + 1);
        }
        setLoading(false);
        // setShopServices([...res.data.data.services.serviceBy]);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeCurrentNumber = (number) => {
    if (number === -1 && currentNumber === 0) return;
    const source = Axios.CancelToken.source();
    cancelToken = source;
    axios
      .patch(`/service/changeCurrentNumber/${selectOption}`, {
        cancelToken: source.token,
        data: {
          number,
        },
      })
      .then((res) => {
        console.log({ ...res });
        setCurrentNumber(res.data.data.service.currentNumber);
        // setShopServices([...res.data.data.services.serviceBy]);
      })
      .catch((err) => console.log(err));
  };

  console.log(queue);
  console.log(shopServices);
  console.log(selectOption);
  return (
    <div>
      <div>
        <Select
          value={selectOption}
          displayEmpty
          autoWidth
          onChange={(event) => setSelectOption(event.target.value)}
        >
          <MenuItem key={"empty"} disabled value="">
            Select A Service
          </MenuItem>
          {shopServices
            ? shopServices.map((service) => {
                return (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </div>
      {selectOption === "" ? null : (
        <>
          <h3>Current Number - {currentNumber}</h3>
          <h3>Total Numbers - {totalNumber}</h3>
          <div>
            <h3 style={{ display: "inline-block" }}>Change Number</h3>
            <IconButton
              onClick={() => handleChangeCurrentNumber(1)}
              style={{
                borderRadius: "10%",
                color: "white",
                backgroundColor: "#1a237e",
                marginLeft: "10px",
              }}
            >
              <PlusOneTwoToneIcon />
            </IconButton>
            <IconButton
              onClick={() => handleChangeCurrentNumber(-1)}
              style={{
                borderRadius: "10%",
                color: "white",
                backgroundColor: "#1a237e",
                marginLeft: "10px",
              }}
            >
              <ExposureNeg1TwoToneIcon />
            </IconButton>
          </div>

          <div style={{ width: "80%", margin: "auto" }}>
            {queue.map((ticket, i) => {
              return (
                <div style={{ marginBottom: "10px" }} key={ticket.id}>
                  <AccordionQueue ticket={ticket} />
                </div>
              );
            })}
            {loading ? (
              <Loader />
            ) : noMore ? (
              <Typography variant="h6" gutterBottom>
                No more Results
              </Typography>
            ) : (
              <Button onClick={handleQueue}>Load more</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Queue;
