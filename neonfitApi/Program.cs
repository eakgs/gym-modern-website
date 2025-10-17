using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NeonFit.Api.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- Services --------------------------------------------------------------

// DB (SQLite)
var cs = builder.Configuration.GetConnectionString("db") ?? "Data Source=neonfit.db";
builder.Services.AddDbContext<NeonFitDb>(o => o.UseSqlite(cs));

// CORS for Angular dev
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p
    .WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod()));

// AuthN (JWT)
var jwtKey = builder.Configuration["Jwt:Key"] ?? "dev-super-secret-change-me";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key
    });

// AuthZ (required if you call UseAuthorization)
builder.Services.AddAuthorization();

var app = builder.Build();

// --- Middleware ------------------------------------------------------------
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

// --- Endpoints -------------------------------------------------------------
app.MapGet("/", () => Results.Ok(new { ok = true, api = "NeonFit" }));

// DTOs are in Contracts/AuthDtos.cs
app.MapPost("/api/auth/register", async (NeonFitDb db, RegisterDto dto) =>
{
    var email = dto.Email.Trim().ToLowerInvariant();
    if (await db.Users.AnyAsync(u => u.Email == email))
        return Results.BadRequest(new { message = "Email already in use" });

    var user = new User
    {
        Email = email,
        Name = dto.Name?.Trim() ?? "",
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
    };
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Ok(new { ok = true });
});

app.MapPost("/api/auth/login", async (NeonFitDb db, LoginDto dto) =>
{
    var email = dto.Email.Trim().ToLowerInvariant();
    var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
    if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        return Results.BadRequest(new { message = "Invalid credentials" });

    var token = CreateJwt(user.Id.ToString(), email, key);
    return Results.Ok(new { token, user = new { user.Id, user.Email, user.Name } });
});

app.Run();

// --- Helpers ---------------------------------------------------------------
static string CreateJwt(string sub, string email, SymmetricSecurityKey k)
{
    var creds = new SigningCredentials(k, SecurityAlgorithms.HmacSha256);
    var jwt = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
        claims: [ new("sub", sub), new("email", email) ],
        expires: DateTime.UtcNow.AddDays(7),
        signingCredentials: creds
    );
    return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(jwt);
}
