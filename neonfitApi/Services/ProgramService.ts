using NeonFit.Api.Models;


namespace NeonFit.Api.Services;


public class ProgramService
{
private readonly SeedData _seed;
public ProgramService(SeedData seed) => _seed = seed;
public IEnumerable<ProgramItem> GetPrograms() => _seed.Programs;
}