import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { timeZones } from "@/lib/utils"

interface TimeZoneSelectorProps {
  selectedTimeZone: string
  onTimeZoneChange: (newTimeZone: string) => void
}

export function TimeZoneSelector({ selectedTimeZone, onTimeZoneChange }: TimeZoneSelectorProps) {
  return (
    <Select value={selectedTimeZone} onValueChange={onTimeZoneChange}>
      <SelectTrigger className="w-full mt-4">
        <SelectValue placeholder="Selecione o fuso horário" />
      </SelectTrigger>
      <SelectContent>
        {timeZones.map((tz) => (
          <SelectItem key={tz.value} value={tz.value}>
            {tz.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

