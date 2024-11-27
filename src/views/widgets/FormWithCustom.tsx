import type { FC, ReactNode } from 'react'

import { FormControl, FormHelperText, InputLabel } from '@mui/material'

type FormWithCustomProps = {
  name: string
  error?: string
  label?: string
  children: ReactNode // this is a type that can accept any JSX element
}

const FormWithCustom: FC<FormWithCustomProps> = ({ name, error, children, label }) => {
  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      {children}
      <FormHelperText error>{error}</FormHelperText>
    </FormControl>
  )
}

export default FormWithCustom
