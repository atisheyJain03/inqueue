import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { MenuItem, Select, TextField } from "@material-ui/core";
import Loader from "../../Loader/Loader";
import axios from "../../../axios";
import { UserContext } from "../../../UserContext";
import Axios from "axios";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  button: {
    display: "block",
    margin: "auto",
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  form: {
    padding: 20,
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, shopServices } = props;
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [selectOption, setSelectOption] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const phoneNumber = phoneNumberRef.current.value.trim() * 1;
    if (!name || !phoneNumber) {
      alert("Please enter name and phone number");
      return;
    }
    if (selectOption === "") {
      alert("Please select a service");
      return;
    }
    console.log(phoneNumber, isNaN(phoneNumber));
    console.log(
      isNaN(phoneNumber),
      phoneNumber < 1000000000,
      phoneNumber > 9999999999
    );
    if (
      isNaN(phoneNumber) ||
      phoneNumber < 1000000000 ||
      phoneNumber > 9999999999
    ) {
      alert("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    axios
      .post(`/queue/generateTicket/${selectOption}`, {
        data: {
          name,
          phoneNumber,
        },
      })
      .then((res) => {
        setLoading(false);
        setGenerated(res.data.data.ticket.number);
        console.log({ res });
      })
      .catch((err) => console.log({ err }));

    console.log(name, phoneNumber);
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {loading && <Loader />}
        {generated && (
          <h4
            style={{
              alignSelf: "center",
              margin: 0,
              marginTop: "10px",
              textTransform: "uppercase",
            }}
          >
            {" "}
            ticket generated with number - {generated}
          </h4>
        )}
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
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
          <TextField
            label="Name"
            inputRef={nameRef}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="Phone Number"
            inputRef={phoneNumberRef}
            fullWidth
            className={classes.input}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Generate
          </Button>
        </form>
      </Dialog>
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

let cancelToken = "";

export default function TicketGenerate() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [shopServices, setShopServices] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [user, setUser] = useContext(UserContext);
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
    };
  }, []);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Generate a ticket
      </Button>
      <SimpleDialog
        shopServices={shopServices}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
