export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>Support</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>Get help with a safety issue</li>
                        <li>AirCover</li>
                        <li>Anti-discrimination</li>
                        <li>Disability support</li>
                        <li>Cancellation options</li>
                        <li>Report neighborhood concern</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Hosting</h4>
                    <ul>
                        <li>Airbnb your home</li>
                        <li>AirCover for Hosts</li>
                        <li>Hosting resources</li>
                        <li>Community forum</li>
                        <li>Hosting responsibly</li>
                        <li>Airbnb-friendly apartments</li>
                        <li>Join a free Hosting class</li>
                        <li>Find a co-host</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Airbnb</h4>
                    <ul>
                        <li>Newsroom</li>
                        <li>New features</li>
                        <li>Careers</li>
                        <li>Investors</li>
                        <li>Gift cards</li>
                        <li>Airbnb.org emergency stays</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Airbnb, Inc. ·
                    <span class="footer-link">Terms</span> ·
                    <span class="footer-link">Sitemap</span> ·
                    <span class="footer-link">Privacy</span> ·
                    <span class="footer-link">Your Privacy Choices</span>
                </p>
                <div className="footer-icons">
                    <span><i class="fa-solid fa-globe"></i> <span className="clickable">English (US)</span></span>
                    <span>₪ <span className="clickable">ILS</span></span>
                </div>
                <div className="social-icons">
                    <i class="fa-brands fa-square-facebook"></i>
                    <i class="fa-brands fa-square-twitter"></i>
                    <i class="fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </footer>
    )
}