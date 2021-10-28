import { useRouter } from "next/router"

import { useOrdersQuery } from "../../hooks/useOrdersQuery"
import { prefetchOrder } from "../../services/prefetchOrder"

import { handleFormatDate } from "../../utils/handleFormatDate"
import { handleFormatPrice } from "../../utils/handleFormatPrice"

import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,    
  Flex,
  Text,  
  Center
} from "@chakra-ui/react"

type OrdersListProps = {
  filterValue: number;
}

const OrdersList = ({ filterValue }: OrdersListProps) => {
  const router = useRouter()

  const orders = useOrdersQuery(filterValue)

  console.log(orders)


  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id)

  if(orders.isLoading) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
            </Tr>
          </Thead>        
        </Table>
        <Center p="8">
          <Spinner size="md" color="blue.500"/>
        </Center>
      </>
    )
  }

  if(orders.error) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
      </>
    )
  }

  if(orders.data?.length <= 0) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Nenhum registro encontrado...</Text>
      </>
    )
  }

  return (
    <Table colorScheme="gray" variant="striped" >
      <Thead>
        <Tr bgColor="blue.500">
        <Th color="gray.50">
            <Flex align="center">
              N.Pedido
              { orders.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>            
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Data pedido</Th>
            <Th color="gray.50">Valor total</Th>
        </Tr>
      </Thead>
      <Tbody>
        { orders.data.map(order => {
            return (
              <Tr
                key={order.id}
                fontWeight="medium"
                onClick={() => router.push(`/orders/${order.id}`)}
                onMouseEnter={() => handlePrefetchOrder(order.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{order.numero_pedido}</Td>                        
                <Td>{order.users.nome}</Td>
                <Td>{handleFormatDate(order.created_at)}</Td>
                <Td>{handleFormatPrice(order.total)}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
  )
}

export { OrdersList }
