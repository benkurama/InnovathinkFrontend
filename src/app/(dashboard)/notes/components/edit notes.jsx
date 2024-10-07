import { Sidebar } from 'primereact/sidebar';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useState  } from 'react'
import { Dropdown } from 'primereact/dropdown';

import { useMutation } from "react-query";
import { editNotesItem} from "@/queries/notes"
import setData from "@/tools/setData";
import { FloatLabel } from "primereact/floatlabel";

export default function EditNotes({onEditShow, onEditShowSet, notes, refetch, tokken, toast}){

    const editNotes = useMutation((notesEdit) => {
        setData(editNotesItem, tokken, {data: notesEdit, id: notes.id}, '').then((res) => {
          console.log(res);
        });
      });

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
        debugger;
        try {
            editNotes.mutate({
                caption: data.caption,
                message: data.message,
                priority: data.priority
            }
        );
        } catch (error) {
            alert(error.message);
        } finally {
            toast.current.show({severity:'success', summary: 'Edit New Notes', detail:'Edit Success', life: 3000});
            onEditShowSet(false)

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

    const priority = [
        { name: 'High priority', code: 'high' },
        { name: 'Normal', code: 'normal' },
        { name: 'Low priority', code: 'low' }
    ];

    const [selPriority, setSelPriority] = useState([]);

    const onUpdate = () => {
        formik.handleSubmit();
    }

    return(
        <>
        
        <div className="card flex justify-content-center">
            <Sidebar visible={onEditShow} onHide={() => onEditShowSet(false)} style={{ width: 300 }}
             position="right" onShow={ () => {
                formik.setFieldValue('caption', notes.caption);
                formik.setFieldValue('message', notes.message);
                formik.setFieldValue('priority', notes.priority);

                // debugger;
                var prior = notes.priority;

                let _note = priority.filter( s => s.code === prior);

                setSelPriority(_note[0]);
                formik.setFieldValue('priority', _note[0].code);
                }
            }
             >
                <h3>Edit Notes</h3>
                    <p>
                        Edit your new notes here
                    </p>
                    <div>
                        
                        <div className="p-inputgroup flex-1">
                            <span style={{ color: 'red' }}>*</span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <FloatLabel>
                                <InputText onChange={formik.handleChange}
                                    value={formik.values.caption}
                                    name="caption"
                                    placeholder={getErrorMessage('caption')}
                                    className={classNames({ 'p-invalid': isFormFieldValid('caption') })}
                                />
                                <label htmlFor=''> Caption </label>
                            </FloatLabel>
                        </div>

                        <br /> <br />

                        <div className="p-inputgroup flex-1">
                            <span style={{ color: 'red' }}>*</span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <FloatLabel>
                            <InputText onChange={formik.handleChange}
                                value={formik.values.message} 
                                name="message"
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
                                <i className="pi pi-file-edit "></i>
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
                                            onUpdate();
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-center p-3 border-round-sm  font-bold ">
                                    <Button label="exit" size="small" severity="secondary"
                                        onClick={()=> {
                                            onEditShowSet(false);
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