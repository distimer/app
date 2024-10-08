/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Distimer Swagger API
 * OpenAPI spec version: 1.0
 */
import {
  faker
} from '@faker-js/faker'
import {
  HttpResponse,
  delay,
  http
} from 'msw'
import type {
  SubjectctrlSubjectDTO,
  SubjectctrlSubjectOrderElement
} from '../../schemas'

export const getPostSubjectBatchResponseMock = (): SubjectctrlSubjectDTO[] => (Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({color: faker.word.sample(), id: faker.word.sample(), name: faker.word.sample(), order: faker.number.int({min: 0, max: undefined})})))

export const getPatchSubjectOrderResponseMock = (): SubjectctrlSubjectOrderElement[] => (Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({order: faker.number.int({min: 0, max: undefined}), subject_id: faker.word.sample()})))

export const getPutSubjectIdResponseMock = (overrideResponse: Partial< SubjectctrlSubjectDTO > = {}): SubjectctrlSubjectDTO => ({color: faker.word.sample(), id: faker.word.sample(), name: faker.word.sample(), order: faker.number.int({min: 0, max: undefined}), ...overrideResponse})

export const getPostSubjectIdResponseMock = (overrideResponse: Partial< SubjectctrlSubjectDTO > = {}): SubjectctrlSubjectDTO => ({color: faker.word.sample(), id: faker.word.sample(), name: faker.word.sample(), order: faker.number.int({min: 0, max: undefined}), ...overrideResponse})


export const getPostSubjectBatchMockHandler = (overrideResponse?: SubjectctrlSubjectDTO[] | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SubjectctrlSubjectDTO[]> | SubjectctrlSubjectDTO[])) => {
  return http.post('*/subject/batch', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPostSubjectBatchResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPatchSubjectOrderMockHandler = (overrideResponse?: SubjectctrlSubjectOrderElement[] | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<SubjectctrlSubjectOrderElement[]> | SubjectctrlSubjectOrderElement[])) => {
  return http.patch('*/subject/order', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPatchSubjectOrderResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPutSubjectIdMockHandler = (overrideResponse?: SubjectctrlSubjectDTO | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<SubjectctrlSubjectDTO> | SubjectctrlSubjectDTO)) => {
  return http.put('*/subject/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPutSubjectIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPostSubjectIdMockHandler = (overrideResponse?: SubjectctrlSubjectDTO | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<SubjectctrlSubjectDTO> | SubjectctrlSubjectDTO)) => {
  return http.post('*/subject/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined 
            ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse) 
            : getPostSubjectIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getDeleteSubjectIdMockHandler = (overrideResponse?: void | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<void> | void)) => {
  return http.delete('*/subject/:id', async (info) => {await delay(1000);
  if (typeof overrideResponse === 'function') {await overrideResponse(info); }
    return new HttpResponse(null,
      { status: 204,
        
      })
  })
}
export const getSubjectMock = () => [
  getPostSubjectBatchMockHandler(),
  getPatchSubjectOrderMockHandler(),
  getPutSubjectIdMockHandler(),
  getPostSubjectIdMockHandler(),
  getDeleteSubjectIdMockHandler()
]
