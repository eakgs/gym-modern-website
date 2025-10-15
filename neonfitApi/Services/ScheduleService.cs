using NeonFit.Api.Models;


namespace NeonFit.Api.Services;


public class ScheduleService
{
private readonly SeedData _seed;
public ScheduleService(SeedData seed) => _seed = seed;
public IEnumerable<ScheduleItem> GetToday() => _seed.Today;
}