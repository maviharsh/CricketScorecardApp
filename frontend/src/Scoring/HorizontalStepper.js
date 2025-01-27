import { TextField,Button,Typography } from '@mui/material'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import './Horizontal.css'


export default function HorizontalStepper () {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0)
  const [isSubmitting, setSubmitting] = React.useState(false)

  const steps = ['Team', 'Overs', 'Batting']
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const initialValues = {
    team1: '',
    team2: '',
    maxOver: '',
    batting: '',
  }
  const validationSchema = [
    Yup.object().shape({
      team1: Yup.string().required('Team Name is required'),
      team2: Yup.string().required('Team Name is required'),
    }),
    Yup.object().shape({
      maxOver: Yup.string().required('Over is required'),
    }),
    Yup.object().shape({
      batting: Yup.string().required('Please choose who is Batting'),
    }),
  ]
  const currentValidationSchema = validationSchema[activeStep]
  function isLastStep() {
    return activeStep === steps.length - 1
  }
  return (
    <div>
      <Stepper activeStep={activeStep} orientation='horizontal'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mainContainer ">
        <Formik
          enableReinitialize
          validationSchema={currentValidationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleNext()
            actions.setTouched({})
            actions.setSubmitting(false)
            if (isLastStep()) {
              setSubmitting(true)
              const data = JSON.stringify(values)
              localStorage.setItem('data', data)
              navigate('/score')
              setSubmitting(false)
            }
          }}
        >
          {(prp) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = prp
            return (
              <form onSubmit={handleSubmit}>
                <div className="formContainer">
                  {activeStep === 0 && (
                    <div>
                      <div className="formGroup">
                        <TextField
                          id='team1'
                          name='team1'
                          label='Team1 Name*'
                          value={values.team1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.team1 && touched.team1 && errors.team1}
                          error={errors.team1 && touched.team1}
                          className="textfieldWidth"
                        />
                      </div>
                      <div>
                        <Typography className="center">VS</Typography>
                      </div>
                      <div className="formGroup">
                        <TextField
                          id='team2'
                          name='team2'
                          label='Team2 Name*'
                          value={values.team2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.team2 && touched.team2 && errors.team2}
                          error={errors.team2 && touched.team2}
                          className="textfieldWidth"
                        />
                      </div>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div>
                      <div className="formGroup" id='team1-players'>
                        <Typography className="teamNameHeading">How many overs?</Typography>
                        <div className="formGroup">
                          <TextField
                            id='maxOver'
                            name='maxOver'
                            label='Overs*'
                            value={values.maxOver}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.maxOver && touched.maxOver && errors.maxOver}
                            error={errors.maxOver && touched.maxOver}
                            className="textfieldWidth"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div>
                      <div className="formGroup">
                        <FormControl component='fieldset'>
                          <FormLabel component='legend'>Who is Batting?</FormLabel>
                          <RadioGroup
                            name='batting'
                            value={values.batting.toString()}
                            onChange={(event) => {
                              setFieldValue('batting', event.currentTarget.value)
                            }}
                          >
                            <FormControlLabel value={values.team1} control={<Radio />} label={values.team1} />
                            <FormControlLabel value={values.team2} control={<Radio />} label={values.team2} />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  )}
                  <div>
                    <Button variant='contained' disabled={activeStep === 0} onClick={handleBack} className="backButton">
                      Back
                    </Button>
                    <Button id='submit' disabled={isSubmitting} variant='contained' color='primary' type='submit'>
                      {isLastStep() ? 'Start Game' : 'Next'}
                    </Button>
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
