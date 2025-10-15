using NeonFit.Api.Models;


namespace NeonFit.Api.Services;


public class SeedData
{
public List<ProgramItem> Programs { get; } = new()
{
new("Strength Lab", "PRO", "Periodized lifting with live form cues"),
new("Metabolic Burn", "HIIT", "Heart-rate guided intervals"),
new("Mobility Flow", "RECOVER", "Breath + stretch to restore range"),
new("Dance Cardio", "FUN", "Rhythm-driven sweat sessions")
};


public List<ScheduleItem> Today { get; } = new()
{
new("06:30", "Sunrise HIIT", "Asha"),
new("09:00", "Strength Lab", "Ravindu"),
new("17:30", "Mobility Flow", "Imasha"),
new("19:00", "Dance Cardio", "Kavi")
};
}