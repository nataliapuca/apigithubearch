import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { debounce } from "lodash";
import { schema } from "./Formschema";
import { FormData } from "./Form.types";

export const Form = () => {
  const {
    control,
    watch,
    formState: { errors, isDirty },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { setSearchedPhrase, isLoading, setIsInitialMode } =
    useContext(AppContext);

  const watchedName = watch("name");

  const debouncedValidation = debounce(async (value: string) => {
    if (isDirty) {
      setIsInitialMode(false);
      const isValid = await trigger("name");

      if (isValid) {
        setSearchedPhrase(value);
      } else {
        if (value === "") {
          setSearchedPhrase("");
        }
      }
    }
  }, 2000);

  useEffect(() => {
    debouncedValidation(watchedName);

    return () => {
      debouncedValidation.cancel();
    };
  }, [watchedName, trigger, isDirty, debouncedValidation]);

  return (
    <form style={{ height: "80px" }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={isLoading}
            label="Username"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            onBlur={() => field.onBlur()}
          />
        )}
      />
    </form>
  );
};
