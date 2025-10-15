using Microsoft.AspNetCore.Mvc;
using NeonFit.Api.Services;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
options.AddPolicy("frontend", p => p
.WithOrigins("http://localhost:4200")
.AllowAnyHeader()
.AllowAnyMethod());
});


// DI
builder.Services.AddSingleton<SeedData>();
builder.Services.AddSingleton<ProgramService>();
builder.Services.AddSingleton<ScheduleService>();
builder.Services.AddSingleton<BookingService>();


var app = builder.Build();
app.UseCors("frontend");


if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
}


app.MapGet("/api/health", () => new { ok = true, time = DateTime.UtcNow });


// Programs
app.MapGet("/api/programs", ([FromServices] ProgramService svc) => Results.Ok(svc.GetPrograms()));


// Schedule
app.MapGet("/api/schedule", ([FromServices] ScheduleService svc) => Results.Ok(svc.GetToday()));


// Booking
app.MapPost("/api/booking", async ([FromBody] BookingRequest req, [FromServices] BookingService svc) =>
{
var result = await svc.BookAsync(req);
return result.Success ? Results.Ok(result) : Results.BadRequest(result);
});


// AI Coach (stub)
app.MapPost("/api/chat", ([FromBody] ChatMessage message) =>
{
// Replace with your real AI provider later
var plan = new[]
{
"3x Strength (Mon/Wed/Fri)",
"2x HIIT (Tue/Sat)",
"Daily 10-min Mobility",
"Protein ~1.6g/kg, Hydration 35ml/kg",
"Sleep target 7.5h"
};
return Results.Ok(new { reply = string.Join("; ", plan) });
});


app.Run();