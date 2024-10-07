export const createNewUser = `
    #graphql
        mutation createNewUser($data: create_directus_users_input!) {
            create_users_item(data: $data) 
        }
`

export const getCurrentUser = `
    #graphql
    query {
        users_me{
            id
            first_name
            last_name
            email
            password
            location
            title
            description
            tags
            language
            tfa_secret
            status
            token
            last_access
            last_page
            provider
            external_identifier
            auth_data
            email_notifications
            appearance
            theme_dark
            theme_light
            theme_light_overrides
            theme_dark_overrides
            policies
            avatar {
                id
            }
        }
    }
`