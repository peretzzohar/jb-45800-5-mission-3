import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from '../not-found/NotFound'
import Feed from '../feed/Feed'
import Home from '../home/Home'
import About from '../about/About'
import NewMeeting from '../new-meeting/NewMeeting'
import UpdateMeeting from '../update-meeting/UpdateMeeting copy1'


export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/meetings" element={<Feed />} />
      <Route path="/meetings/new" element={<NewMeeting />} />
      <Route path="/meetings/update" element={<UpdateMeeting />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
