import { useGetDesignInfoByIdQuery, useGetUserDesignsQuery } from '../redux/services/designApiSlice'

export const  useMyDesigns = ()=> {
    const { data, isLoading } = useGetUserDesignsQuery()
    const { data: designs,success } = data || {}
    return {designs,success,gettingDesigns:isLoading}
}


export const useDesign = (id:string|undefined) => {
    const { data, isLoading } = id ? useGetDesignInfoByIdQuery(id, { skip: !id }) : {}
    const { data: designInfo,success } = data || {}
    return {designInfo,success,gettingDesignInfo:isLoading}
}

