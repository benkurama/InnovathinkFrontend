"use client"
import { useQuery } from "react-query";
import fetchData from "@/tools/fetchData"
import {getNotes} from "@/queries/notes"
import UserStore from '@/stores/user'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import Stack from 'react-bootstrap/Stack';
import { useState, useRef, useEffect } from 'react'
import AddNotes from './add notes'
import EditNotes from './edit notes'

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useMutation } from "react-query";
import { deleteNotesItem } from "@/queries/notes"
import setData from "@/tools/setData";


// const delFunc = {
//     confirm1: (event, toast, outside) => {
//         confirmPopup({
//             target: event.currentTarget,
//             message: 'Are you sure you want to proceed?',
//             icon: 'pi pi-exclamation-triangle',
//             defaultFocus: 'accept',
//             accept: () => {
//                 toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
//                 outside.testClick();
//             },
//             reject: () => {toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });}
//         });
//     }
// }

export default function NotesComp(){

    const [onShow, onShowSet] = useState(false);
    const [onEditShow, onEditShowSet] = useState(false);
    const [selNotes, selNotesSet] = useState({});

    const { getUser } = UserStore();

    const accessToken = getUser()['items']?.access_token;

    const toast = useRef(null);

    const deleteNotes = useMutation((noteId) => {
        setData(deleteNotesItem, accessToken, {id: noteId}, '').then((res) => {
          console.log(res);
        });
      });

    const { data: notes, isSuccess, status, error, refetch} = useQuery('getNotes', 
        async () => await fetchData(getNotes, accessToken,{}),{
            onError: (err) => {
                console.log(err)
                if(err.response.status === 401){
                    console.log("onError");
                }
            },
           refetchOnWindowsFocus: false, enabled: false
        }
    );

    const nts = notes?.data.notes;

    const delFunc = {
        confirm1: (event, row) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                accept: () => {

                    try {
                        deleteNotes.mutate(row.id);
                    } catch (error) {
                        alert(error.message);
                    } finally {
                        toast.current.show({ severity: 'info', summary: 'Delete', detail: 'You have delete successfully', life: 3000 });

                        setTimeout(()=>{
                            refetch();
                           }, 2000)
                    }
                    
                },
                reject: () => {}
            });
        }
    }
    
    useEffect(()=>{
        refetch();
    },[])

    const actionBodyTemplate = (row) => {
        return (
            <div>
                <span>

                    <Button icon="pi pi-pencil" className="p-button-outlined p-button-success mr-2"
                        tooltip="View"
                        onClick={(e) => {
                            selNotesSet(row);
                            onEditShowSet(true);
                            // alert(JSON.stringify(row));
                        }} /
                        >
                    <Button icon="pi pi-times" className="p-button-outlined p-button-danger mr-2"
                        tooltip="Delete"
                        onClick={(e) => delFunc.confirm1(e, row)} />

                </span>
            </div>
        )
        ;
    }

    return (
        <>
            <div>
                {/* {JSON.stringify(nts)} */}
            </div>

            <div>
                
                <Toast ref={toast} position="bottom-right" />
                <ConfirmPopup />
                <Stack direction="horizontal" gap={3}>

                    <div className="p-2 ms-auto">
                        <Button label="add" onClick={()=> {
                            onShowSet(true)
                        }}/>
                        </div>

                </Stack>
            </div>

            <div className="card">
            <DataTable value={nts} tableStyle={{ minWidth: '50rem' }} 
                paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines
            >
                <Column  header="ACTION" body={actionBodyTemplate} style={{ width: '8rem' }} />

                <Column field="caption" header="Caption"></Column>
                <Column field="message" header="Message"></Column>
                <Column field="priority" header="Priority"></Column>
                <Column field="date_created" header="Date Created"></Column>
            </DataTable>
            </div>

            <AddNotes onShow={onShow} onShowSet={onShowSet} refetch={refetch} toast={toast} 
            tokken={accessToken} />
            
            <EditNotes onEditShow={onEditShow} onEditShowSet={onEditShowSet} notes={selNotes} 
            refetch={refetch} tokken={accessToken} toast={toast} />

        </>
    )
}