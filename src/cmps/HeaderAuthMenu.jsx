import { useSelector } from "react-redux"

export function HeaderAuthMenu({ onToggleLoginSignupDialog, onUserLogout, onManageBooking }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    if (user) return (
        <div className="auth-menu">
            <div className="auth-menu-item" onClick={onUserLogout}>Logout</div>
            <div className="auth-menu-item" onClick={onManageBooking}>Manage your places</div>

        </div>
    )
    return (
        <div className="auth-menu">
            <div className="auth-menu-item login-action" onClick={() => onToggleLoginSignupDialog('login')}>Log in</div>
            <div className="auth-menu-item" onClick={() => onToggleLoginSignupDialog('signup')}>Sign up</div>
        </div>
    )
}