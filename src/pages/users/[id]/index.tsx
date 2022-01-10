import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useUserQuery } from '../../../hooks/useUserQuery'

import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'

import { UserDetails } from '../../../components/pages/Users/UserDetails'
import { AddressesInformation } from '../../../components/AddressesInformation'
import { UserOrders } from '../../../components/pages/Users/UserOrders'

import { Button, HStack, Stack } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

type Props = {
  params: {
    id: string;
  }
}

export default function User({ params }: Props) {
  const { id } = params
  const router = useRouter()  
  
  const user = useUserQuery(id)

  return (
    <>
      <Head>
        <title>
          {!user.data?.nome ? `MARCA` : `${user.data?.nome} | MARCA`}
        </title>
      </Head>

      <WithAuth>

        <Header withGoBack title={user.data?.nome}>
          <Button 
            colorScheme="blue" 
            leftIcon={<FiPrinter />} 
            onClick={() => router.push(`/users/${id}/user-to-print`)}
          >Imprimir</Button>
        </Header>

        <Divider />

        <Stack spacing={6}>
          <HStack spacing={6} align="flex-start">
            <UserDetails userId={id}/>
            <AddressesInformation userId={id}/>
          </HStack>

          <UserOrders userId={id}/>
        </Stack>
        
      </WithAuth>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
