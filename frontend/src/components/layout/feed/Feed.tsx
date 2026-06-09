import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type Group from '../../../models/Group'
import type Meeting from '../../../models/Meeting'
import { getAllGroups } from '../../../services/groups'
import { deleteMeeting, getMeetingsByGroupId } from '../../../services/meetings'
import './Feed.css'

function formatDisplayDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString()
}

function getDuration(startDate: string, finishDate: string): string {
  const diffMs = new Date(finishDate).getTime() - new Date(startDate).getTime()
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}m`
  }

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

function getStartState(startDate: string): 'future' | 'past' {
  return new Date(startDate).getTime() > Date.now() ? 'future' : 'past'
}

export default function Feed() {
  const [groups, setGroups] = useState<Group[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true)
      setErrorMessage('')

      try {
        const data = await getAllGroups()
        setGroups(data)

        if (data.length > 0) {
          setSelectedGroupId((current) => current || data[0].groupId)
        }
      } catch {
        setErrorMessage('Failed to load groups. Check backend connection and refresh.')
      } finally {
        setLoading(false)
      }
    }

    void loadGroups()
  }, [])

  useEffect(() => {
    if (!selectedGroupId) {
      return
    }

    const loadMeetings = async () => {
      setLoading(true)
      setErrorMessage('')

      try {
        const data = await getMeetingsByGroupId(selectedGroupId)
        setMeetings(data)
      } catch {
        setErrorMessage('Failed to load meetings for this group.')
      } finally {
        setLoading(false)
      }
    }

    void loadMeetings()
  }, [selectedGroupId])

  const sortedMeetings = useMemo(
    () =>
      selectedGroupId
        ? [...meetings].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        : [],
    [meetings, selectedGroupId],
  )

  const selectedGroup = useMemo(
    () => groups.find((group) => group.groupId === selectedGroupId),
    [groups, selectedGroupId],
  )

  const handleDelete = async (meetingId: string) => {
    setLoading(true)
    setErrorMessage('')

    try {
      await deleteMeeting(meetingId)
      setMeetings((current) => current.filter((meeting) => meeting.meetingId !== meetingId))
    } catch {
      setErrorMessage('Could not delete this meeting.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='Feed'>
      <div className='feed-heading'>
        <h2>Meetings Dashboard</h2>
        <p>Choose a group and view only its meetings. Use the dedicated pages to add or update.</p>
      </div>

      <div className='meeting-actions'>
        <Link to='/meetings/new'>Add New Meeting</Link>
        <Link to='/meetings/update'>Update Existing Meeting</Link>
      </div>

      <div className='group-switcher'>
        <label htmlFor='group-select'>Group</label>
        <select
          id='group-select'
          value={selectedGroupId}
          onChange={(event) => setSelectedGroupId(event.target.value)}
          disabled={groups.length === 0 || loading}
        >
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && <p className='status error'>{errorMessage}</p>}
      {loading && <p className='status'>Working...</p>}

      <div className='feed-grid'>
        <div className='meeting-list'>
          <h3>{selectedGroup ? `${selectedGroup.name} Meetings` : 'Meetings'}</h3>
          <div className='meeting-legend' aria-label='Meeting color guideline'>
            <span className='legend-item'>
              <span className='legend-dot future' aria-hidden='true' />
              Orange: future start time
            </span>
            <span className='legend-item'>
              <span className='legend-dot past' aria-hidden='true' />
              Green: past start time
            </span>
          </div>

          {sortedMeetings.length === 0 ? (
            <p className='empty'>No meetings yet for this group.</p>
          ) : (
            <div className='meeting-table-wrap'>
              <table className='meeting-table'>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>Finish</th>
                    <th>Duration</th>
                    <th>Room</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMeetings.map((meeting) => {
                    const startState = getStartState(meeting.startDate)

                    return (
                      <tr key={meeting.meetingId} className={`meeting-row ${startState}`}>
                        <td>{formatDisplayDateTime(meeting.startDate)}</td>
                        <td>{formatDisplayDateTime(meeting.finishDate)}</td>
                        <td>
                          <span className={`duration-pill ${startState}`}>
                            {getDuration(meeting.startDate, meeting.finishDate)}
                          </span>
                        </td>
                        <td>{meeting.room}</td>
                        <td>{meeting.description}</td>
                        <td>
                          <button
                            type='button'
                            className='delete-btn'
                            onClick={() => void handleDelete(meeting.meetingId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
