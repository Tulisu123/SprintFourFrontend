import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerCmp } from './DatePickerCmp'
import { setFiterBy } from '../store/actions/stay.actions';
import { parsePrice } from '../services/util.service'
import { userService } from '../services/user';
import { useNavigate } from 'react-router-dom';

export function Reserve() {
    const navigate = useNavigate()

    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    const { reservedDates } = stay || {}
    const disabledDates = calculateDisabledDates(reservedDates)
    const [checkInDate, setCheckInDate] = useState(filterBy.checkInDate || null);
    const [checkOutDate, setCheckOutDate] = useState(filterBy.checkOutDate || null);
    const [totalPrice, setTotalPrice] = useState(0)

    const [reserve, setReserve] = useState({ start: checkInDate, end: checkOutDate, guests: 1, price: totalPrice, user: userService.getLoggedinUser() })

    function toggleIsDatePickerOpen() {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    useEffect(() => {
        console.log('checkIndate', checkInDate, 'checkout date', checkOutDate)
        // Calculate default dates if filterBy does not have dates
        if (!filterBy.checkInDate || !filterBy.checkOutDate) {
            console.log('default dates')
            const { start, end } = findDefaultDateRange(reservedDates)
            setCheckInDate(start)
            setCheckOutDate(end)
            // updateFilterBy(start, end)
        } else {
            setCheckInDate(new Date(filterBy.checkInDate))
            setCheckOutDate(new Date(filterBy.checkOutDate))
        }
    }, [filterBy, reservedDates])

    useEffect(() => {
        const stayPrice = parsePrice(stay.price, 'number')

        const days = getNumberOfDays(checkInDate, checkOutDate);
        if (days > 0) {
            setTotalPrice(days * +stayPrice);
        } else {
            setTotalPrice(0)
        }
    }, [checkInDate, checkOutDate, stay.price])

    // Sync reserve state with check-in, check-out, and total price
    useEffect(() => {
        setReserve((prevReserve) => ({
            ...prevReserve,
            start: checkInDate,
            end: checkOutDate,
            price: totalPrice,
        }))
    }, [checkInDate, checkOutDate, totalPrice])

    function getNumberOfDays(checkInDate, checkOutDate) {
        if (!checkInDate || !checkOutDate) return 0; // Handle null or undefined dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut - checkIn; // Difference in milliseconds
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return Math.max(0, Math.floor(daysDiff)) // Ensure non-negative number
    }

    function onChangeCheckIn(checkInFromDatePicker) {
        setCheckInDate(checkInFromDatePicker);
        setReserve((prevReserve) => ({
            ...prevReserve,
            start: checkInFromDatePicker,
        }))
    }

    function onChangeCheckOut(checkOutFromDatePicker) {
        setCheckOutDate(checkOutFromDatePicker);
        setReserve((prevReserve) => ({
            ...prevReserve,
            end: checkOutFromDatePicker,
        }))
    }


    function findDefaultDateRange(reservedDates) {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Normalize today to midnight
        const disabledDates = calculateDisabledDates(reservedDates)
        const availableDates = []
        let currentDate = new Date(today)
    
        while (availableDates.length < 3) {
            const isDisabled = disabledDates.some(
                (d) =>
                    d.getDate() === currentDate.getDate() &&
                    d.getMonth() === currentDate.getMonth() &&
                    d.getFullYear() === currentDate.getFullYear()
            )
            if (!isDisabled) {
                availableDates.push(new Date(currentDate))// Add the available date
            }
            currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
        }
        return {
            start: availableDates[0],
            end: availableDates[2],
        }
    }
    
    

    function calculateDisabledDates(reservedDates) {
        const disabledDates = []
        reservedDates.forEach(({ start, end }) => {
            let currDate = new Date(start)
            const endDate = new Date(end)

            while (currDate <= endDate) {
                disabledDates.push(new Date(currDate))
                currDate.setDate(currDate.getDate() + 1)
            }
        })
        return disabledDates
    }

    async function updateFilterBy(newCheckInDate, newCheckOutDate) {
        const updatedFilterBy = {
            ...filterBy,
            checkInDate: newCheckInDate,
            checkOutDate: newCheckOutDate,
        }

        await setFiterBy(updatedFilterBy)

    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    }

    function onReserve() {
        const stayId = stay._id
        const reserveDetails = {
            start: reserve.start,
            end: reserve.end,
            guests: reserve.guests,
            price: reserve.price,
            days: getNumberOfDays(checkInDate,checkOutDate)
        }

        const urlParams = new URLSearchParams({
            stayId,
            start: reserveDetails.start.toISOString(), // Ensure proper date formatting
            end: reserveDetails.end.toISOString(),
            guests: reserveDetails.guests,
            price: reserveDetails.price,
            days: reserveDetails.days,
        }).toString()

        navigate(`/reservation-summary?${urlParams}`)

    }

    return (
        < div className="stay-reserve" >
            <h2>₪{stay.price} <span> night</span></h2>
            <div className="stay-reserve-dates">
                {isDatePickerOpen && <div className="date-picker-reserve-container">
                    <DatePickerCmp
                        onChangeCheckIn={onChangeCheckIn}
                        onChangeCheckOut={onChangeCheckOut}
                        stay={stay}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        disabledDates={disabledDates}
                    />
                    <button className="close" onClick={toggleIsDatePickerOpen}>Close</button>
                </div>}
                <div className={`check-in-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECK-IN</label>
                    <div className="checkout-date info-date">
                        {checkInDate ? formatDate(checkInDate) : 'Add date'}
                    </div>

                </div>
                <div className={`check-out-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECKOUT</label>
                    <div className="checkout-date info-date">
                        {checkOutDate ? formatDate(checkOutDate) : 'Add date'}
                    </div>
                </div>
                <div className="stay-reserve-guests">
                    <label className='reserve-labels'>GUESTS</label>
                    <div className="guests-number">{filterBy.minCapacity}</div>
                </div>
            </div>
            <button className="reserve-btn" onClick={onReserve}>Reserve</button>
            <p>You won't be charged yet</p>
            <div className="stay-reserve-summary">
                <div className="reserve-total-details">
                    <p>₪ {stay.price} x {getNumberOfDays(reserve.start, reserve.end)} nights</p>
                    <p>₪ {parsePrice(totalPrice, 'string')}</p>
                </div>
                <div className="reserve-total-details">
                    <p>Airbnb service fee</p>
                    <p>₪ 31</p>
                </div>
                <hr />
                <div className="total-reserve-price">
                    <p>Total</p>
                    <p>₪ {parsePrice(totalPrice + 31, 'string')}</p>
                </div>
            </div>
        </div >
    )
}