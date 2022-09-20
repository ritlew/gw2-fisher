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

const getMsInCycle = (): number => {
  // cycle is a 2 hour period offset by 30 minutes
  return (Date.now() - 1000 * 60 * 30) % (1000 * 60 * 60 * 2)
}

const getCurrentTime = (): Time => {
  const msInCycle = getMsInCycle()
  const cycleIndex = cycleInfo.findIndex((info) => msInCycle < info.cutoff)
  return cycleInfo[cycleIndex].label
}

const useDayNightCycle = (
  { updateMsUntilNext }: { updateMsUntilNext?: boolean } = {
    updateMsUntilNext: false,
  }
) => {
  const [[current, msInCycle], setCurrent] = useState<[Time, number]>([
    getCurrentTime(),
    getMsInCycle(),
  ])

  const currentInfo = cycleInfo.find((time) => time.label === current)
  const msUntilNext = currentInfo ? currentInfo.cutoff - msInCycle : 0

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = getCurrentTime()
      if (updateMsUntilNext || now[0] !== current) {
        setCurrent([getCurrentTime(), getMsInCycle()])
      }
    }, 1000)

    return () => clearInterval(intervalID)
  })

  return {
    time: current,
    next: cycleInfo[
      (cycleInfo.findIndex((time) => time.label === current) + 1) %
        cycleInfo.length
    ].label,
    msUntilNext,
  }
}

export default useDayNightCycle
