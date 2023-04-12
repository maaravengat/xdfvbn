
import React, { useEffect, useState } from 'react'
import { Field, reduxForm, formValueSelector, change, resetSection } from 'redux-form'
import { reset } from 'redux-form'
import { useMutation, gql, useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
// import wsdfgh  from "../Backend/public/files"
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { url } from 'redux-form-validators'

const ADD_MUTATIONS = gql`
mutation AddBook($firstname: String!,$lastname: String!,$dob:String!,$email: String! ,$imagename: String!){
    addbook(firstname: $firstname, lastname:$lastname,dob:$dob,email:$email,imagename:$imagename){
        id
        firstname
        lastname
        dob
        email
        imagename
    }
}`
const DELETE_MUTATIONS = gql`
mutation DeleterUser($id: String!){
    deleteruser(id:$id){
     id
    }
}`

const UPDATE_MUTATIONS = gql`
mutation UpdateUser($id: String!,$firstname: String!,$lastname: String!,$dob:String!,$email: String!,$imagename: String!){
    updateuser( id:$id, firstname: $firstname, lastname:$lastname,dob:$dob,email:$email,imagename:$imagename){
     id
     firstname
     lastname
     dob
     email
     imagename
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
      imagename
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


let SyncValidationForm = props => {
    const [imageName, setImageName] = useState(null)
    const [preview, setPreview] = useState(0)
    const RenderUpload = ({ label, input: { value, onChange } }) => {




        const onDrop = (acceptedfiles) => {

            // let imageName= null

            const fromData = new FormData();
            fromData.append('file', acceptedfiles[0])

            axios.post('http://localhost:4000/uploads', fromData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                setImageName(response.data.file.filename)

                if (response.status == 200) {
                    console.log(response.data.file.filename, 'fdsdf');
                    setImageName(response.data.file.filename)
                    console.log(imageName, 'gfdfggfgg');

                    //   imageName = response.data.file.filename
                }

                const selectedFile = acceptedfiles[0];
                onChange(selectedFile)
                const reader = new FileReader();

                reader.onload = () => {

                    setPreview(reader.result);
                    console.log(reader.result);
                }
                reader.readAsDataURL(selectedFile)

                // setImageName(imageName)
                console.log('=========imageName====', imageName);


            })


        }
        return (
            <p>
                <Dropzone
                    onDrop={onDrop}  >
                    {({ getRootProps, getInputProps }) => (
                        <div class="dropzone mt-4 border-dashed" style={{

                        }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            {preview.length > 0 ? (<img src={preview} />
                            ) : (<p>Upload a Photo here</p>)}

                        </div>
                    )}
                </Dropzone>
            </p>

        )
    }
    const { handleSubmit, reset, resetForm, initialValues, dispatch, } = props

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

    const [updateuser] = useMutation(UPDATE_MUTATIONS, {
        refetchQueries: [
            { query: FORM_DATA }
        ],


    })

    const { data } = useQuery(FORM_DATA)



    const handleEdit = (id) => {
        console.log(id, 'howzat');
        props.initialize(id)
    }

    const submit = async values => {

        if (props.id) {
            await updateuser({
                variables: {
                    id: props.id,
                    firstname: props.firstname,
                    lastname: props.lastname,
                    dob: props.dob,
                    email: props.email,
                    imagename: imageName

                }
            })
        }
        else {
            await addbook({

                variables: {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    dob: values.dob,
                    email: values.email,
                    imagename: imageName
                }

            })
        }
        //  reset()
        dispatch(reset('SyncValidationForm'))
        setPreview(false)
    }
    useEffect(() => {
        console.log("userdata");
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

                <Field name="image" type=' file' component={RenderUpload} />

                <br />
                <br />
                {/* 
                <Field
                  name="picture"
                  component={renderDropzoneInput}
              /> */}
                {/* <Field name="password" type="password" component={renderField} label="PassWord" />  */}
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
                    {/* <button type="button" onClick={() => update()}>Update</button> */}
                    <button type="button" class="bg-danger text-dark" onClick={() => dispatch(reset(SyncValidationForm))} >
                        Clear Values
                    </button>

                </div>
                <div>

                </div>

            </form>
            <div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> D.O.B</th>
                                <th> Email</th>
                                <th>Image</th>
                                <th> Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data && data.book.map(user => {

                                console.log(user, '=========>');
                                return (
                                    <tr>
                                        {/* <td>{<img src={} />}</td> */}
                                        <td>{user.firstname}</td>

                                        <td>{user.lastname}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.email}</td>
                                        <td>{user.imagename}</td>
                                        {/* <td><div>{<img src={`${process.env.PUBLIC_URL}(${user.imagename})`} />}</div></td> */}
                                        {/* <td>
    <div style={{backgroundImage: ur}}>
    </div>
</td> */}




                                        {/* <td><div>{<img src ={'../'} />}</div></td> */}
                                        {/* <td><div>{<img src={`${process.env.PUBLIC_URL}(${user.imagename})`} height ='50px'/>}</div></td> */}

                                        {/* <div style={{ backgroundSize: "cover", backgroundImage: "url(../Backend/public/files/1680676255449.jpeg)" }}>

                                        </div> */}


                                        <td>
                                            <button onClick={() => handleEdit(user)}>Edit</button>

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


SyncValidationForm = (reduxForm({
    form: 'syncValidation',
    validate,
    enableReinitialize: true,


}))(SyncValidationForm)

const selector = formValueSelector('syncValidation')


// SyncValidationForm = connect(

//     state => {
//         const firstname = selector(state, 'firstname')
//         const lastname = selector(state, 'lastname')
//         const dob = selector(state, 'dob')
//         const email = selector(state, 'email')
//         const id = selector(state, 'id')
//         return {
//             firstname,
//             lastname,
//             dob,
//             email,
//             id
//         }
//     }

// )(SyncValidationForm)

const mapStateToProps = (state) => {
    const firstname = selector(state, 'firstname')
    const lastname = selector(state, 'lastname')
    const dob = selector(state, 'dob')
    const email = selector(state, 'email')
    const id = selector(state, 'id')
    const imagename = selector(state, 'imagename')

    return {
        firstname,
        lastname,
        dob,
        email,
        id,
        imagename
    };
};

const mapDispatchToProps = (dispatch) => {
    return (
        dispatch(reset('SyncValidationForm'))

    )



}


export default connect(mapStateToProps, mapDispatchToProps)(SyncValidationForm)
