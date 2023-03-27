import React, { useEffect, useState } from 'react'
import { Field, getFormInitialValues, reduxForm } from 'redux-form'
import { useMutation, gql, useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
const ADD_MUTATIONS = gql`
mutation AddBook($firstname: String!,$lastname: String!,$dob:String!,$email: String!){
    addbook(firstname: $firstname, lastname:$lastname,dob:$dob,email:$email){
        id
        firstname
        lastname
        dob
        email
    }
}`
const DELETE_MUTATIONS = gql`
mutation DeleterUser($id: String!){
    deleteruser(id:$id){
     id
    }
}`

const UPDATE_MUTATIONS = gql`
mutation UpdateUser($id: String!,$firstname: String!,$lastname: String!,$dob:String!,$email: String!){
    updateuser( id:$id, firstname: $firstname, lastname:$lastname,dob:$dob,email:$email){
     firstname
    }
}`
const FORM_DATA = gql`
query languagequery{
    book {
      id
      firstname
      lastname
      dob
      email
    }
  }`


const validate = values => {
    const errors = {}
    const regexp = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    if (!values.firstname) {
        errors.firstname = '*Required'
    }
    if (!values.lastname) {
        errors.lastname = '*Required'
    } if (!values.dob) {
        errors.dob = '*Required'
    }
    if (!values.email) {
        errors.email = '*Required'
    }
    if (!values.password) {
        errors.password = "*Required"
    } else if ((!regexp.test(values.password))) {
        errors.password = "* One Upper case"
    }
    if (!values.gender) {
        errors.gender = "*Required"
    }
    if (!values.hobbies || values.colors.hobbies) {
        errors.hobbies = "*Required"
    }
    if (!values.language) {
        errors.language = 'Please select a one Language';
    }
    return errors
}


const language = [
    { label: 'Tamil', value: 'Tamil' },
    { label: 'English', value: 'English' },
    { label: 'Hindi', value: 'Hindhi' },

];
const gender = [
    { id: "Male", value: "Male" },
    { id: "Female", value: "Female" }
]

const colors = [
    { id: 'Reading Books', value: 'red' },
    { id: 'Swimming', value: 'green' },
    { id: 'Playing', value: 'blue' },
];

const renderSelect = ({ input, label, meta: { touched, error }, children }) => (
    <div>
        <label class="text-primary col-sm-1">{label}: </label>
        <select class="col-sm-2 form-control-sm" {...input}>
            {children}
        </select>
        {touched && error && <span class="text-danger">{error}</span>}
    </div>
);
const renderRadio = ({ input, label, meta: { touched, error } }) => (
    <div>
        <label class='col-sm-2'>

            {gender.map((label, key) => (
                <p >
                    <input type="radio" {...input} value={key} />
                    <label> {label.id}</label>
                </p>
            ))}
            {touched && error && <span class="text-danger">{error}</span>}
        </label>
    </div>

);
//   <button onClick={() => {
//                                                     updateuser({
//                                                         variables: {
//                                                             id:data.id,
//                                                             firstname: data.firstname,
//                                                             lastname: data.lastname,
//                                                             dob: data.dob,
//                                                             email: data.email

//                                                         }
//                                                     })
//                                                 }}>Update</button> 



const renderCheckbox = ({ input, label, meta: { touched, error } }) => (
    <div >
        <label >
            {colors.map((label, value) => (
                <p>
                    <input type="checkbox" {...input} />
                    <label>{label.id}</label>
                </p>
            ))}
            {touched && error && <span class="text-danger">{error}</span>}
        </label>
    </div>
);



const renderField = ({
    input,
    label,
    type,
    meta: { touched, error }
}) => (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center' }} >
        <div>
            <label class="text-primary ">{label}:</label >

            <input {...input} placeholder={label} type={type} class="form-control-sm col-sm-8 " />
            {touched &&
                (error && <span class="text-danger">{error}</span>)}

        </div>
    </div>
)


const SyncValidationForm = props => {
    const { handleSubmit, reset, initialValues } = props
    
    // const { book } = useQuery(FORM_DATA)
    const [addbook] = useMutation(ADD_MUTATIONS, {
        refetchQueries: [
            { query: FORM_DATA }
        ],

    })
    const [deleteruser] = useMutation(DELETE_MUTATIONS, {
        refetchQueries: [
            { query: FORM_DATA }
        ],

    })

    const [updateuser] = useMutation(UPDATE_MUTATIONS)
    
    const { data } = useQuery(FORM_DATA)
    

    
      const handleEdit = (id) => {
        props.initialize({firstname:id.firstname ,lastname:id.lastname, dob:id.dob, email:id.email})
      }
    const submit = async values  => {
       console.log(values,'fdsdfdsdf')
    //     alert("Success Fully Updated")

        //  const {firstname, lastname,dob, email} =initialValues;
        //  const input ={firstname, lastname,dob, email}
    
        //   if (!initialValues) {
        //       await updateuser({
        //            variables: {
        //           id: values.id,
        //  firstname: values.firstname,
        //                lastname: values.lastname,
        //              dob: values.dob,
        //                email: values.email
        //           }
        //        })
        //     } else {
         await addbook({

             variables: {
                 firstname: values.firstname,
         lastname: values.lastname,
                dob: values.dob,
                email: values.email
            }

        })
    //    }

        reset()
   
    }
    useEffect(() => {
        console.log( "userdata");
    }, [])
    return (
        <div >
            <form onSubmit={handleSubmit(submit)} >
                <h3 class='text-primary'>Redux Form</h3>
                <br />

                <Field
                    name="firstname"
                    type="text"
                    component={renderField}
                    label="FirstName"
                />
                <br />
                <Field name="lastname" type="text" component={renderField} label="LastName" />
                < br />

                <Field name="dob" type="date" dateformat="yyyy/mm/dd" component={renderField} label="D.O.B" />
                < br />
                <Field name="email" type="email" component={renderField} label="Email" />
                <br />
                {/* <Field name="password" type="password" component={renderField} label="PassWord" /> */}
                <br />
                <div>
                    {/* 
                <div>
                    <Field name="language" component={renderSelect} label="Languages" >
                        <option value="">Select </option>
                        {language.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Field>
                    < br />
                </div>

                <div class="form-group row" >

                    <label class="text-primary  col-sm-10">Gender:</label>
                    <label class="col-sm-12">
                        <Field name="gender" component={renderRadio} label="Male" value="option" />
                    </label>
                </div>
            </div>
            < br />

            <div class="form-group row">
                <label class="text-primary col-sm-10">Hobbies :</label>
                <label class="col-sm-12">
                    <Field

                        name="hobbies"
                        component={renderCheckbox}
                        label="Color"

                    />
                </label>
            </div>
            < br /> */}
                </div>
                <div>
                    <button type="submit" class="bg-success text-dark">
                        Submit
                    </button>
                    <button type="button" class="bg-danger text-dark" onClick={reset}>
                        Clear Values
                    </button>
                    {/* <button onClick={() => {
                                                    updateuser({
                                                        variables: {
                                                            id:data.id,
                                                            firstname: data.firstname,
                                                            lastname: data.lastname,
                                                            dob: data.dob,
                                                            email: data.email

                                                        }
                                                    })
                                                }}>Update</button>  */}
                </div>
                <div>

                </div>

            </form>
            <div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> D.O.B</th>
                                <th> Email</th>
                                <th> Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data && data.book.map(user => {
                                return (
                                    <tr>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => handleEdit(user)}>Edit</button>
                                              {/* <button onClick={() => {
                                                    updateuser({
                                                        variables: {
                                                            id: user.id,
                                                            firstname: user.firstname,
                                                            lastname: user.lastname,
                                                            dob: user.dob,
                                                            email: user.email

                                                        }
                                                    })
                                                }}>Update</button> */}
                                            <button onClick={() => {
                                                deleteruser({ variables: { id: user.id } });
                                            }}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

 const mapStateToProps = (state) => {
     return {
         initialValues: {
             firstName: state.data.firstName,
             lastName: state.data.lastName,
             dob: state.data.dob,
             email: state.data.email
         }
    }
 }
export default (reduxForm({
    form: 'syncValidation',
    validate,
    enableReinitialize: true

}))(SyncValidationForm)

