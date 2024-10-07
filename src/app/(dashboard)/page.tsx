

import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/option'

import Table from 'react-bootstrap/Table';

import SaveDetails from '@/components/Page/Dashboard/SaveDetails'

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>

      <SaveDetails userInfo={session} />

      {/* Body content */}

      {/* <pre>{session !== null ? ('one') : ('two')}</pre> */}

      {/* <pre>{JSON.stringify(session, null, 5)}</pre> */}

      
      

<Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>title</th>
          <th>description</th>
          <th>tags</th>
          <th>languange</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{session?.user.fname}</td>
          <td>{session?.user.lname}</td>
          <td>{session?.user.email}</td>
          <td>{session?.user.location}</td>
          <td>{session?.user.title}</td>
          <td>{session?.user.description}</td>
          <td>{JSON.stringify(session?.user.tags)}</td>
          <td>{session?.user.language}</td>
          <td>{session?.user.status}</td>
        </tr>
      </tbody>
    </Table>



    </div>
  )
}
