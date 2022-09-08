import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment'
// system unit test
describe('Create Appointment', () => {
  it('should be able to create an appointment', async () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    const appointmentsRepository = new InMemoryAppointmentRepository()

    const createAppointment = new CreateAppointment(appointmentsRepository)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment).catch((err) => console.log(err))
  })

  it('should not be able to create an appointment when overlapping', async () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    const appointmentsRepository = new InMemoryAppointmentRepository()

    const createAppointment = new CreateAppointment(appointmentsRepository)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error).catch(err => console.log(err));

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-14')
    })).rejects.toBeInstanceOf(Error).catch(err => console.log(err));

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error).catch(err => console.log(err));

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error).catch(err => console.log(err));
  })
})
