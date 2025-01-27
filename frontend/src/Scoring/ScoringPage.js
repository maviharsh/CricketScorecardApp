import {  Box, Container} from '@mui/material'
import React from 'react'
import HorizontalStepper from './HorizontalStepper'

export default function ScoringPage()
{
  return (
    <div>
      <Container>
        <Box marginTop={10}>
          <HorizontalStepper />
        </Box>
      </Container>
    </div>
  )
}

