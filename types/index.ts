import { fuels, yearsOfProduction } from "@/constants";
import { MouseEventHandler } from "react";

export interface ICustomButton {
    title: string,
    cStyle?: string,
    tStyle?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    btnType?: "button" | "submit"
    rightIcon?: string
    isDisabled?: boolean
}

export interface ISearchManufacturer {
    manufacturer: string,
    setManufacturer: React.Dispatch<React.SetStateAction<string>>
    setModel: React.Dispatch<React.SetStateAction<string>>
}

export interface ISearchModel {
    model: string,
    manufacturer: string,
    setModel: React.Dispatch<React.SetStateAction<string>>
}

export interface ICar {
    city_mpg: number
    class: string
    combination_mpg: number
    cylinders: number
    displacement: number
    drive: string
    fuel_type: string
    highway_mpg: number
    make: string
    model: string
    transmission: string
    year: number
}

export interface ICarDetails {
    isOpen: boolean
    closeModal: () => void
    car: ICar
}

export interface IFilter {
    manufacturers: string
    year: number
    fuel: string
    limit: number
    model: string
}

interface IOptions {
    title: string;
    value: string;
}

export interface ICustomFilter {
    title: string,
    options: IOptions[]
}

export interface IShowMore {
    pageNumber: number
    isNext: boolean

}