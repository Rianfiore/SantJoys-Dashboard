import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import LoginCard from "./LoginCard";
import { userSignInRequest } from "../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    pointerEvents: "none",
    userSelect: "none",
  },
}));

function Login(props) {
  const classes = useStyles();

  const { userSignInRequest } = props;

  return (
    <Container style={{}}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={5}>
          <LoginCard userSignInRequest={userSignInRequest} />
        </Grid>
      </Grid>
    </Container>
  );
}

Login.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignInRequest })(Login);
