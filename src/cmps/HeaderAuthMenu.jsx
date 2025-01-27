import { useSelector } from "react-redux"

export function HeaderAuthMenu({ onToggleLoginSignupDialog,onUserLogout,onManageBooking }) {
	const user = useSelector((storeState) => storeState.userModule.user)
    if(user) return (
        <div className="auth-menu">
            <label className="auth-menu-item" onClick={onUserLogout}>Logout</label>
            <label className="auth-menu-item" onClick={onManageBooking}>Manage your places</label>

        </div>
    )
    return (
        <div className="auth-menu">
            <label className="auth-menu-item login-action" onClick={() => onToggleLoginSignupDialog('login')}>Log in</label>
            <label className="auth-menu-item" onClick={() => onToggleLoginSignupDialog('signup')}>Sign up</label>
        </div>
    )
}