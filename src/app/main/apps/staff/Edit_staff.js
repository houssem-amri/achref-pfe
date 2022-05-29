import { motion } from "framer-motion";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "@lodash";
import { IconButton, Input } from "@material-ui/core";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { styled } from "@material-ui/styles";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

/**
 * Form Validation Schema
 */

export default function Add_staff() {
  const classes = useStyles();
  let params = useParams();
  let history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [dateCreated, setdateCreated] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  useEffect(() => {
    getStafById();
  }, []);

  const getStafById = () => {
    axios
      .get("http://localhost:3200/api/getStafById/" + params.id)
      .then((res) => {
        setname(res.data.data.name);
        setemail(res.data.data.email);
        setpassword(res.data.data.password);
        setpasswordConfirm(res.data.data.password);
        setdateCreated(res.data.data.dateCreated);
      })
      .catch((err) => console.log(err));
  };

  const EditStaf = () => {
    let data = {
      _id: params.id,
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      role : "staff",
      dateCreated:dateCreated

    };
    axios
    .put("http://localhost:3200/api/update_users", data)
    .then((res) => {
        history.push("/apps/table_staf");

    })
    .catch((err) => console.log(err));  };

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col-12 flex-auto items-center justify-center p-16 sm:p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-max">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <Typography
                variant="h6"
                className="mt-16 mb-24 font-semibold text-18 sm:text-24"
              >
                Modifier a Staff account
              </Typography>
              <form
                noValidate
                autoComplete="off"
                className="flex flex-col justify-center w-full"
              >
                <TextField
                  className="mb-16"
                  id="outlined-multiline-Name"
                  label="Name"
                  value={name}
                  multiline
                  variant="outlined"
                  onChange={(e) => setname(e.target.value)}
                />

                <TextField
                  className="mb-16"
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setemail(e.target.value)}
                />
                <TextField
                  className="mb-16"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  fullWidth
                  onChange={(e) => setpassword(e.target.value)}
                />

                <TextField
                  className="mb-16"
                  label="Password (Confirm)"
                  type="password"
                  variant="outlined"
                  value={passwordConfirm}
                  fullWidth
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                />

                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  type="button"
                  onClick={EditStaf}
                >
                  Modifier staff
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
