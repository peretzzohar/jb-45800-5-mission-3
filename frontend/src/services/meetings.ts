import axios from 'axios'
import type Meeting from '../models/Meeting'
import type MeetingDraft from '../models/MeetingDraft'

export async function getMeetingsByGroupId(groupId: string): Promise<Meeting[]> {
  const { data } = await axios.get<Meeting[]>(`${import.meta.env.VITE_REST_SERVER_URL}/groups/${groupId}/meetings`)
  return data
}

export async function getMeetingById(meetingId: string): Promise<Meeting> {
  const { data } = await axios.get<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`)
  return data
}

export async function addMeeting(draft: MeetingDraft): Promise<Meeting> {
  const payload = {
    ...draft,
    startDate: new Date(draft.startDate).toISOString(),
    finishDate: new Date(draft.finishDate).toISOString(),
  }

  const { data } = await axios.post<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings`, payload)
  return data
}

export async function updateMeeting(meetingId: string, draft: MeetingDraft): Promise<Meeting> {
  const payload = {
    ...draft,
    startDate: new Date(draft.startDate).toISOString(),
    finishDate: new Date(draft.finishDate).toISOString(),
  }

  const { data } = await axios.put<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`, payload)
  return data
}

export async function deleteMeeting(meetingId: string): Promise<void> {
  await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`)
}
