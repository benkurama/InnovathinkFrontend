'use client'

import {QueryClientProvider, QueryClient} from 'react-query';
import { useState } from 'react';
import {ReactQueryDevtools} from 'react-query/devtools';

//const queryClient = new QueryClient();

export const ReactQueryClient = ({children}: {children: React.ReactNode}) => {


    const [queryClient] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
              },
            },
          })
      )

    return (

        <QueryClientProvider client={queryClient}> 
          {children}
          <ReactQueryDevtools initialIsOpen={false} /> 
        </QueryClientProvider>  
        
    )
}