// react
import { useState, useEffect } from 'react'

// local
import { Time } from '../components/selects/TimeSelect'

const cycleInfo: { label: Time; cutoff: number }[] = [
  { label: 'Nighttime', cutoff: 1000 * 60 * 25 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 30 },
  { label: 'Daytime', cutoff: 1000 * 60 * 100 },
  { label: 'Dusk/Dawn', cutoff: 1000 * 60 * 105 },
  { label: 'Nighttime', cutoff: 1000 * 60 * 145 },
]

const getTime = (): [Time, number] => {
  const timeInCycle = Date.now() % (1000 * 60 * 60 * 2)
  const cycleIndex = cycleInfo.findIndex((info) => timeInCycle < info.cutoff)
  if (cycleIndex > -1) {
    return [
      cycleInfo[cycleIndex].label,
      cycleInfo[cycleIndex].cutoff - timeInCycle,
    ]
  }

  return ['Daytime', 0]
}

const useDayNightCycle = (
  { updateMsUntilNext }: { updateMsUntilNext?: boolean } = {
    updateMsUntilNext: false,
  }
) => {
  const [[current, msUntilNext], setCurrent] = useState<[Time, number]>(
    getTime()
  )

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = getTime()
      if (updateMsUntilNext || now[0] !== current) {
        setCurrent(getTime())
      }
    }, 1000)

    return () => clearInterval(intervalID)
  })

  return {
    time: current,
    msUntilNext,
    isDay: current === 'Daytime',
    isNight: current === 'Nighttime',
    isDuskDawn: current === 'Dusk/Dawn',
  }
}

export default useDayNightCycle
