import { ICar, IFilter } from "@/types";
import axios from "axios";

const axInstance = axios.create({
    baseURL: 'https://cars-by-api-ninjas.p.rapidapi.com/v1',
    headers: {
        'X-RapidAPI-Key': '676de581e3msh9a3eb51ff847b4bp17e8b5jsna4f650256021',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }
})

export const axiosGetCars = async (filters: IFilter) => {
    return axInstance.get('cars', 
    {params: {
        make: filters.manufacturers,
        year: filters.year,
        model: filters.model, 
        limit: filters.limit,
        fuel_type: filters.fuel
    }}).then(response => {
        return response.data
    })
}

export const generateCarImageUrl = (car: ICar, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage')
    //https://cdn.imagin.studio/?customer=hrjavascript-mastery&modelFamily=corolla&make=toyota
    url.searchParams.append('customer', 'hrjavascript-mastery')
    url.searchParams.append('make', car.make)
    url.searchParams.append('modelFamily', car.model.split(' ')[0])
    url.searchParams.append('zoomType', 'fullscreen')
    url.searchParams.append('modelYear', `${car.year}`)
    url.searchParams.append('angle', `${angle}`)

    return `${url}`
}

//hrjavascript-mastery
