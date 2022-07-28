import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import PropTypes from "prop-types";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css"

registerLocale("vi", vi);

const DateTimeInput = ({
    selected,
    onChange,
    isPortal,
    isOnlyDate,
    ...props
}) => {

    const [date, setDate] = useState(
        selected || (props.isDefaultEmpty ? null : new Date())
    );

    const [dateMask] = useState(
        [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
    );

    const [dateTimeMask] = useState(
        [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/]
    );

    useEffect(() => {
        if (selected) {
            setDate(selected);
        }
    }, [selected]);

    const filterPassedTime = (time) => {
        if (!props.isFilterPassedTime) {
            return true;
        }

        const currentDate = new Date();
        const selectedDate = new Date(time);
        if (date.getDay() > currentDate.getDay()) {
            return true;
        }

        return currentDate.getTime() < selectedDate.getTime();
    };

    const isPassedTime = (time) => {
        const selectedDate = new Date(time);
        return moment(selectedDate).isBefore(moment());
    };

    return (
        <DatePicker
            locale="vi"
            dateFormat={`${isOnlyDate ? "dd/MM/yyyy" : "dd/MM/yyyy HH:mm"}`}
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
            selected={date}
            onChange={(date) => {
                let finalDate = date;

                if (props.minDate && isPassedTime(date) && props.isFilterPassedTime) {
                    finalDate = props.minDate;
                }

                onChange(finalDate || new Date());
                setDate(finalDate);
            }}
            showTimeSelect={!isOnlyDate}
            showTimeInput={!isOnlyDate}
            timeIntervals={15}
            timeCaption={"Thời gian"}
            shouldCloseOnSelect
            placeholderText={props.placeholder}
            className="form-control muiInputBase-input-custom"
            filterTime={filterPassedTime}
            portalId={"picker-portal-id"}
            {...props}
        />
    );
};

DateTimeInput.propTypes = {
    isFilterPassedTime: PropTypes.bool,
    isPortal: PropTypes.bool,
    isOnlyDate: PropTypes.bool,
    selected: PropTypes.any,
    onChange: PropTypes.func,
    minDate: PropTypes.any,
    isDefaultEmpty: PropTypes.bool,
    placeholder: PropTypes.string,
};

DateTimeInput.defaultProps = {
    isFilterPassedTime: false,
    isOnlyDate: true,
    isDefaultEmpty: false,
};

export default DateTimeInput;
