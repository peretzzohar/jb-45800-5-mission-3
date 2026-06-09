import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type Group from '../../../models/Group'
import { getAllGroups } from '../../../services/groups'
import { addMeeting } from '../../../services/meetings'
import './NewMeeting.css'

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

export default function NewMeeting() {
  const [groups, setGroups] = useState<Group[]>([])
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
        if (data.length > 0) {
          setDraft((current) => ({ ...current, groupId: current.groupId || data[0].groupId }))
        }
      } catch {
        setStatus('Could not load groups.')
      } finally {
        setLoading(false)
      }
    }

    void loadGroups()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')

    const start = new Date(draft.startDate).getTime()
    const finish = new Date(draft.finishDate).getTime()

    if (start <= Date.now()) {
      setStatus('Start time must be in the future.')
      return
    }

    if (start >= finish) {
      setStatus('Start time must be earlier than finish time.')
      return
    }

    setLoading(true)

    try {
      await addMeeting(draft)
      setStatus('Meeting created successfully.')
      setDraft((current) => ({ ...EMPTY_DRAFT, groupId: current.groupId }))
    } catch {
      setStatus('Could not create meeting. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='NewMeeting'>
      <h2>New Meeting</h2>
      <p>Create a new meeting for a development group.</p>

      <form className='meeting-editor' onSubmit={handleSubmit}>
        <label htmlFor='new-group'>Group</label>
        <select
          id='new-group'
          value={draft.groupId}
          onChange={(event) => setDraft((current) => ({ ...current, groupId: event.target.value }))}
          required
          disabled={loading || groups.length === 0}
        >
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.name}
            </option>
          ))}
        </select>

        <label htmlFor='new-start'>Start</label>
        <input
          id='new-start'
          type='datetime-local'
          value={draft.startDate}
          onChange={(event) => setDraft((current) => ({ ...current, startDate: event.target.value }))}
          required
        />

        <label htmlFor='new-finish'>Finish</label>
        <input
          id='new-finish'
          type='datetime-local'
          value={draft.finishDate}
          onChange={(event) => setDraft((current) => ({ ...current, finishDate: event.target.value }))}
          required
        />

        <label htmlFor='new-room'>Room</label>
        <input
          id='new-room'
          value={draft.room}
          onChange={(event) => setDraft((current) => ({ ...current, room: event.target.value }))}
          required
        />

        <label htmlFor='new-description'>Description</label>
        <textarea
          id='new-description'
          rows={4}
          value={draft.description}
          onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
          required
        />

        <button type='submit' disabled={loading || !draft.groupId}>
          Add Meeting
        </button>
      </form>

      {status && <p className='status-message'>{status}</p>}
    </section>
  )
}
