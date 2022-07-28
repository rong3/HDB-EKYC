import { InputLabel, Input } from '@material-ui/core'
import React, { useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import vi from "date-fns/locale/vi";

registerLocale('vi', vi)

const INPUT_TYPE = {
    TEXT: 'text',
    CURRENCY: 'currency',
    CURRENCYMASK: 'currencymask',
    TEXTAREA: 'textarea',
    SELECT: 'select',
    SELECTVIEW: 'selectview',
    PERCENTAGE: 'percentage',
    PERCENTDECIMAL: 'percentdecimal',
    DATE: 'date',
    DATETIME: 'datetime',
    DATERANGE: 'datetimerange',
    SELECTMULTI: 'selectmulti',
    NUMBER: 'number',
    PHONE: 'phone',
    TREE: 'tree',
    //TODO: fromdate-> todate (include hour)
    CALENDAR: 'calendar'
}
export function InputControl({ editRef, defaultValue, handleSubmit, type, placeholder, filter, row, accessor, active, ...rest }) {
    const [inputValue, setInputValue] = useState(defaultValue)

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue])

    const rootInputText = (value) => {
        return <input className="form-control muiInputBase-input-custom" {...rest} onChange={(e) => {
            const value = e.target.value;
            if (value != inputValue) {
                setInputValue(value);
                if (rest.onChange) {
                    rest.onChange(e)
                }
            }
        }} value={value} />
    }

    const rootInputTextPhone = (value) => {
        return <input className="form-control muiInputBase-input-custom" {...rest} onChange={(e) => {
            const value = e.target.value;
            const regex = /^[0-9]+$/;
            if (rest.max) {
                if (value != inputValue && value.length <= rest.max) {
                    if (value.match(regex) || value === "") {
                        setInputValue(value);
                        if (rest.onChange) {
                            rest.onChange(e)
                        }
                    }
                }
            }
            else {
                if (value != inputValue) {
                    if (value.match(regex) || value === "") {
                        setInputValue(value);
                        if (rest.onChange) {
                            rest.onChange(e)
                        }
                    }
                }
            }
        }} value={value} />
    }

    const rootInputDate = (value, type) => {
        return <DatePicker
            locale="vi"
            popperPlacement="bottom-end"
            className="form-control"
            selected={value}
            dropdownMode="scroll"
            popperClassName="calendar-popout"
            popperModifiers={{
                offset: { enabled: true, offset: '5px, 10px' },
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport'
                }
            }}
            dateFormat={INPUT_TYPE.DATE ? "dd/MM/yyyy" : "dd/MM/yyyy HH:mm"}
            portalId={"picker-portal-id"}
            shouldCloseOnSelect
            showTimeInput={type===INPUT_TYPE.DATETIME}
            onChange={(e) => {
                const value = e;
                setInputValue(value);
                if (rest.onSelect) {
                    rest.onSelect(e)
                }
            }}
            {...rest}
        />
    }

    const drawControl = (value) => {
        switch (type) {
            case INPUT_TYPE.TEXT: return rootInputText(value);
            case INPUT_TYPE.PHONE: return rootInputTextPhone(value);
            default: return <></>
        }
    }

    return (
        <>
            {
                drawControl(inputValue)
            }
        </>
    )
}
