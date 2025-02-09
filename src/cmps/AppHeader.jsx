import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'; import { useSelector } from 'react-redux';
import Logo from './Logo';
import { HeaderFilter } from './HeaderFilter';
import { useEffect, useState } from 'react';
import { HeaderUserControls } from './HeaderUserControls';
import { HeaderAuthMenu } from './HeaderAuthMenu';
import { GenericCmp } from './GenericCmp';
import { DatePickerCmp } from './DatePickerCmp';
import { SuggestedLocations } from './SuggestedLocations';
import { GuestSelector } from './GuestSelector';
import { setFiterBy } from '../store/actions/stay.actions';
import { StayFilter } from './StayFilter';
import { stayService } from '../services/stay';
import { logout } from '../store/actions/user.actions';


export function AppHeader({ isHomepage, inputModal, setInputModal, isClosing, setIsClosing, user, isLoginSignupOpen, setIsLoginSignupOpen, classNameToAdd }) {
	const navigate = useNavigate()
	const location = useLocation()

	const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
	const stay = useSelector(storeState => storeState.stayModule.stay)

	const [isExpanded, setIsExpanded] = useState(false)
	const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)


	const [checkInDate, setCheckInDate] = useState('')
	const [checkOutDate, setCheckOutDate] = useState('')
	const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
	const [where, setWhere] = useState('')

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (inputModal && event.key === 'Escape') {
				setInputModal(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [inputModal])

	function onToggleMenu() {
		setIsAuthMenuOpen(!isAuthMenuOpen)
	}

	function isMenuOpen() {
		if (isAuthMenuOpen) onToggleMenu();
		if (isLoginSignupOpen.isOpen) onToggleLoginSignupDialog();
	}

	function toggleIsFilterOpen(modal) {
		console.log('modal', modal)
		switch (modal) {
			case 'date-picker':
				setInputModal(modal);
				break
			case 'suggested-locations':
				setInputModal(modal);
				break
			case 'guest-selector':
				setInputModal(modal);
				break
			default:
				setInputModal(null)
				break
		}
	}

	function onToggleLoginSignupDialog(action) {
		setIsLoginSignupOpen((prevState) => ({
			...prevState,
			isOpen: !prevState.isOpen,
			action,
		}))
	}

	function getTotalGuests() {
		return guests.adults + guests.children + guests.infants + guests.pets;
	}

	function onSearchFromHeader(ev) {
		ev.preventDefault()

		const filterByToUpdate = {
			txt: where,
			minCapacity: getTotalGuests(),
			checkInDate,
			checkOutDate
		}

		setIsExpanded(false)
		setInputModal(null)
		setFiterBy(filterByToUpdate)

		if (location.pathname.includes('stay')) {
			navigate('/')
		}
	}

	function onUserLogout() {
		logout()
	}

	function onManageBooking() {
		console.log('Moving to manage places page')
		navigate('/manage-booking')

	}

	async function onLogoClick() {
		console.log('click on logo')
		setIsExpanded(false)
		const filterByToUpdate = stayService.getDefaultFilter()
		await setFiterBy(filterByToUpdate)
	}

	function onAddStay() {
		console.log('Startying to add stay form Header')
		navigate('/add-stay')
	}

	return (
		<>
			<div className={'headers main-container full'
				+ (classNameToAdd ? ` ${classNameToAdd}` : '')}>


				<header
					className={`app-header main-container full grid` + (classNameToAdd ? ` ${classNameToAdd}` : '')}
					onClick={isMenuOpen}
				>
					<nav className={`${isExpanded ? 'expand' : ''} ${!isHomepage ? 'in-stay-details' : ''}`}>
						<NavLink to="/" className="logo" onClick={onLogoClick}>
							<Logo />
							<h1>TravelNest</h1>
						</NavLink>
						<HeaderFilter
							isExpanded={isExpanded}
							setIsExpanded={setIsExpanded}
							toggleIsFilterOpen={toggleIsFilterOpen}
							checkInDate={checkInDate}
							setCheckInDate={setCheckInDate}
							checkOutDate={checkOutDate}
							setCheckOutDate={setCheckOutDate}
							guests={guests}
							setGuests={setGuests}
							where={where}
							setWhere={setWhere}
							isHomepage={isHomepage}
							inputModal={inputModal}
							onSearchFromHeader={onSearchFromHeader}
							setInputModal={setInputModal}
						/>
						{<HeaderUserControls onToggleMenu={onToggleMenu} onAddStay={onAddStay} user={user} />}
						{isAuthMenuOpen && <HeaderAuthMenu onToggleLoginSignupDialog={onToggleLoginSignupDialog} onUserLogout={onUserLogout} onManageBooking={onManageBooking} />}

					</nav>
				</header >
				{!isExpanded && isHomepage && (
					<StayFilter />
				)}
			</div>

		</>
	);
}
