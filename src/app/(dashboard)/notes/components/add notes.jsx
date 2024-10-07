import { Sidebar } from 'primereact/sidebar';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';

import { useMutation } from "react-query";
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import setData from "@/tools/setData";

import { useState, useRef } from 'react'
import { Button } from 'primereact/button';

import {createNewNotes} from "@/queries/notes"
import { FloatLabel } from 'primereact/floatlabel';

export default function AddNotes ({onShow, onShowSet, refetch, toast, tokken}){

    const priority = [
        { name: 'High priority', code: 'high' },
        { name: 'Normal', code: 'normal' },
        { name: 'Low priority', code: 'low' }
    ];

    const [selPriority, setSelPriority] = useState(priority[1]);


    const addNewNotes = useMutation((newNotes) => {
        setData(createNewNotes, tokken, {data: newNotes}, '').then((res) => {
          console.log(res);
        });
      });

    const onSave = () => {
        // alert('save')
        formik.handleSubmit();
        // refetch();
    }

    const formik = useFormik({
        initialValues:{
             caption: '',
             message:'',
             priority:'',
        },
        validate:(data) => {
            let error = {}

            if(!data.caption){
                error.caption = "caption is required"
            }
            if(!data.message){
                error.message = "message is required"
            }
            if(!data.priority){
                error.priority = "priority is required"
            }

            return error;
        },
        onSubmit: (data) => {
            // alert(JSON.stringify(data));

            try {
                addNewNotes.mutate({
                    caption: data.caption,
                    message: data.message,
                    priority: data.priority
                });
            } catch (error) {
                alert(error.message);
            } finally {
                toast.current.show({severity:'success', summary: 'Add New Notes', detail:'Save Success', life: 3000});
                onShowSet(false)
                

                setTimeout(()=>{
                    refetch();
                   }, 2000)

            }

            formik.resetForm();
            formik.setErrors({});
            
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getErrorMessage = (param) => isFormFieldValid(param) && formik.errors[param];

    return(
        <>
        <div className="card flex justify-content-center">
                <Sidebar visible={onShow} onHide={() => onShowSet(false)} position="right"
                    style={{ width: 300 }}
                    onShow={()=>{   
                        formik.setFieldValue('priority', selPriority.code);
                    }}
                >
                    <h3>Add New</h3>
                    <p>
                        Input your new notes here
                    </p>
                    <div>
                        
                        <div className="p-inputgroup flex-1">
                            <span style={{ color: 'red' }}>*</span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <FloatLabel>
                                <InputText onChange={formik.handleChange}
                                    value={formik.values.caption} name="caption"
                                    placeholder={getErrorMessage('caption')}
                                    className={classNames({ 'p-invalid': isFormFieldValid('caption') })}
                                />
                                <label>Caption</label>
                            </FloatLabel>
                        </div>

                            <br></br>

                        <div className="p-inputgroup flex-1">
                            <span style={{ color: 'red' }}>*</span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-file-edit"></i>
                            </span>
                            <FloatLabel>
                                <InputText onChange={formik.handleChange}
                                    value={formik.values.message} name="message"
                                    placeholder={getErrorMessage('message')}
                                    className={classNames({ 'p-invalid': isFormFieldValid('message') })}
                                />
                                <label>Message</label>
                            </FloatLabel>
                        </div>

                            <br></br>

                        <div className="p-inputgroup flex-1">
                        <span style={{ color: 'red' }}>*</span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-file-edit
                                    "></i>
                            </span>
                            <FloatLabel>
                                <Dropdown value={selPriority} onChange={(e) => {
                                    setSelPriority(e.value)
                                    formik.setFieldValue('priority', e.value.code);
                                }} options={priority} optionLabel="name"
                                    name="priority"
                                    placeholder={getErrorMessage('priority')}
                                    className={classNames({ 'p-invalid': isFormFieldValid('priority') })}
                                />
                                <label>Priority</label>
                            </FloatLabel>
                        </div>

                        <Divider />

                        <div class="grid">
                            <div class="col">
                                <div class="text-center p-3 border-round-sm  font-bold">
                                    <Button label="save" size="small" severity="success" 
                                        onClick={()=> {
                                            onSave();
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-center p-3 border-round-sm  font-bold ">
                                    <Button label="exit" size="small" severity="secondary"
                                        onClick={()=> {
                                            onShowSet(false);
                                        }}
                                       
                                    />
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </Sidebar>
            
        </div>
        </>
    )
}