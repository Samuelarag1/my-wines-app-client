import { AlertColor, AlertTitle, Stack } from "@mui/material";
import { Alert } from "@mui/material";

export interface IAlertProps {
  message: string;
  title: string;
  severity: AlertColor;
}

export default function AlertComponent({
  message,
  title,
  severity,
}: IAlertProps) {
  return (
    <Stack width={"300px"}>
      <Alert severity={severity} className="m-2 mt-[90vh]">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}
