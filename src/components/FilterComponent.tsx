import React from 'react'
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CiFilter} from "react-icons/ci";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import ColumnType from "@/src/types/ColumnType";

interface Props {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchText: string;
    setSearchText: (searchText: string) => void;
    selectValue: string
    handleColumnChange: (columnValue: string) => void;
    searchColumns: ColumnType[];
    onClearFilters: () => void;
}

const FilterComponent = ({handleInputChange, searchText, setSearchText, selectValue, handleColumnChange, searchColumns, onClearFilters}: Props) => {
    return (
        <div className="mt-3 flex items-center space-x-2">
            <Input
                className="w-60 font-normal"
                onBlur={handleInputChange}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="bg-white text-black border">
                        <CiFilter />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <p className="mb-2 font-medium">Filter By</p>
                    <RadioGroup
                        value={selectValue}
                        onValueChange={handleColumnChange}
                    >
                        {searchColumns.map((column, index) => (
                            <div key={column.columnValue} className="flex items-center gap-3 mb-2">
                                <RadioGroupItem
                                    value={column.columnValue}
                                    id={`r${index}`}
                                />
                                <Label htmlFor={`r${index}`}>
                                    {column.columnName}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </PopoverContent>
            </Popover>
            <Button onClick={onClearFilters}>Clear</Button>
        </div>
    )
}
export default FilterComponent
