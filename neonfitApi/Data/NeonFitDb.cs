using Microsoft.EntityFrameworkCore;

namespace NeonFit.Api.Data;

public class NeonFitDb(DbContextOptions<NeonFitDb> opts) : DbContext(opts)
{
    public DbSet<User> Users => Set<User>();
}

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Name { get; set; } = "";
    public string PasswordHash { get; set; } = "";
}
