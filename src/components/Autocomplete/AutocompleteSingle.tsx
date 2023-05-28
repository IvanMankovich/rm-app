import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  Avatar,
  Chip,
  debounce,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { AutocompleteBaseProps, IOption } from "./types";

export interface AutocompleteSingleProps extends AutocompleteBaseProps {
  selectedValue: IOption | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<IOption | null>>;
}

export const AutocompleteSingle = ({
  label,
  placeholder,
  searchQuery,
  selectedValue,
  setSelectedValue,
}: AutocompleteSingleProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<IOption[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onChangeHandle = async (value: string) => {
    const res = await searchQuery(value);
    setOptions(res);
    setLoading(false);
  };

  const handleChange = (option: IOption) => {
    setSelectedValue(option);
  };

  const onInputChange = debounce((ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = ev.target;
    setInputValue(value);
    setLoading(true);
    onChangeHandle(value);
  }, 300);

  return (
    <Autocomplete
      value={selectedValue}
      options={options}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      isOptionEqualToValue={(opt, value) => {
        return opt.id === value.id;
      }}
      onChange={(
        _event: React.SyntheticEvent<Element, Event>,
        _value: IOption | null,
        reason: AutocompleteChangeReason
      ) => {
        if (reason === "clear") {
          setSelectedValue(null);
        }
      }}
      renderTags={(value: readonly IOption[], getTagProps) =>
        value.map((option: IOption, index: number) => {
          return option.image ? (
            <Chip
              variant="outlined"
              avatar={<Avatar src={option.image} />}
              label={option.name}
              {...getTagProps({ index })}
            />
          ) : (
            <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
          );
        })
      }
      renderOption={(
        _props: React.HTMLAttributes<HTMLLIElement>,
        option: IOption,
        state: AutocompleteRenderOptionState
      ) => {
        return (
          <ListItem selected={state.selected} key={option.id} onClick={() => handleChange(option)} button>
            {option.image && <Avatar src={option.image} />}
            <Typography
              variant="body2"
              sx={
                option.image
                  ? {
                      marginLeft: 2,
                    }
                  : {}
              }
            >
              {option.name}
            </Typography>
          </ListItem>
        );
      }}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          value={inputValue}
          label={label}
          placeholder={placeholder}
          onChange={onInputChange}
          onFocus={() => {
            setLoading(true);
            onChangeHandle("");
          }}
        />
      )}
      sx={{
        backgroundColor: "#fff",
        marginBottom: "0.5rem",
      }}
    />
  );
};
