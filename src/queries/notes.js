export const getNotes = `
    #graphql
    query {
        notes (sort: "-id") {
            id
            caption
            message
            priority
            date_created
        }
}
`

export const createNewNotes = `
    #graphql
    mutation createNewNotes($data: create_notes_input!) {
    create_notes_item(data: $data) {
        id
    }
}
`
export const editNotesItem = `
    #graphql
    mutation updateNotesItem($data: update_notes_input!, $id: ID!) { 
    update_notes_item(id: $id, data: $data) {
        id
        
    }
}
`

export const deleteNotesItem = `
    #graphql
    mutation deleteNotesItem($id: ID!) {
    delete_notes_item(id: $id) {
        id
    }
}
`