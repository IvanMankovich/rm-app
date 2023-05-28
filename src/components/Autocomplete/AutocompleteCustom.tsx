import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  Avatar,
  Chip,
  debounce,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

export interface AutocompleteBaseProps {
  label: string;
  placeholder: string;
  searchQuery: (value: string) => Promise<IOption[]>;
}

export interface IOption {
  id: string;
  name: string;
  image?: string;
}

export interface AutocompleteCustomProps extends AutocompleteBaseProps {
  multi?: boolean;
  selectedValue: IOption | null | IOption[];
  setSelectedValue: React.Dispatch<React.SetStateAction<IOption | null | IOption[]>>;
}

export const AutocompleteCustom = ({
  label,
  placeholder,
  searchQuery,
  selectedValue,
  setSelectedValue,
  multi,
}: AutocompleteCustomProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<IOption[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onChangeHandle = async (value: string) => {
    const res = await searchQuery(value);
    setOptions(res);
    setLoading(false);
  };

  const handleChange = (option: IOption) => {
    if (multi) {
      if ((selectedValue as IOption[]).find((opt) => opt.id === option.id)) {
        setSelectedValue((selectedValue as IOption[]).filter((opt) => opt.id !== option.id));
      } else {
        setSelectedValue([...(selectedValue as IOption[]), option]);
      }
    } else {
      setSelectedValue(option);
    }
  };

  const onInputChange = debounce((ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = ev.target;
    setInputValue(value);
    setLoading(true);
    onChangeHandle(value);
  }, 300);

  return (
    <Autocomplete
      multiple={multi}
      value={multi ? (selectedValue as IOption[]) : (selectedValue as IOption | null)}
      options={options}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      isOptionEqualToValue={(opt, value) => {
        return opt.id === value.id;
      }}
      onChange={(
        _event: React.SyntheticEvent<Element, Event>,
        _value: IOption | null | IOption[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<IOption> | undefined
      ) => {
        if (multi) {
          if (reason === "removeOption") {
            setSelectedValue((selectedValue as IOption[]).filter((opt) => opt.id !== details?.option?.id));
          }
          if (reason === "clear") {
            setSelectedValue([]);
          }
        } else {
          if (reason === "clear") {
            setSelectedValue(null);
          }
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
