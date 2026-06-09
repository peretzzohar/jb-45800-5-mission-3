import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <div className='Footer'>
            <span>Meeting Manager UI | {year}</span>
        </div>
    )
}