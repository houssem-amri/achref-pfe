import FormHelperText from "@material-ui/core/FormHelperText";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import * as yup from "yup";
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
const schema = yup.object().shape({
  name: yup.string().required("You must enter your name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function Add_staff() {
  const classes = useStyles();
  const [errMsg, setErrMsg] = useState("");
  const [image, setimage] = useState();

  const history = useHistory();
  const Input = styled("input")({
    display: "none",
  });

  const onChangeImage = (event) => {
    const file = event.target.files[0];

    setimage(file);
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(user) {
    reset(defaultValues);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", image);
    formData.append("role", "staff");
    axios
      .post("http://localhost:3200/api/add_users", formData)
      .then((res) => {
        if (res.data.message === "User added succesful") {
          history.push("/apps/table_staf");
        }
        if (res.data.message === "email existe") {
          setErrMsg("staff deja existe");
        }
      })
      .catch((err) => console.log(err));
  }

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
                Ajouter Compte Staff
              </Typography>
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Name"
                      autoFocus
                      type="name"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                {errMsg === "" ? null : (
                  <>
                    <span style={{ color: "red" }}>{errMsg}</span>
                    <br />
                  </>
                )}

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Password (Confirm)"
                      type="password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => onChangeImage(e)}
                  />
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
                  aria-label="Register"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Ajouter staff
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
