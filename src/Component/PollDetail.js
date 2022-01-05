import { ApiPollDetail, accessToken } from "./Others";
import { TextField, Typography, Button } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

export default function PollDetail() {
  const idPollDetail = sessionStorage.getItem("idPollDetail");
  const fields = ["pollName"];
  const schema = Yup.object().shape({
    pollName: Yup.string().required(),
  });
  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      pollName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios
      .get(`${ApiPollDetail}/${idPollDetail}`, {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      })
      .then((respon) => {
        fields.forEach((field) => setValue(field, respon.data.title));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Typography variant="h2">Poll Detail</Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="pollName">
          <label htmlFor="pollName">Poll Name</label>
          <Controller
            name="pollName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                id="pollName"
                variant="outlined"
                value={value}
                type="text"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <div className="pollQuestion">
          <label htmlFor="pollQuestion">Poll Question</label>

          <Controller
            name="pollQuestion"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                onChange={onChange}
                id="pollQuestion"
                value={value}
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </div>

        <div className="description">
              <label htmlFor="description">Description</label>
              <Controller
                control={control}
                name="question"
                render={({field:{onChange, value},fieldState:{error}})=>(
                  <TextField
                    onChange={onChange}
                    value={value}
                    id="description"
                    type="text"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
        </div>
        <Button
          variant="outlined"
          onClick={() => setValue("pollName", "helllooooooooo")}
        >
          CLick
        </Button>
      </form>
    </div>
  );
}
