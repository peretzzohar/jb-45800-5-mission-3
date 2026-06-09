import './Home.css'
import meetingsHero from '../../../assets/meetings-hero.svg'

export default function Home() {
	return (
		<section className='Body'>
			<h2>Mission 3: Group Meetings</h2>
			<p>
				This system helps development teams manage group meetings in one place. You can
				select a group, view all its meetings, track durations, and remove meetings that are
				no longer needed.
			</p>
			<img src={meetingsHero} alt='Illustration of a meetings management dashboard' className='home-image' />
		</section>
	)
}
