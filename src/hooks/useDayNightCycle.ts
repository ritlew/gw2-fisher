// react
import { useState, useEffect } from 'react'

// local
import { Time } from '../components/selects/TimeSelect'

const cycleInfo: { label: Time; cutoff: number }[] = [
  { label: 'Daytime', cutoff: 1000 * 60 * 70 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 75 },
  { label: 'Nighttime', cutoff: 1000 * 60 * 115 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 120 },
]

const canthanCycleInfo: { label: Time; cutoff: number }[] = [
  { label: 'Daytime', cutoff: 1000 * 60 * 55 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 60 },
  { label: 'Nighttime', cutoff: 1000 * 60 * 115 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 120 },
]

const getCycleInfo = (canthanTime: boolean) => {
  return canthanTime ? canthanCycleInfo : cycleInfo
}

const getMsInCycle = (canthanTime: boolean): number => {
  // cycle is a 2 hour period offset by 30 minutes
  return (
    (Date.now() - 1000 * 60 * (canthanTime ? 40 : 30)) % (1000 * 60 * 60 * 2)
  )
}

const getCurrentTime = (canthanTime: boolean): Time => {
  const msInCycle = getMsInCycle(canthanTime)
  const cycle = getCycleInfo(canthanTime)
  const cycleIndex = cycle.findIndex((info) => msInCycle < info.cutoff)
  return cycle[cycleIndex].label
}

const useDayNightCycle = (
  {
    updateMsUntilNext = false,
    canthanTime = false,
  }: { updateMsUntilNext?: boolean; canthanTime?: boolean } = {
    updateMsUntilNext: false,
    canthanTime: false,
  }
) => {
  const [, setCurrentMs] = useState<number>(getMsInCycle(canthanTime))

  const current = getCurrentTime(canthanTime)
  const cycle = getCycleInfo(canthanTime)
  const currentInfo = cycle.find((time) => time.label === current)
  const msUntilNext = currentInfo
    ? currentInfo.cutoff - getMsInCycle(canthanTime)
    : 0

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = getCurrentTime(canthanTime)
      if (updateMsUntilNext || now[0] !== current) {
        setCurrentMs(getMsInCycle(canthanTime))
      }
    }, 1000)

    return () => clearInterval(intervalID)
  })

  return {
    time: getCurrentTime(canthanTime),
    next: cycle[
      (cycle.findIndex((time) => time.label === getCurrentTime(canthanTime)) +
        1) %
        cycle.length
    ].label,
    msUntilNext,
  }
}

export default useDayNightCycle
