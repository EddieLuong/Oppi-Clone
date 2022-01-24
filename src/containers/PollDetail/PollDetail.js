import { formatDate } from "../../components/Utils";
import { Typography, Button } from "@material-ui/core";
import { MuiTextfield } from "../../components/styles/styled";
import FormHelperText from "@mui/material/FormHelperText";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "antd";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataPoll, sendPutRequest } from "./reducer";
import { fields } from "../../components/Utils";

function PollDetail() {
  const dispatch = useDispatch();
  const dataPoll = useSelector((state) => state.polldetail.dataPoll);
  const schema = Yup.object().shape({
    title: Yup.string()
      .max(80, "Poll Name must be less than 80 characters.")
      .required("This is required field."),
    question: Yup.string()
      .max(255, "Poll question must be less than 255 characters.")
      .required("This is required field."),
    description: Yup.string()
      .max(999, "Poll question must be less than 999 characters.")
      .required("This is required field."),
  });
  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      question: "",
      description: "",
      openedAt: 0,
      closedAt: 0,
      isPublicResult: false,
      resultRedirectUrl: "",
      isRequireEmail: false,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(sendPutRequest(data));
  };
  useEffect(() => {
    fields.forEach((field) => {
      if (field === "openedAt" || field === "closedAt") {
        setValue(field, formatDate(dataPoll[field], { format: "YYYY-MM-DD" }));
      } else setValue(field, dataPoll[field] ? dataPoll[field] : "");
    });
  }, [dataPoll]);

  useEffect(() => {
    dispatch(fetchDataPoll());
  }, []);
  return (
    <React.Fragment>
      {/* Log out Section */}
      <Header />
      <div className="pollDetail">
        <Typography variant="h2">Poll Detail</Typography>
        <form
          className="formPollDetail flex-col"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="pollName flex-col">
            <label className="labelPollDetail" htmlFor="pollName">
              Poll Name *
            </label>
            <Controller
              name="title"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MuiTextfield
                  onChange={onChange}
                  className="textfield"
                  id="pollName"
                  multiline={true}
                  rows={2}
                  variant="outlined"
                  value={value}
                  type="text"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
            <FormHelperText style={{ alignSelf: "end" }}>
              Max 80 characters
            </FormHelperText>
          </div>
          <div className="pollQuestion flex-col">
            <label className="labelPollDetail" htmlFor="pollQuestion">
              Poll Question *
            </label>

            <Controller
              name="question"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MuiTextfield
                  type="text"
                  onChange={onChange}
                  className="textfield"
                  id="pollQuestion"
                  value={value}
                  variant="outlined"
                  multiline={true}
                  rows={2}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
            <FormHelperText style={{ alignSelf: "end" }}>
              Max 255 characters
            </FormHelperText>
          </div>
          <div className="description flex-col">
            <label className="labelPollDetail" htmlFor="description">
              Description *
            </label>
            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MuiTextfield
                  onChange={onChange}
                  value={value}
                  className="textfield"
                  variant="outlined"
                  id="description"
                  type="text"
                  multiline={true}
                  rows={13}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
            <FormHelperText style={{ alignSelf: "end" }}>
              Max 999 characters
            </FormHelperText>
          </div>
          <div className="pollDate flex-col">
            <label className="labelPollDetail" htmlFor="startDate">
              Poll Dates
            </label>
            <div className="flex-row">
              <Controller
                name="openedAt"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <React.Fragment>
                      <label htmlFor="startDate">From</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          onChange={onChange}
                          value={value}
                          minDate={new Date(value)}
                          maxDate={new Date(value)}
                          renderInput={(params) => (
                            <MuiTextfield
                              id="zeropadding"
                              className="textfield labelDate"
                              variant="outlined"
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </React.Fragment>
                  );
                }}
              />
              <Controller
                name="closedAt"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <React.Fragment>
                    <label htmlFor="endDate">to</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={onChange}
                        value={value}
                        minDate={new Date(dataPoll.openedAt)}
                        renderInput={(params) => (
                          <MuiTextfield
                            className="textfield labelDate"
                            id="zeropadding"
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </React.Fragment>
                )}
              />
            </div>
          </div>

          <div className="flex-row rowspace mt10">
            <div className="publicRults flex-col ">
              <label className="labelPollDetail" htmlFor="">
                Public results
              </label>
              <Controller
                control={control}
                name="isPublicResult"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Switch
                      disabled={value}
                      onChange={onChange}
                      checked={value}
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      defaultChecked
                    />
                  );
                }}
              />
            </div>
            <div className="redirectURL flex-col">
              <label className="labelPollDetail" htmlFor="redirectURL">
                Redirect URL
              </label>
              <Controller
                name="resultRedirectUrl"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MuiTextfield
                    disabled={dataPoll.isPublicResult}
                    className="textfield"
                    id="zeropadding"
                    onChange={onChange}
                    value={value}
                    variant="outlined"
                    type="text"
                  />
                )}
              />
            </div>
            <div className="emailRequired flex-col">
              <label className="labelPollDetail" htmlFor="">
                Email required
              </label>
              <Controller
                control={control}
                name="isRequireEmail"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    onChange={onChange}
                    checked={value}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    defaultChecked
                  />
                )}
              />
            </div>
          </div>
          <Button
            className="btnUpdate"
            type="submit"
            variant="outlined"
            onClick={onSubmit}
          >
            Save
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}
export default React.memo(PollDetail);
