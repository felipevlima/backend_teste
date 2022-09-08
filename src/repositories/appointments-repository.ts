/* eslint-disable @typescript-eslint/method-signature-style */
import { Appointment } from '../entities/appointment';

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>
  save(appointment: Appointment): Promise<void>
  findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}
