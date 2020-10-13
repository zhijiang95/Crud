import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Controls from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm'
import * as employeeService from '../../services/employeeService'

const genderItems = [
  { id: '1', title: '1' },
  { id: '2', title: '2' },
  { id: '3', title: '3' }
]

const initialFValues = {
  id: 0,
  screening: '',
  category: '',
  age: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false
}

export default function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('screening' in fieldValues)
      temp.screening = fieldValues.screening ? '' : 'This field is required.'
    if ('category' in fieldValues)
      temp.category = fieldValues.category ? '' : 'category is not valid.'
    if ('age' in fieldValues)
      temp.age = fieldValues.age.length > 1 ? '' : 'Age is required.'
    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? '' : 'This field is required.'
    setErrors({
      ...temp
    })

    if (fieldValues == values) return Object.values(temp).every(x => x == '')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="screening"
            label="Screening group"
            value={values.screening}
            onChange={handleInputChange}
            error={errors.screening}
          />
          <Controls.Input
            label="Activity"
            name="category"
            value={values.category}
            onChange={handleInputChange}
            error={errors.category}
          />
          <Controls.Input
            label="Age"
            name="age"
            value={values.age}
            onChange={handleInputChange}
            error={errors.age}
          />

          <Controls.Input
            label="Frequency"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Priority"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="screening"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.Select
            name="departmentId"
            label="Investigation"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
