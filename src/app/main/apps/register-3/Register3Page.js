import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconButton, Input } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {},
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("Vous devez entrer votre nom"),
  email: yup
    .string()
    .email("Vous devez entrer un email valide")
    .required("Vous devez entrer un email"),
  password: yup
    .string()
    .required("S'il vous plait entrez votre mot de passe.")
    .min(
      8,
      "Le mot de passe est trop court - doit comporter au moins 8 caractères."
    ),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "les mots de passe doivent correspondre"
    ),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "Les termes et conditions doivent être acceptés."),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function Register3Page() {
  const classes = useStyles();
  const Input = styled("input")({
    display: "none",
  });
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");
  const [image, setimage] = useState();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onChangeImage =  (event) => {
    const file = event.target.files[0];

    setimage(file);
  };

  function onSubmit(user) {
    reset(defaultValues);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", image);
    formData.append("role", "admin");

    axios
      .post("http://localhost:3200/api/add_users", formData)
      .then((res) => {
        if (res.data.message === "User added succesful") {
          console.log("_____", res.data.message);
          history.push("/login");
        }
        if (res.data.message === "email existe") {
          setErrMsg("Admin deja existe");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24"
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className={clsx(
            classes.leftSection,
            "flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          )}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img
                  className="logo-icon w-48"
                  src="assets/images/logos/fuse.svg"
                  alt="logo"
                />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography
                    className="text-24 font-semibold logo-text"
                    color="inherit"
                  >
                    S'inscrire
                  </Typography>
                  <Typography
                    className="text-16 tracking-widest -mt-8 font-700"
                    color="textSecondary"
                  >
                    à la plateforme
                  </Typography>
                </div>
              </div>
            </motion.div>

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
                    label="Nom"
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

              <Controller
                name="acceptTermsConditions"
                control={control}
                render={({ field }) => (
                  <FormControl
                    className="items-center"
                    error={!!errors.acceptTermsConditions}
                  >
                    <FormControlLabel
                      label="
                      J'ai lu et j'accepte les termes et conditions"
                      control={<Checkbox {...field} />}
                    />
                    <FormHelperText>
                      {errors?.acceptTermsConditions?.message}
                    </FormHelperText>
                  </FormControl>
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
                className="w-full mx-auto mt-16"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
              >
                Create an account
              </Button>
            </form>
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <span className="font-normal">Vous avez déjà un compte?</span>
            <Link className="font-normal" to="/login">
              Login
            </Link>
          </div>
        </Card>

        <div
          className={clsx(
            classes.rightSection,
            "hidden md:flex flex-1 items-center justify-center p-64"
          )}
        >
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                Bienvenue <br />
                chez <br /> Général Industriel !
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                variant="subtitle1"
                color="inherit"
                className="mt-32 font-medium"
              >
                Cette page uniquement pour l'administrateur
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register3Page;
