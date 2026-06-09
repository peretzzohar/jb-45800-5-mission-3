import axios from 'axios'
import type Group from '../models/Group'

export async function getAllGroups(): Promise<Group[]> {
  const { data } = await axios.get<Group[]>(`${import.meta.env.VITE_REST_SERVER_URL}/groups`)
  return data
}
