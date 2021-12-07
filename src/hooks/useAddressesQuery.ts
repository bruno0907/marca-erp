import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string): Promise<AddressProps[]> => {  
  try {
    const { data, error } = await supabase
      .from<AddressProps>('addresses')
      .select()
      .eq('user_id', id)
      .order('principal', {
        ascending: false,      
      })
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }  
}

const useAddressesQuery = (id: string) => useQuery(
  ['address[]', id], 
  () => getAddresses(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  }
)  

export {
  useAddressesQuery,
  getAddresses
}
