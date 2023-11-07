import React from "react"
import { Box, Switch } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useIo } from "../../hooks/useIo"

interface ToggleSwitchProps {}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({}) => {
  // const io = useIo()
  // const { user, updateStatus } = useUser()

  // const handleFinishCoffee = () => {
  //     io.emit("coffee:ready")
  //     updateStatus(1)
  // }

  return (
    <Box>
      <Switch
        // checked={coffee.wanting}
        // onChange={(_, checked) => coffee.toogleWanting(checked)}
        sx={{
        }}
        icon={
          <CircleIcon
            sx={{
            }}
            />
          }
          checkedIcon={
            <CheckCircleIcon
            sx={{
            }}
          />
        }
      />
    </Box>
  )
}
