import { Status } from '@prisma/client'
import useSWR from 'swr'
import { StatsType } from '../../pages/api/projects/[project]/stats'
import { requestLogger } from '../middlewares/requestLogger'
import customFetch from '../utils/customFetch'
import { projectKey } from './keys'

const useProjectStats = (projectId: string | null) => {
  const key = projectId ? `${projectKey(projectId)}/stats` : null

  const { data, error, mutate } = useSWR<
    { data: StatsType; error: Error },
    Error
  >(key, customFetch, {
    use: [requestLogger],
  })

  let result = new Map()
  if (data?.data) {
    data.data.forEach((stat) => {
      result.set(stat.status, stat._count._all)
    })

    // const total =
    //   result.get(Status.PROPOSED) +
    //   result.get(Status.INPROGRESS) +
    //   result.get(Status.COMPLETED)
    // const progressPercentage =
    //   total <= 0
    //     ? 0
    //     : +((result.get(Status.COMPLETED) * 100) / total).toFixed(0)

    // result.set('progressPercentage', progressPercentage)
  }

  const projectStats = result || null
  const isLoading = !error && !data
  const setProjectStats = mutate

  return { projectStats, setProjectStats, error, isLoading }
}

export default useProjectStats
