import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type Group from '../../../models/Group'
import type Meeting from '../../../models/Meeting'
import { getAllGroups } from '../../../services/groups'
import { getMeetingsByGroupId, updateMeeting } from '../../../services/meetings'
import './UpdateMeeting.css'

type Draft = {
  groupId: string
  startDate: string
  finishDate: string
  room: string
  description: string
}

const EMPTY_DRAFT: Draft = {
  groupId: '',
  startDate: '',
  finishDate: '',
  room: '',
  description: '',
}

function toInputDateTime(isoDate: string): string {
  const date = new Date(isoDate)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function UpdateMeeting() {
  const [groups, setGroups] = useState<Group[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [selectedMeetingId, setSelectedMeetingId] = useState('')
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true)
      setStatus('')

      try {
        const data = await getAllGroups()
        setGroups(data)
      } catch {
        setStatus('Could not load groups.')
      } finally {
        setLoading(false)
      }
    }

    void loadGroups()
  }, [])

  useEffect(() => {
    if (!selectedGroupId) {
      setMeetings([])
      setSelectedMeetingId('')
      setDraft(EMPTY_DRAFT)
      return
    }

    const loadMeetings = async () => {
      setLoading(true)
      setStatus('')

      try {
        const data = await getMeetingsByGroupId(selectedGroupId)
        setMeetings(data)
        setSelectedMeetingId('')
        setDraft((current) => ({ ...EMPTY_DRAFT, groupId: selectedGroupId, room: current.room }))
      } catch {
        setStatus('Could not load meetings for selected group.')
      } finally {
        setLoading(false)
      }
    }

    void loadMeetings()
  }, [selectedGroupId])

  const selectedMeeting = useMemo(
    () => meetings.find((meeting) => meeting.meetingId === selectedMeetingId),
    [meetings, selectedMeetingId],
  )

  const handleMeetingChange = (meetingId: string) => {
    setSelectedMeetingId(meetingId)

    const meeting = meetings.find((item) => item.meetingId === meetingId)
    if (!meeting) {
      return
    }

    setDraft({
      groupId: meeting.groupId,
      startDate: toInputDateTime(meeting.startDate),
      finishDate: toInputDateTime(meeting.finishDate),
      room: meeting.room,
      description: meeting.description,
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')

    if (!selectedMeetingId) {
      setStatus('Select a meeting to update.')
      return
    }

    if (new Date(draft.startDate).getTime() >= new Date(draft.finishDate).getTime()) {
      setStatus('Start time must be earlier than finish time.')
      return
    }

    setLoading(true)

    try {
      const updated = await updateMeeting(selectedMeetingId, draft)

      setMeetings((current) => current.map((meeting) => (meeting.meetingId === selectedMeetingId ? updated : meeting)))
      setStatus('Meeting updated successfully.')
    } catch {
      setStatus('Could not update meeting. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='UpdateMeeting'>
      <h2>Update Meeting</h2>
      <p>Choose a group and meeting, then update all required fields.</p>

      <div className='selectors'>
        <label htmlFor='update-group'>Group</label>
        <select
          id='update-group'
          value={selectedGroupId}
          onChange={(event) => setSelectedGroupId(event.target.value)}
          disabled={loading || groups.length === 0}
        >
          <option value=''>Select a group</option>
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.name}
            </option>
          ))}
        </select>

        <label htmlFor='update-meeting'>Meeting</label>
        <select
          id='update-meeting'
          value={selectedMeetingId}
          onChange={(event) => handleMeetingChange(event.target.value)}
          disabled={loading || !selectedGroupId || meetings.length === 0}
        >
          <option value=''>Select a meeting</option>
          {meetings.map((meeting) => (
            <option key={meeting.meetingId} value={meeting.meetingId}>
              {new Date(meeting.startDate).toLocaleString()} | {meeting.room}
            </option>
          ))}
        </select>
      </div>

      {selectedMeeting ? (
        <form className='meeting-editor' onSubmit={handleSubmit}>
          <label htmlFor='update-start'>Start</label>
          <input
            id='update-start'
            type='datetime-local'
            value={draft.startDate}
            onChange={(event) => setDraft((current) => ({ ...current, startDate: event.target.value }))}
            required
          />

          <label htmlFor='update-finish'>Finish</label>
          <input
            id='update-finish'
            type='datetime-local'
            value={draft.finishDate}
            onChange={(event) => setDraft((current) => ({ ...current, finishDate: event.target.value }))}
            required
          />

          <label htmlFor='update-room'>Room</label>
          <input
            id='update-room'
            value={draft.room}
            onChange={(event) => setDraft((current) => ({ ...current, room: event.target.value }))}
            required
          />

          <label htmlFor='update-description'>Description</label>
          <textarea
            id='update-description'
            rows={4}
            value={draft.description}
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            required
          />

          <button type='submit' disabled={loading}>
            Update Meeting
          </button>
        </form>
      ) : meetings.length === 0 && selectedGroupId ? (
        <p className='status-message'>No meetings found for the selected group.</p>
      ) : (
        <p className='status-message'>Select a meeting to update.</p>
      )}

      {status && <p className='status-message'>{status}</p>}
    </section>
  )
}
