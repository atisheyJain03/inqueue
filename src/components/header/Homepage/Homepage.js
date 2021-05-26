import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

import { w3 } from "../../../images/images.js";
import "./Style.css";

function Homepage() {
  const history = useHistory();
  return (
    <div className="Homepage" style={{ backgroundImage: `url(${w3})` }}>
      <div>
        <Button
          variant="outlined"
          className="Homepage--btn"
          size="large"
          onClick={() => history.push("/shops")}
        >
          shops and services
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
